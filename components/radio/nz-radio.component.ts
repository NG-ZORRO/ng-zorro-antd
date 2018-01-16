import {
  forwardRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Optional,
  Renderer2
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { toBoolean } from '../core/util/convert';
import { NzRadioGroupComponent } from './nz-radio-group.component';

@Component({
  selector           : '[nz-radio]',
  preserveWhitespaces: false,
  template           : `
    <span [ngClass]="_classMap">
      <span [ngClass]="_innerPrefixCls"></span>
      <input type="radio" [ngClass]="_inputPrefixCls" [(ngModel)]="nzChecked" (focus)="nzFocus()" (blur)="nzBlur()">
    </span>
    <ng-content></ng-content>
  `,
  providers          : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzRadioComponent),
      multi      : true
    }
  ]
})
export class NzRadioComponent implements OnInit, ControlValueAccessor {
  private _focused = false;
  _checked = false;
  _disabled = false;
  _el: HTMLElement;
  _classMap;
  _value: string;
  _prefixCls = 'ant-radio';
  _innerPrefixCls = `${this._prefixCls}-inner`;
  _inputPrefixCls = `${this._prefixCls}-input`;
  // ngModel Access
  onChange: (_: boolean) => void = () => null;
  onTouched: () => void = () => null;

  @Input()
  @HostBinding('class.ant-radio-wrapper-checked')
  set nzChecked(value: boolean) {
    this._checked = toBoolean(value);
    this.setClassMap();
  }

  get nzChecked(): boolean {
    return this._checked;
  }

  @Input()
  get nzValue(): string {
    return this._value;
  }

  set nzValue(value: string) {
    if (this._value === value) {
      return;
    }
    this._value = value;
  }

  @Input()
  @HostBinding('class.ant-radio-wrapper-disabled')
  set nzDisabled(value: boolean) {
    this._disabled = toBoolean(value);
    this.setClassMap();
  }

  get nzDisabled(): boolean {
    return this._disabled;
  }

  @HostListener('click', [ '$event' ])
  onClick(e: MouseEvent): void {
    e.preventDefault();
    if (!this._disabled) {
      if (this._nzRadioGroup) {
        this._checked = true;
        this.setClassMap();
        this._nzRadioGroup.selectRadio(this);
      } else {
        this.updateValue(true);
      }
    }
  }

  nzFocus(): void {
    this._focused = true;
    this.setClassMap();
  }

  nzBlur(): void {
    this._focused = false;
    this.setClassMap();
    if (this._nzRadioGroup) this._nzRadioGroup.onTouched();
  }

  setClassMap(): void {
    this._classMap = {
      [ this._prefixCls ]              : true,
      [ `${this._prefixCls}-checked` ] : this._checked,
      [ `${this._prefixCls}-focused` ] : this._focused,
      [ `${this._prefixCls}-disabled` ]: this._disabled
    };
  }

  constructor(private _elementRef: ElementRef, public _renderer: Renderer2, @Optional() public _nzRadioGroup: NzRadioGroupComponent) {
    this._el = this._elementRef.nativeElement;
  }

  ngOnInit(): void {
    if (this._nzRadioGroup) this._nzRadioGroup.addRadio(this);
    this._renderer.addClass(this._el, `${this._prefixCls}-wrapper`);
    this.setClassMap();
  }

  // region: value accessor
  updateValue(value: boolean): void {
    if (value === this._checked) {
      return;
    }
    this.onChange(value);
    this._focused = false;
    this._checked = value;
    this.setClassMap();
  }

  writeValue(value: boolean): void {
    this._checked = value;
    this.setClassMap();
  }

  registerOnChange(fn: (_: boolean) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  // endregion
}
