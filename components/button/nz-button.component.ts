import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild
} from '@angular/core';

import { NzUpdateHostClassService } from '../core/services/update-host-class.service';
import { filterNotEmptyNode, isEmpty } from '../core/util/check';
import { toBoolean } from '../core/util/convert';
import { NzWaveDirective } from '../core/wave/nz-wave.directive';
import { NzIconDirective } from '../icon/nz-icon.directive';

export type NzButtonType = 'primary' | 'dashed' | 'danger';
export type NzButtonShape = 'circle' | null ;
export type NzButtonSize = 'small' | 'large' | 'default' ;

@Component({
  selector           : '[nz-button]',
  providers          : [ NzUpdateHostClassService ],
  preserveWhitespaces: false,
  templateUrl        : './nz-button.component.html'
})
export class NzButtonComponent implements AfterContentInit, OnInit, OnDestroy {
  private _ghost = false;
  private _search = false;
  private _type: NzButtonType;
  private _shape: NzButtonShape;
  private _size: NzButtonSize;
  private _loading = false;
  private _block = false;
  private el: HTMLElement = this.elementRef.nativeElement;
  private iconElement: HTMLElement;
  private iconOnly = false;
  private prefixCls = 'ant-btn';
  private sizeMap = { large: 'lg', small: 'sm' };
  @ViewChild('contentElement') contentElement: ElementRef;
  @ContentChildren(NzIconDirective, { read: ElementRef }) listOfIconElement: QueryList<ElementRef>;

  @Input()
  set nzBlock(value: boolean) {
    this._block = toBoolean(value);
    this.setClassMap();
  }

  get nzBlock(): boolean {
    return this._block;
  }

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
  set nzType(value: NzButtonType) {
    this._type = value;
    this.setClassMap();
  }

  get nzType(): NzButtonType {
    return this._type;
  }

  @Input()
  set nzShape(value: NzButtonShape) {
    this._shape = value;
    this.setClassMap();
  }

  get nzShape(): NzButtonShape {
    return this._shape;
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
    this.updateIconDisplay(value);
  }

  get nzLoading(): boolean {
    return this._loading;
  }

  @HostBinding('attr.nz-wave') nzWave = new NzWaveDirective(this.ngZone, this.elementRef);

  updateIconDisplay(value: boolean): void {
    if (this.iconElement) {
      this.renderer.setStyle(this.iconElement, 'display', value ? 'none' : 'inline-block');
    }
  }

  /** temp solution since no method add classMap to host https://github.com/angular/angular/issues/7289 */
  setClassMap(): void {
    const classMap = {
      [ `${this.prefixCls}-${this.nzType}` ]                : this.nzType,
      [ `${this.prefixCls}-${this.nzShape}` ]               : this.nzShape,
      [ `${this.prefixCls}-${this.sizeMap[ this.nzSize ]}` ]: this.sizeMap[ this.nzSize ],
      [ `${this.prefixCls}-loading` ]                       : this.nzLoading,
      [ `${this.prefixCls}-icon-only` ]                     : this.iconOnly,
      [ `${this.prefixCls}-background-ghost` ]              : this.nzGhost,
      [ `${this.prefixCls}-block` ]                         : this.nzBlock,
      [ `ant-input-search-button` ]                         : this.nzSearch
    };
    this.nzUpdateHostClassService.updateHostClass(this.el, classMap);
  }

  checkContent(): void {
    const hasIcon = this.listOfIconElement && this.listOfIconElement.length;
    if (hasIcon) {
      this.moveIcon();
    }
    this.renderer.removeStyle(this.contentElement.nativeElement, 'display');
    /** https://github.com/angular/angular/issues/12530 **/
    if (isEmpty(this.contentElement.nativeElement)) {
      this.renderer.setStyle(this.contentElement.nativeElement, 'display', 'none');
      this.iconOnly = !!hasIcon;
    } else {
      this.renderer.removeStyle(this.contentElement.nativeElement, 'display');
      this.iconOnly = false;
    }
    this.setClassMap();
    this.updateIconDisplay(this.nzLoading);
    this.cdr.detectChanges();
  }

  moveIcon(): void {
    if (this.listOfIconElement && this.listOfIconElement.length) {
      const firstChildElement = this.findFirstNotEmptyNode(this.contentElement.nativeElement);
      const lastChildElement = this.findLastNotEmptyNode(this.contentElement.nativeElement);
      if (firstChildElement && (firstChildElement === this.listOfIconElement.first.nativeElement)) {
        this.renderer.insertBefore(this.el, firstChildElement, this.contentElement.nativeElement);
        this.iconElement = firstChildElement as HTMLElement;
      } else if (lastChildElement && (lastChildElement === this.listOfIconElement.last.nativeElement)) {
        this.renderer.appendChild(this.el, lastChildElement);
      }
    }
  }

  findFirstNotEmptyNode(element: HTMLElement): Node {
    const children = element.childNodes;
    for (let i = 0; i < children.length; i++) {
      const node = children.item(i);
      if (filterNotEmptyNode(node)) {
        return node;
      }
    }
    return null;
  }

  findLastNotEmptyNode(element: HTMLElement): Node {
    const children = element.childNodes;
    for (let i = children.length - 1; i >= 0; i--) {
      const node = children.item(i);
      if (filterNotEmptyNode(node)) {
        return node;
      }
    }
    return null;
  }

  constructor(private elementRef: ElementRef, private cdr: ChangeDetectorRef, private renderer: Renderer2, private nzUpdateHostClassService: NzUpdateHostClassService, private ngZone: NgZone) {
  }

  ngAfterContentInit(): void {
    this.checkContent();
  }

  ngOnInit(): void {
    this.renderer.addClass(this.el, this.prefixCls);
    this.nzWave.ngOnInit();
  }

  ngOnDestroy(): void {
    this.nzWave.ngOnDestroy();
  }
}
