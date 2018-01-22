import {
  forwardRef,
  Component,
  ElementRef,
  Input,
  Renderer2
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { toBoolean } from '../core/util/convert';

@Component({
  selector           : 'nz-checkbox-group',
  preserveWhitespaces: false,
  template           : `
    <label
      [class.ant-checkbox-vertical]="nzType=='vertical'"
      nz-checkbox
      *ngFor="let option of _options"
      [nzDisabled]="option.disabled||nzDisabled"
      [(ngModel)]="option.checked"
      (ngModelChange)="_optionChange()">
      <span>{{ option.label }}</span>
    </label>`,
  providers          : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzCheckboxGroupComponent),
      multi      : true
    }
  ]
})
export class NzCheckboxGroupComponent implements ControlValueAccessor {
  private _disabled = false;
  _el: HTMLElement;
  /* tslint:disable-next-line:no-any */
  _options: any[];
  _prefixCls = 'ant-checkbox-group';
  // ngModel Access
  onChange = Function.prototype;
  onTouched = Function.prototype;
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

  constructor(private _elementRef: ElementRef, private _render: Renderer2) {
    this._el = this._elementRef.nativeElement;
    this._render.addClass(this._el, `${this._prefixCls}`);
  }

  /* tslint:disable-next-line:no-any */
  writeValue(value: any[]): void {
    this._options = value;
  }

  /* tslint:disable-next-line:no-any */
  registerOnChange(fn: (_: any[]) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
  }
}
