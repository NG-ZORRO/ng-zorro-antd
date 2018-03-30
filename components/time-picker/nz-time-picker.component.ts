import { Overlay, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { Component, ElementRef, Injector, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzUpdateHostClassService as UpdateCls } from '../core/services/update-host-class.service';
import { NzI18nService as I18n } from '../i18n/nz-i18n.service';

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
  @Input() nzMinuteStep: number;
  @Input() nzSecondStep: number;
  formattedTime: string | null;
  opened = false;
  private selectedTime: Date | null = null;

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
    this.opened = true;
  }

  close(): void {
    this.opened = false;
  }

  updateTime(time: Date | null): void {
    this.selectedTime = time;
    this.formattedTime = time ? this.i18n.formatDate(time, this.nzFormat) : null;
  }

  writeValue(time: Date | null): void {
    this.updateTime(time);
  }

  registerOnChange(fn: (time: Date) => void): void {

  }

  registerOnTouched(fn: () => void): void {

  }

  setDisabledState?(isDisabled: boolean): void {

  }

  private setClassMap(): void {
    this.updateCls.updateHostClass(this.element.nativeElement, {
      [`ant-time-picker`]: true,
      [`ant-time-picker-${this.nzSize}`]: this.nzSize != null
    });
  }
}
