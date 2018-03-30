import { Directive, HostBinding, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzI18nService } from '../i18n';

@Directive({
  selector: 'input[nzTime]',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: NzTimeValueAccessorDirective, multi: true }
  ]
})
export class NzTimeValueAccessorDirective implements ControlValueAccessor {
  @HostBinding('value')
  value: string;
  @Input('nzTime')
  format: string;
  private _onChange: (value: Date) => void;
  private _onTouch: () => void;

  constructor(private i18n: NzI18nService) {
  }

  writeValue(value: Date): void {
    this.value = this.i18n.formatDate(value, this.format);
  }

  changed(): void {
    if (this._onChange) {
      this._onChange(this.i18n.parseDate(this.value));
    }
  }

  registerOnChange(fn: (value: Date) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouch = fn;
  }

}
