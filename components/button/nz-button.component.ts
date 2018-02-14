import {
  AfterContentInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  Renderer2
} from '@angular/core';
import { NzUpdateHostClassService } from '../core/services/update-host-class.service';
import { toBoolean } from '../core/util/convert';

export type NzButtonType = 'primary' | 'dashed' | 'danger';
export type NzButtonShape = 'circle' | null ;
export type NzButtonSize = 'small' | 'large' | 'default' ;

@Component({
  selector           : '[nz-button]',
  providers          : [ NzUpdateHostClassService ],
  preserveWhitespaces: false,
  template           : `
    <i class="anticon anticon-spin anticon-loading" *ngIf="nzLoading"></i>
    <ng-content></ng-content>
  `
})
export class NzButtonComponent implements AfterContentInit {
  private _ghost = false;
  private _search = false;
  private _type: NzButtonType;
  private _shape: NzButtonShape;
  private _size: NzButtonSize;
  private _loading = false;
  private el: HTMLElement;
  private iconElement: HTMLElement;
  private iconOnly = false;
  private clicked = false;
  private prefixCls = 'ant-btn';
  private sizeMap = { large: 'lg', small: 'sm' };

  @Input()
  set nzGhost(value: boolean) {
    this._ghost = toBoolean(value);
    this.setClassMap();
  }

  get nzGhost(): boolean {
    return this._ghost;
  }

  @Input()
  set nzSearch(value: boolean) {
    this._search = toBoolean(value);
    this.setClassMap();
  }

  get nzSearch(): boolean {
    return this._search;
  }

  @Input()
  get nzType(): NzButtonType {
    return this._type;
  }

  set nzType(value: NzButtonType) {
    this._type = value;
    this.setClassMap();
  }

  @Input()
  get nzShape(): NzButtonShape {
    return this._shape;
  }

  set nzShape(value: NzButtonShape) {
    this._shape = value;
    this.setClassMap();
  }

  @Input()
  set nzSize(value: NzButtonSize) {
    this._size = value;
    this.setClassMap();
  }

  get nzSize(): NzButtonSize {
    return this._size;
  }

  @Input()
  set nzLoading(value: boolean) {
    this._loading = toBoolean(value);
    this.setClassMap();
    this.setIconDisplay(value);
  }

  get nzLoading(): boolean {
    return this._loading;
  }

  /** toggle button clicked animation */
  @HostListener('click')
  onClick(): void {
    this.clicked = true;
    this.setClassMap();
    setTimeout(() => {
      this.clicked = false;
      this.setClassMap();
    }, 300);
  }

  setIconDisplay(value: boolean): void {
    const innerI = this.iconElement;
    if (innerI) {
      this.renderer.setStyle(innerI, 'display', value ? 'none' : 'inline-block');
    }
  }

  /** temp solution since no method add classMap to host https://github.com/angular/angular/issues/7289 */
  setClassMap(): void {
    const classMap = {
      [ `${this.prefixCls}-${this.nzType}` ]                : this.nzType,
      [ `${this.prefixCls}-${this.nzShape}` ]               : this.nzShape,
      [ `${this.prefixCls}-${this.sizeMap[ this.nzSize ]}` ]: this.sizeMap[ this.nzSize ],
      [ `${this.prefixCls}-loading` ]                       : this.nzLoading,
      [ `${this.prefixCls}-clicked` ]                       : this.clicked,
      [ `${this.prefixCls}-icon-only` ]                     : this.iconOnly,
      [ `${this.prefixCls}-background-ghost` ]              : this.nzGhost,
      [ `ant-input-search-button` ]                         : this.nzSearch
    };
    this.nzUpdateHostClassService.updateHostClass(this.el, classMap);
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private nzUpdateHostClassService: NzUpdateHostClassService) {
    this.el = this.elementRef.nativeElement;
    this.renderer.addClass(this.el, this.prefixCls);
  }

  ngAfterContentInit(): void {
    this.iconElement = this.innerIElement;
    /** check if host children only has i element */
    if (this.iconElement && this.el.children.length === 1 && (this.iconElement.isEqualNode(this.el.children[ 0 ]))) {
      this.iconOnly = true;
      this.setClassMap();
    }
    this.setIconDisplay(this.nzLoading);
  }

  get innerIElement(): HTMLElement {
    return this.el.querySelector('i');
  }
}
