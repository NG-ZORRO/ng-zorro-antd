import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';

export type NzJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between';
export type NzAlign = 'top' | 'middle' | 'bottom';
export type NzType = 'flex' | null;

@Component({
  selector     : '[nz-row],nz-row',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <ng-content></ng-content>
  `,
  styleUrls    : [
    './style/index.less'
  ]
})
export class NzRowComponent implements OnInit {
  _classList: string[] = [];
  _el: HTMLElement;
  _prefixCls = 'ant-row';
  _gutter: number;
  _type: NzType;
  _align: NzAlign = 'top';
  _justify: NzJustify = 'start';

  @Input()
  set nzType(value: NzType) {
    this._type = value;
    this.setClassMap();
  }

  get nzType(): NzType {
    return this._type;
  }

  @Input()
  set nzAlign(value: NzAlign) {
    this._align = value;
    this.setClassMap();
  }

  get nzAlign(): NzAlign {
    return this._align;
  }

  @Input()
  set nzJustify(value: NzJustify) {
    this._justify = value;
    this.setClassMap();
  }

  get nzJustify(): NzJustify {
    return this._justify;
  }

  @Input()
  get nzGutter(): number {
    return this._gutter;
  }

  set nzGutter(value: number) {
    this._gutter = value;
    this.setStyle();
  }

  setStyle(): void {
    this._renderer.setStyle(this._el, 'margin-left', `-${this._gutter / 2}px`);
    this._renderer.setStyle(this._el, 'margin-right', `-${this._gutter / 2}px`);
  }

  /** temp solution since no method add classMap to host https://github.com/angular/angular/issues/7289*/
  setClassMap(): void {
    this._classList.forEach(_className => {
      this._renderer.removeClass(this._el, _className);
    });
    this._classList = [
      (!this.nzType) && this._prefixCls,
      this.nzType && `${this._prefixCls}-${this.nzType}`,
      this.nzType && this.nzAlign && `${this._prefixCls}-${this.nzType}-${this.nzAlign}`,
      this.nzType && this.nzJustify && `${this._prefixCls}-${this.nzType}-${this.nzJustify}`
    ].filter((item) => {
      return !!item;
    });
    this._classList.forEach(_className => {
      this._renderer.addClass(this._el, _className);
    });
  }

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
    this._el = this._elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.setClassMap();
  }
}
