import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[nz-form]'
})
export class NzFormDirective implements OnInit {
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
