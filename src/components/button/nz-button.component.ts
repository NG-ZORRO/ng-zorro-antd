import {
  AfterContentInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { toBoolean } from '../util/convert';

export type NzButtonType = 'primary' | 'dashed' | 'danger';
export type NzButtonShape = 'circle' | null ;
export type NzButtonSize = 'small' | 'large' | 'default' ;

@Component({
  selector     : '[nz-button]',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <i class="anticon anticon-spin anticon-loading" *ngIf="nzLoading"></i>
    <ng-content></ng-content>
  `,
  styleUrls    : [
    './style/index.less'
  ]
})
export class NzButtonComponent implements AfterContentInit {
  private _ghost = false;
  private _loading = false;
  _el: HTMLElement;
  nativeElement: HTMLElement;
  _iconElement: HTMLElement;
  _type: NzButtonType;
  _shape: NzButtonShape;
  _size: NzButtonSize;
  _classList: string[] = [];
  _iconOnly = false;
  _clicked = false;
  _prefixCls = 'ant-btn';
  _sizeMap = { large: 'lg', small: 'sm' };

  @Input()
  set nzGhost(value: boolean) {
    this._ghost = toBoolean(value);
    this._setClassMap();
  }

  get nzGhost(): boolean {
    return this._ghost;
  }

  @Input()
  get nzType(): NzButtonType {
    return this._type;
  }

  set nzType(value: NzButtonType) {
    this._type = value;
    this._setClassMap();
  }

  @Input()
  get nzShape(): NzButtonShape {
    return this._shape;
  }

  set nzShape(value: NzButtonShape) {
    this._shape = value;
    this._setClassMap();
  }

  @Input()
  set nzSize(value: NzButtonSize) {
    this._size = value;
    this._setClassMap();
  }

  get nzSize(): NzButtonSize {
    return this._size;
  }

  @Input()
  set nzLoading(value: boolean) {
    this._loading = toBoolean(value);
    this._setClassMap();
    this._setIconDisplay(value);
  }

  get nzLoading(): boolean {
    return this._loading;
  }

  /** toggle button clicked animation */
  @HostListener('click')
  _onClick(): void {
    this._clicked = true;
    this._setClassMap();
    setTimeout(() => {
      this._clicked = false;
      this._setClassMap();
    }, 300);
  }

  _setIconDisplay(value: boolean): void {
    const innerI = this._iconElement;
    if (innerI) {
      this._renderer.setStyle(innerI, 'display', value ? 'none' : 'inline-block');
    }
  }

  /** temp solution since no method add classMap to host https://github.com/angular/angular/issues/7289 */
  _setClassMap(): void {
    this._classList.forEach(_className => {
      this._renderer.removeClass(this._el, _className);
    });
    this._classList = [
      this.nzType && `${this._prefixCls}-${this.nzType}`,
      this.nzShape && `${this._prefixCls}-${this.nzShape}`,
      this._sizeMap[ this.nzSize ] && `${this._prefixCls}-${this._sizeMap[ this.nzSize ]}`,
      this.nzLoading && `${this._prefixCls}-loading`,
      this._clicked && `${this._prefixCls}-clicked`,
      this._iconOnly && `${this._prefixCls}-icon-only`,
      this.nzGhost && `${this._prefixCls}-background-ghost`,
    ].filter((item) => {
      return !!item;
    });
    this._classList.forEach(_className => {
      this._renderer.addClass(this._el, _className);
    });
  }

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
    this._el = this._elementRef.nativeElement;
    this.nativeElement = this._elementRef.nativeElement;
    this._renderer.addClass(this._el, this._prefixCls);
  }

  ngAfterContentInit(): void {
    this._iconElement = this._innerIElement;
    /** check if host children only has i element */
    if (this._iconElement && this._el.children.length === 1 && (this._iconElement.isEqualNode(this._el.children[ 0 ]))) {
      this._iconOnly = true;
      this._setClassMap();
    }
    this._setIconDisplay(this.nzLoading);
  }

  get _innerIElement(): HTMLElement {
    return this._el.querySelector('i');
  }
}
