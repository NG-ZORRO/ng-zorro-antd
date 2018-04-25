import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzI18nService } from '../i18n/nz-i18n.service';

@Directive({
  selector : 'input[nzTime]',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: NzTimeValueAccessorDirective, multi: true }
  ]
})
export class NzTimeValueAccessorDirective implements ControlValueAccessor, OnInit {

  private _onChange: (value: Date) => void;
  private _onTouch: () => void;
  @Input('nzTime') format: string;

  get element(): HTMLInputElement {
    return this.elementRef.nativeElement;
  }

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
      const value = this.i18n.parseTime(this.element.value);
      this._onChange(value);
    }
  }

  touched(): void {
    if (this._onTouch) {
      this._onTouch();
    }
  }

  constructor(private i18n: NzI18nService, private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    Promise.resolve().then(() => {
      this.element.focus();
    });
  }

  writeValue(value: Date): void {
    this.element.value = this.i18n.formatDate(value, this.format);
    this.element.setSelectionRange(0, this.element.value.length);
  }

  registerOnChange(fn: (value: Date) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouch = fn;
  }

}
