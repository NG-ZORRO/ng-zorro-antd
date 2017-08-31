import {
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  OnDestroy,
  TemplateRef,
  ComponentFactory,
  AfterViewInit,
  ViewContainerRef,
  ComponentRef
} from '@angular/core';

import { NzModalSubject } from './nz-modal-subject.service';
import nzGlobalMonitor from '../util/nz-global-monitor';

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
  _prefixCls = 'ant-modal';
  _maskClassMap;
  _bodyClassMap;
  _bodyStyleMap;
  _visible = false;
  _confirmLoading = false;
  _closable = true;
  _width = '520px';
  _zIndex = 1000;
  _maskClosable = true;
  _title = '';
  _titleTpl: TemplateRef<any>;
  _content = '';
  _contentTpl: TemplateRef<any>;
  _footerTpl: TemplateRef<any>;
  _okText = '确 定';
  _cancelText = '取 消';
  _style: any = {};
  _wrapClass = `${this._prefixCls}-wrap`;
  _customClass = '';
  _animationStatus = '';
  _bodyComponent: ComponentFactory<any>;
  _componentParams: Object = {};
  _footerHide = false;
  modalId = `nzModal${nzGlobalMonitor.getGlobalCount()}`;
  @ViewChild('modal_content') contentEl: ElementRef;
  @ViewChild('modal_component', { read: ViewContainerRef }) bodyEl: ViewContainerRef;

  @Input()
  get nzVisible(): boolean {
    return this._visible;
  };

  set nzVisible(value: boolean) {
    // debugger
    if (this._visible === value) {
      return;
    }
    if (value) {
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
    this._visible = value;
    this.nzVisibleChange.emit(this._visible);
    // 设置全局的overflow样式
    nzGlobalMonitor.setDocumentOverflowHidden(value);
  }

  @Input()
  set nzConfirmLoading(value: boolean) {
    this._confirmLoading = value;
  }

  @Input()
  set nzClosable(value: boolean) {
    this._closable = value;
  }

  @Input()
  set nzClass(value: string) {
    this._customClass = value;
  }

  @Input()
  set nzWidth(value: any) {
    this._width = typeof value === 'number' ? value + 'px' : value;
  }

  @Input()
  set nzZIndex(value: any) {
    this._zIndex = value;
  }

  @Input()
  set nzTitle(value: string | TemplateRef<any>) {
    if (value instanceof TemplateRef) {
      this._titleTpl = value;
    } else {
      this._title = <string>value;
    }
  }

  @Input()
  set nzContent(value: string | TemplateRef<any> | ComponentFactory<any>) {
    if (value instanceof ComponentFactory) {
      // 如果容器对象已存在，则直接渲染，如果不存在，则设置到_bodyComponent，在ngAfterViewInit中执行
      if (this.bodyEl) {
        const compRef: ComponentRef<any> = this.bodyEl.createComponent(value, null, this._vcr.injector);
        Object.assign(compRef.instance, this._componentParams);
      } else {
        this._bodyComponent = value;
      }
    } else if (value instanceof TemplateRef) {
      this._contentTpl = value;
    } else {
      this._content = <string>value;
    }
  }

  @Input()
  set nzFooter(value: TemplateRef<any> | boolean) {
    if (value instanceof TemplateRef) {
      this._footerTpl = value;
    } else {
      this._footerHide = !value;
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
    this._maskClosable = value;
  }

  @Input()
  set nzStyle(value: Object) {
    this._style = value;
  }

  @Input()
  set nzWrapClassName(value: string) {
    if (value) {
      this._wrapClass = `${this._prefixCls}-wrap ${value}`;
    }
  }

  @Input()
  set nzComponentParams(value: Object) {
    this._componentParams = value;
  }


  @Output()
  nzVisibleChange: EventEmitter<any> = new EventEmitter();
  @Output()
  nzOnOk: EventEmitter<any> = new EventEmitter();
  @Output()
  nzOnCancel: EventEmitter<any> = new EventEmitter();

  @HostListener('keydown.esc', [ '$event' ])
  onEsc(e): void {
    this.clickCancel(e);
  }

  setStyles(origin?): void {
    const el = this.contentEl.nativeElement;
    const transformOrigin = origin ? `${origin.x - el.offsetLeft}px ${origin.y - el.offsetTop}px 0px` : '';

    this._bodyStyleMap = Object.assign({
      'width'           : this._width,
      'transform-origin': transformOrigin
    }, this._style);
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

  anmiateFade(status): void {
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

  closeFromMask(e): void {
    if (this._maskClosable && e.target.getAttribute('role') === 'dialog') {
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

  clickOk(e): void {
    if (this.nzOnOk) {
      this.nzOnOk.emit(e);
    } else {
      this.nzVisible = false;
    }
    this.subject.next('onOk');
  }

  clickCancel(e): void {
    this.nzOnCancel.emit(e);
    this.subject.next('onCancel');
  }

  constructor(public subject: NzModalSubject,
              private _vcr: ViewContainerRef) {
    this.subject.modalId = this.modalId;
  }

  ngOnInit() {
    this.setClassMap();
    this.setStyles();
  }

  ngAfterViewInit() {
    if (this._bodyComponent) {
      const compRef: ComponentRef<any> = this.bodyEl.createComponent(this._bodyComponent, null, this._vcr.injector);
      Object.assign(compRef.instance, this._componentParams);
    }
  }

  ngOnDestroy() {
    this.subject.next('onDestroy');
    this.subject.unsubscribe();
    this.subject = null;
  }
}
