import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzI18nService } from '../i18n/nz-i18n.service';

@Directive({
  selector : 'input[nzTime]',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: NzTimeValueAccessorDirective, multi: true }
  ]
})
export class NzTimeValueAccessorDirective implements ControlValueAccessor {

  private _onChange: (value: Date) => void;
  private _onTouch: () => void;
  @Input() nzTime: string;

  @HostListener('keyup')
  keyup(): void {
    this.changed();
  }

  @HostListener('blur')
  blur(): void {
    this.touched();
  }

  changed(): void {
    if (this._onChange) {
      const value = this.i18n.parseTime(this.elementRef.nativeElement.value);
      this._onChange(value);
    }
  }

  touched(): void {
    if (this._onTouch) {
      this._onTouch();
    }
  }

  setRange(): void {
    this.elementRef.nativeElement.focus();
    this.elementRef.nativeElement.setSelectionRange(0, this.elementRef.nativeElement.value.length);
  }

  constructor(private i18n: NzI18nService, private elementRef: ElementRef) {
  }

  writeValue(value: Date): void {
    this.elementRef.nativeElement.value = this.i18n.formatDate(value, this.nzTime);
  }

  registerOnChange(fn: (value: Date) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouch = fn;
  }

}
