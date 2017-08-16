import { Component, ViewEncapsulation, Renderer2, ElementRef, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';

export type NzAvatarShape = 'square' | 'circle';
export type NzAvatarSize = 'small' | 'large' | 'default';

@Component({
  selector: 'nz-avatar',
  encapsulation: ViewEncapsulation.None,
  template: `
  <i class="anticon anticon-{{nzIcon}}" *ngIf="nzIcon && _hasIcon"></i>
  <img [src]="nzSrc" *ngIf="nzSrc && _isSrcExist" (error)="_imgError($event)"/>
  <span class="ant-avatar-string" #textEl [ngStyle]="_textStyles" *ngIf="nzText && _hasText">{{nzText}}</span>
  `,
  styleUrls: [
    './style/index.less',
    './style/patch.less'
  ]
})
export class NzAvatarComponent implements OnChanges {

  private _el: HTMLElement;
  private _prefixCls = 'ant-avatar';
  private _classList: string[] = [];
  private _sizeMap = { large: 'lg', small: 'sm' };

  _hasText: boolean = false;
  @ViewChild('textEl') _textEl: ElementRef;
  _textStyles: {};

  _isSrcExist: boolean = true;

  _hasIcon: boolean = false;

  @Input() nzShape: NzAvatarShape = 'circle';

  @Input() nzSize: NzAvatarSize = 'default';

  @Input() nzText: string;

  @Input() nzSrc: string;

  @Input() nzIcon: string;

  _setClassMap() {
    this._classList.forEach(_className => {
      this._renderer.removeClass(this._el, _className);
    })
    this._classList = [
      this._sizeMap[this.nzSize] && `${this._prefixCls}-${this._sizeMap[this.nzSize]}`,
      this.nzShape && `${this._prefixCls}-${this.nzShape}`,
      this.nzIcon && `${this._prefixCls}-icon`,
      this.nzSrc && `${this._prefixCls}-image`
    ].filter((item) => {
      return !!item;
    });
    this._classList.forEach(_className => {
      this._renderer.addClass(this._el, _className);
    });
    return this;
  }

  _imgError() {
    this._isSrcExist = false;
    // TODO(i): need force remove [nzSrc] if broken image?
    this._hasIcon = false;
    this._hasText = false;
    if (this.nzIcon) {
      this._hasIcon = true;
    } else if (this.nzText) {
      this._hasText = true;
    }
    this._setClassMap()._notifyCalc();
  }

  private _calcStringSize() {
    if (!this._hasText) return;

    const el = this._textEl && this._textEl.nativeElement;
    if (!el) return;

    const childrenWidth = el.offsetWidth;
    const avatarWidth = this._el.getBoundingClientRect().width;
    const scale = avatarWidth - 8 < childrenWidth ? (avatarWidth - 8) / childrenWidth : 1;
    if (scale === 1) {
      this._textStyles = {};
    } else {
      this._textStyles = {
        transform: `scale(${scale})`,
        position: 'absolute',
        display: 'inline-block',
        left: `calc(50% - ${Math.round(childrenWidth / 2)}px)`
      };
    }
  }

  private _notifyCalc() {
    // If use ngAfterViewChecked, always demands more computations, so......
    setTimeout(() => {
      this._calcStringSize();
    });
    return this;
  }

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
    this._el = _elementRef.nativeElement;
    this._renderer.addClass(this._el, this._prefixCls);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._hasText = !this.nzSrc && !!this.nzText;
    this._hasIcon = !this.nzSrc && !!this.nzIcon;

    this._setClassMap()._notifyCalc();
  }

}
