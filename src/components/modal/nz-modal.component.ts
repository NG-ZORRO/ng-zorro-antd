import {
  AfterViewInit,
  Component,
  ComponentFactory,
  ComponentRef,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';

import { NzLocaleService } from '../locale/index';
import { toBoolean } from '../util/convert';
import nzGlobalMonitor from '../util/nz-global-monitor';
import { NzModalSubject } from './nz-modal-subject.service';

interface Position {
  x: number;
  y: number;
}

@Component({
  selector     : 'nz-modal',
  viewProviders: [ NzModalSubject ],
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div [ngClass]="_customClass">
      <div [ngClass]="_maskClassMap"
        [style.zIndex]="_zIndex"></div>
      <div tabindex="-1" role="dialog"
        [attr.aria-labelledby]="modalId"
        (click)="closeFromMask($event)"
        [ngClass]="_wrapClass"
        [style.zIndex]="_zIndex"
        [ngStyle]="{ 'display': !_visible && !_animationStatus ? 'none' : '' }">

        <div #modal_content role="document" [ngClass]="_bodyClassMap" [ngStyle]="_bodyStyleMap">
          <div class="ant-modal-content">
            <ng-template [ngIf]="_closable">
              <button aria-label="Close" class="ant-modal-close" (click)="clickCancel($event)">
                <span class="ant-modal-close-x"></span>
              </button>
            </ng-template>
            <div class="ant-modal-header" *ngIf="_title || _titleTpl">
              <div class="ant-modal-title" [attr.id]="modalId">
                <ng-template #defaultTitle>{{ _title }}</ng-template>
                <ng-template [ngTemplateOutlet]="_titleTpl || defaultTitle"></ng-template>
              </div>
            </div>
            <div class="ant-modal-body">
              <ng-template #defaultContent>{{ _content }}</ng-template>
              <ng-template [ngTemplateOutlet]="_contentTpl || defaultContent"></ng-template>
              <ng-template #modal_component></ng-template>
            </div>
            <div class="ant-modal-footer" *ngIf="!_footerHide">
              <ng-template #defaultFooter>
                <button nz-button [nzType]="'ghost'" [nzSize]="'large'" (click)="clickCancel($event)">
                  <span>{{ _cancelText }}</span>
                </button>
                <button nz-button [nzType]="'primary'" [nzSize]="'large'" (click)="clickOk($event)" [nzLoading]="_confirmLoading">
                  <span>{{ _okText }}</span>
                </button>
              </ng-template>
              <ng-template [ngTemplateOutlet]="_footerTpl || defaultFooter"></ng-template>
            </div>
          </div>
        </div>
        <div tabindex="0" style="width: 0px; height: 0px; overflow: hidden;">sentinel</div>
      </div>
    </div>
  `,
  styleUrls    : [
    './style/index.less'
  ]
})
export class NzModalComponent implements OnInit, OnDestroy, AfterViewInit {
  private _confirmLoading = false;
  private _maskClosable = true;
  _footerHide = false;
  _closable = true;
  _visible = false;
  _prefixCls = 'ant-modal';
  _maskClassMap;
  _bodyClassMap;
  _bodyStyleMap;
  _width = '520px';
  _zIndex = 1000;
  _title = '';
  _titleTpl: TemplateRef<void>;
  _content = '';
  _contentTpl: TemplateRef<void>;
  _footerTpl: TemplateRef<void>;
  _okText = this._locale.translate('Modal.okText');
  _cancelText = this._locale.translate('Modal.cancelText');
  _style: object = {};
  _wrapClass = `${this._prefixCls}-wrap`;
  _customClass = '';
  _animationStatus = '';
  _bodyComponent: ComponentFactory<void>;
  _componentParams: object = {};
  modalId = `nzModal${nzGlobalMonitor.getGlobalCount()}`;
  @ViewChild('modal_content') contentEl: ElementRef;
  @ViewChild('modal_component', { read: ViewContainerRef }) bodyEl: ViewContainerRef;

  @Input()
  set nzVisible(value: boolean) {
    const visible = toBoolean(value);
    if (this._visible === visible) {
      return;
    }
    if (visible) {
      this.anmiateFade('enter');
      this.subject.next('onShow');
      // 每次触发点击事件的时候，通过全局监听的类，记录下点击的位置，计算动画的origin
      setTimeout(() => {
        this.setStyles({
          x: nzGlobalMonitor.lastClickPos.x || 0,
          y: nzGlobalMonitor.lastClickPos.y || 0
        });
      });
    } else {
      this.anmiateFade('leave');
      this.subject.next('onHide');
    }
    this._visible = visible;
    this.nzVisibleChange.emit(this._visible);
    // 设置全局的overflow样式
    nzGlobalMonitor.setDocumentOverflowHidden(visible);
  }

  get nzVisible(): boolean {
    return this._visible;
  }

  @Input()
  set nzConfirmLoading(value: boolean) {
    this._confirmLoading = toBoolean(value);
  }

  @Input()
  set nzClosable(value: boolean) {
    this._closable = toBoolean(value);
  }

  @Input()
  set nzClass(value: string) {
    this._customClass = value;
  }

  @Input()
  set nzWidth(value: string | number) {
    this._width = typeof value === 'number' ? value + 'px' : value;
  }

  @Input()
  set nzZIndex(value: number) {
    this._zIndex = value;
  }

  @Input()
  set nzTitle(value: string | TemplateRef<void>) {
    // TODO: should guard for string instead, all types are theoretically structural
    if (value instanceof TemplateRef) {
      this._titleTpl = value;
    } else {
      this._title = value;
    }
  }

  @Input()
  set nzContent(value: string | TemplateRef<void> | ComponentFactory<void>) {
    if (value instanceof ComponentFactory) {
      // 如果容器对象已存在，则直接渲染，如果不存在，则设置到_bodyComponent，在ngAfterViewInit中执行
      if (this.bodyEl) {
        const compRef: ComponentRef<void> = this.bodyEl.createComponent(value, null, this._vcr.injector);
        Object.assign(compRef.instance, this._componentParams);
      } else {
        this._bodyComponent = value;
      }
    } else if (value instanceof TemplateRef) {
      this._contentTpl = value;
    } else {
      this._content = value;
    }
  }

  @Input()
  set nzFooter(value: TemplateRef<void> | boolean) {
    if (value instanceof TemplateRef) {
      this._footerTpl = value;
    } else {
      this._footerHide = !toBoolean(value);
    }
  }

  @Input()
  set nzOkText(value: string) {
    this._okText = value;
  }

  @Input()
  set nzCancelText(value: string) {
    this._cancelText = value;
  }

  @Input()
  set nzMaskClosable(value: boolean) {
    this._maskClosable = toBoolean(value);
  }

  @Input()
  set nzStyle(value: object) {
    this._style = value;
  }

  @Input()
  set nzWrapClassName(value: string) {
    if (value) {
      this._wrapClass = `${this._prefixCls}-wrap ${value}`;
    }
  }

  @Input()
  set nzComponentParams(value: object) {
    this._componentParams = value;
  }

  @Output()
  nzVisibleChange: EventEmitter<boolean> = new EventEmitter();
  @Output()
  nzOnOk: EventEmitter<MouseEvent> = new EventEmitter();
  // TODO: reconsider the payload type
  @Output()
  nzOnCancel: EventEmitter<MouseEvent | KeyboardEvent> = new EventEmitter();

  @HostListener('keydown.esc', [ '$event' ])
  onEsc(e: KeyboardEvent): void {
    if (this._maskClosable) {
      this.clickCancel(e);
    }
  }

  setStyles(origin?: { x: number, y: number }): void {
    const el = this.contentEl.nativeElement;
    const transformOrigin = origin ? `${origin.x - el.offsetLeft}px ${origin.y - el.offsetTop}px 0px` : '';

    // TODO: spread on literal has been disallow on latest proposal
    this._bodyStyleMap = {
      ...{
        'width'           : this._width,
        'transform-origin': transformOrigin
      },
      ...this._style
    };
  }

  setClassMap(): void {
    this._maskClassMap = {
      [`${this._prefixCls}-mask`]       : true,
      [`${this._prefixCls}-mask-hidden`]: !this._visible && !this._animationStatus,
      'fade-enter'                      : this._animationStatus === 'enter',
      'fade-enter-active'               : this._animationStatus === 'enter',
      'fade-leave'                      : this._animationStatus === 'leave',
      'fade-leave-active'               : this._animationStatus === 'leave'
    };

    this._bodyClassMap = {
      [this._prefixCls]  : true,
      'zoom-enter'       : this._animationStatus === 'enter',
      'zoom-enter-active': this._animationStatus === 'enter',
      'zoom-leave'       : this._animationStatus === 'leave',
      'zoom-leave-active': this._animationStatus === 'leave'
    };
  }

  anmiateFade(status: string): void {
    this._animationStatus = status;
    this.setClassMap();
    setTimeout(_ => {
      this._animationStatus = '';
      this.setClassMap();
      this.subject.next(status === 'enter' ? 'onShown' : 'onHidden');

      // modal打开后，默认焦点设置到modal上
      if (status === 'enter') {
        this.contentEl.nativeElement.parentNode.focus();
      }
    }, 200);
  }

  closeFromMask(e: MouseEvent): void {
    if (this._maskClosable && (e.target as HTMLElement).getAttribute('role') === 'dialog') {
      this.clickCancel(e);
    }
  }

  setConfirmLoading(loading: boolean): void {
    this.nzConfirmLoading = loading;
  }

  open(): void {
    this.nzVisible = true;
  }

  close(): void {
    this.nzVisible = false;
  }

  clickOk(e: MouseEvent): void {
    if (this.nzOnOk) {
      this.nzOnOk.emit(e);
    } else {
      this.nzVisible = false;
    }
    this.subject.next('onOk');
  }

  clickCancel(e: MouseEvent | KeyboardEvent): void {
    this.nzOnCancel.emit(e);
    this.subject.next('onCancel');
  }

  constructor(public subject: NzModalSubject,
              private _vcr: ViewContainerRef,
              private _locale: NzLocaleService) {
    this.subject.modalId = this.modalId;
  }

  ngOnInit(): void {
    this.setClassMap();
    this.setStyles();
  }

  ngAfterViewInit(): void {
    if (this._bodyComponent) {
      const compRef: ComponentRef<void> = this.bodyEl.createComponent(this._bodyComponent, null, this._vcr.injector);
      Object.assign(compRef.instance, this._componentParams);
    }
  }

  ngOnDestroy(): void {
    if (this._visible) {
      nzGlobalMonitor.setDocumentOverflowHidden(false);
    }
    this.subject.next('onDestroy');
    this.subject.unsubscribe();
    this.subject = null;
  }
}
