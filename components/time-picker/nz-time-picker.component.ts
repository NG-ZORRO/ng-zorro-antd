import { Overlay, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { Component, ElementRef, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isUndefined } from 'util';
import { NzUpdateHostClassService as UpdateCls } from '../core/services/update-host-class.service';
import { NzI18nService as I18n } from '../i18n';

@Component({
  selector: 'nz-time-picker',
  templateUrl: './nz-time-picker.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: NzTimePickerComponent, multi: true }
  ]
})
export class NzTimePickerComponent implements ControlValueAccessor, OnInit {
  @Input() nzFormat = 'HH:mm:ss';
  @Input() nzSize: string | null = null;
  @Input() nzOffset: [number, number, number];
  @Input() nzHourStep = 1;
  @Input() nzMinuteStep = 1;
  @Input() nzSecondStep = 1;

  @ViewChild('input')
  inputRef: ElementRef;

  opened = false;

  private _value: Date | null = null;

  private _onChange: (value: Date) => void;
  private _onTouched: () => void;

  get value(): Date | null {
    return this._value;
  }

  set value(value: Date | null) {
    this._value = value;
    if (this._onChange) {
      this._onChange(this.value);
    }
    if (this._onTouched) {
      this._onTouched();
    }
  }

  private _disabled = false;

  get disabled(): boolean | string {
    return this._disabled;
  }

  @Input('nzDisabled')
  set disabled(value: boolean | string) {
    this._disabled = value === '' || !isUndefined(value) && !!value;
    const input = this.inputRef.nativeElement as HTMLInputElement;
    if (this._disabled) {
      input.setAttribute('disabled', 'disabled');
    } else {
      input.removeAttribute('disabled');
    }
  }

  constructor(private element: ElementRef,
              private injector: Injector,
              private overlay: Overlay,
              private positionBuilder: OverlayPositionBuilder,
              private i18n: I18n,
              private updateCls: UpdateCls) {
  }

  ngOnInit(): void {
    this.setClassMap();
  }

  open(): void {
    if (this.disabled) {
      return;
    }
    this.opened = true;
  }

  close(): void {
    this.opened = false;
  }

  writeValue(time: Date | null): void {
    this.value = time;
  }

  registerOnChange(fn: (time: Date) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private setClassMap(): void {
    this.updateCls.updateHostClass(this.element.nativeElement, {
      [`ant-time-picker`]: true,
      [`ant-time-picker-${this.nzSize}`]: this.nzSize != null
    });
  }
}
