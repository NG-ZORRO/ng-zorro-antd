/* tslint:disable:no-any */
import {
  forwardRef,
  AfterContentInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { toBoolean } from '../util/convert';

@Component({
  selector     : 'nz-checkbox-group',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <label
      [class.ant-checkbox-vertical]="nzType=='vertical'"
      nz-checkbox
      *ngFor="let option of _options"
      [nzDisabled]="option.disabled||nzDisabled"
      [(ngModel)]="option.checked"
      (ngModelChange)="_optionChange()">
      <span>{{ option.label }}</span>
    </label>`,
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzCheckboxGroupComponent),
      multi      : true
    }
  ],
  styleUrls    : [
    './style/index.less'
  ]
})
export class NzCheckboxGroupComponent implements ControlValueAccessor {
  private _disabled = false;
  _el: HTMLElement;
  _options: any[];
  _prefixCls = 'ant-checkbox-group';
  // ngModel Access
  onChange: any = Function.prototype;
  onTouched: any = Function.prototype;
  @Input() nzType: string;

  @Input()
  set nzDisabled(value: boolean) {
    this._disabled = toBoolean(value);
  }

  get nzDisabled(): boolean {
    return this._disabled;
  }

  _optionChange(): void {
    this.onChange(this._options);
  }

  constructor(private _elementRef: ElementRef, private _render: Renderer) {
    this._el = this._elementRef.nativeElement;
    this._render.setElementClass(this._el, `${this._prefixCls}`, true);
  }

  writeValue(value: any): void {
    this._options = value;
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
}
