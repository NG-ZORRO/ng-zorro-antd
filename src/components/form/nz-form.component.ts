import { Component, ElementRef, Input, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : '[nz-form]',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <ng-content></ng-content>
  `,
  styleUrls    : [
    './style/index.less',
    './style/patch.less'
  ]
})
export class NzFormComponent implements OnInit {
  _classList: string[] = [];
  _el: HTMLElement;
  _prefixCls = 'ant-form';

  /**  @deprecated Use `nzLayout` instead. */
  @Input() nzType = 'horizontal';

  @Input()
  set nzLayout(value: string) {
    this.nzType = value;
    this.setClassMap();
  }

  setClassMap(): void {
    this._classList.forEach(_className => {
      this._renderer.removeClass(this._el, _className);
    });
    this._classList = [
      this.nzType && `${this._prefixCls}-${this.nzType}`
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
