import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
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
  selector     : 'nz-confirm',
  viewProviders: [ NzModalSubject ],
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div [ngClass]="_customClass">
      <div [ngClass]="_maskClassMap"
        [style.zIndex]="_zIndex"></div>
      <div tabindex="-1" role="dialog"
        (click)="closeFromMask($event)"
        class="ant-modal-wrap"
        [style.zIndex]="_zIndex"
        [ngStyle]="{ 'display': !_visible && !_animationStatus ? 'none' : 'block' }">

        <div #confirm_content role="document" [ngClass]="_bodyClassMap" [ngStyle]="_bodyStyleMap">
          <div class="ant-modal-content">
            <div class="ant-modal-body">
              <div style="zoom: 1; overflow: hidden;">
                <div class="ant-confirm-body">
                  <i [ngClass]="_iconTypeCls"></i>
                  <span class="ant-confirm-title">
                    <ng-template #defaultTitle>{{ _title }}</ng-template>
                    <ng-template [ngTemplateOutlet]="_titleTpl || defaultTitle"></ng-template>
                  </span>
                  <div class="ant-confirm-content">
                    <ng-template #defaultContent>
                      <div [innerHTML]="_content"></div>
                    </ng-template>
                    <ng-template [ngTemplateOutlet]="_contentTpl || defaultContent"></ng-template>
                  </div>
                </div>
                <div class="ant-confirm-btns">
                  <ng-template [ngIf]="_cancelText">
                    <button nz-button [nzType]="'ghost'" [nzSize]="'large'" (click)="subject.next('onCancel')">
                      <span>{{ _cancelText }}</span>
                    </button>
                  </ng-template>
                  <button nz-button #confirm_ok_btn [nzType]="'primary'" [nzSize]="'large'" [nzSize]="'large'" (click)="subject.next('onOk')" [nzLoading]="_confirmLoading">
                    <span>{{ _okText }}</span>
                  </button>
                </div>
              </div>
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
export class NzConfirmComponent implements OnInit, OnDestroy {
  private _maskClosable = true;
  _confirmLoading = false;
  _visible = false;

  _prefixCls = 'ant-modal';
  _prefixConfirmCls = 'ant-confirm';
  _maskClassMap;
  _bodyClassMap;
  _bodyStyleMap;
  _width = '416px';
  _zIndex = 1000;
  _iconTypeCls = 'anticon anticon-question-circle';
  _title = '';
  _titleTpl: TemplateRef<void>;
  _content = '';
  _contentTpl: TemplateRef<void>;
  _okText = this._locale.translate('Modal.understood');
  _cancelText = '';
  _animationStatus = '';
  _customClass = '';
  _typeCls = `${this._prefixConfirmCls}-confirm`;
  @ViewChild('confirm_content') private contentEl: ElementRef;

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
      }, 10);
    } else {
      this.anmiateFade('leave');
      this.subject.next('onHide');
    }
    this._visible = visible;
    // 设置全局的overflow样式
    nzGlobalMonitor.setDocumentOverflowHidden(visible);
  }

  get nzVisible(): boolean {
    return this._visible;
  }

  @Input()
  set nzWidth(value: number | string) {
    this._width = typeof value === 'number' ? value + 'px' : value;
  }

  @Input()
  set nzClass(value: string) {
    this._customClass = value;
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
  set nzContent(value: string | TemplateRef<void>) {
    if (value instanceof TemplateRef) {
      this._contentTpl = value;
    } else {
      this._content = value;
    }
  }

  @Input()
  set nzMaskClosable(value: boolean) {
    this._maskClosable = toBoolean(value);
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
  set nzIconType(value: string) {
    if (value) {
      this._iconTypeCls = `anticon anticon-${value}`;
    }
  }

  @Input()
  set nzConfirmType(value: string) {
    if (value) {
      this._typeCls = `${this._prefixConfirmCls}-${value}`;
    }
  }

  @Input()
  set nzConfirmLoading(value: boolean) {
    this._confirmLoading = toBoolean(value);
  }

  @HostListener('keydown.esc', [ '$event' ])
  onEsc(e: KeyboardEvent): void {
    if (this._maskClosable) {
      this.subject.next('onCancel');
    }
  }

  @HostListener('keydown.enter', [ '$event' ])
  onEnter(e: KeyboardEvent): void {
    this.subject.next('onOk');
  }

  setStyles(origin?: { x: number, y: number }): void {
    const el = this.contentEl.nativeElement;
    const transformOrigin = origin ? `${origin.x - el.offsetLeft}px ${origin.y - el.offsetTop}px 0px` : '';

    this._bodyStyleMap = {
      'width'           : this._width,
      'transform-origin': transformOrigin
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
      [this._prefixCls]       : true,
      [this._prefixConfirmCls]: true,
      [this._typeCls]         : true,
      'zoom-enter'            : this._animationStatus === 'enter',
      'zoom-enter-active'     : this._animationStatus === 'enter',
      'zoom-leave'            : this._animationStatus === 'leave',
      'zoom-leave-active'     : this._animationStatus === 'leave'
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
      this.subject.next('onCancel');
    }
  }

  constructor(public subject: NzModalSubject, private _locale: NzLocaleService) {
  }

  // 通过createComponent方法创建component时，ngOnInit不会被触发
  ngOnInit(): void {
    this.setClassMap();
    this.setStyles();
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
