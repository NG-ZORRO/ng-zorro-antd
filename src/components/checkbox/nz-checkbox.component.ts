import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  ElementRef,
  Renderer2,
  HostListener,
  forwardRef, OnChanges
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector     : '[nz-checkbox]',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <span [ngClass]="_classMap">
      <span [ngClass]="_innerPrefixCls"></span>
      <input type="checkbox"
        [ngClass]="_inputPrefixCls"
        [ngModel]="nzChecked"
        (focus)="nzFocus()"
        (blur)="onTouched();nzBlur()">
    </span>
    <ng-content></ng-content>
  `,
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzCheckboxComponent),
      multi      : true
    }
  ],
  styleUrls    : [
    './style/index.less'
  ]
})
export class NzCheckboxComponent implements OnInit, ControlValueAccessor, OnChanges {
  _el: HTMLElement;
  _prefixCls = 'ant-checkbox';
  _innerPrefixCls = `${this._prefixCls}-inner`;
  _inputPrefixCls = `${this._prefixCls}-input`;
  _checked = false;
  _focused = false;
  // ngModel Access
  onChange: any = Function.prototype;
  onTouched: any = Function.prototype;
  @Input() nzDisabled = false;
  @Input() nzIndeterminate = false;
  _classMap = {
    [this._prefixCls]                   : true,
    [`${this._prefixCls}-checked`]      : this._checked && (!this.nzIndeterminate),
    [`${this._prefixCls}-focused`]      : this._focused,
    [`${this._prefixCls}-disabled`]     : this.nzDisabled,
    [`${this._prefixCls}-indeterminate`]: this.nzIndeterminate,
  };

  @Input()
  get nzChecked(): boolean {
    return this._checked;
  };

  @HostListener('click', [ '$event' ])
  onClick(e) {
    e.preventDefault();
    if (!this.nzDisabled) {
      this.updateValue(!this._checked);
    }
  }

  updateValue(value) {
    if (value === this._checked) {
      return;
    }
    this.onChange(value);
    this._checked = value;
    this.updateClassMap();
  }

  nzFocus() {
    this._focused = true;
  }

  nzBlur() {
    this._focused = false;
  }

  constructor(private _elementRef: ElementRef, private _render: Renderer2) {
    this._el = this._elementRef.nativeElement;
  }

  writeValue(value: any): void {
    this._checked = value;
    this.updateClassMap();
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
  }

  updateClassMap() {
    this._classMap = {
      [this._prefixCls]                   : true,
      [`${this._prefixCls}-checked`]      : this._checked && (!this.nzIndeterminate),
      [`${this._prefixCls}-focused`]      : this._focused,
      [`${this._prefixCls}-disabled`]     : this.nzDisabled,
      [`${this._prefixCls}-indeterminate`]: this.nzIndeterminate,
    }
  }

  ngOnInit() {
    this._render.addClass(this._el, `${this._prefixCls}-wrapper`);
    this.updateClassMap();
  }

  ngOnChanges() {
    this.updateClassMap();
  }
}
