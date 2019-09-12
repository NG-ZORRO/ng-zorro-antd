/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DebugElement,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { isNotNil, reqAnimFrame, InputBoolean, NzUpdateHostClassService as UpdateCls } from 'ng-zorro-antd/core';

import { NzTimeValueAccessorDirective } from './nz-time-value-accessor.directive';
import { TimeHolder } from './time-holder';

function makeRange(length: number, step: number = 1, start: number = 0): number[] {
  return new Array(Math.ceil(length / step)).fill(0).map((_, i) => (i + start) * step);
}

export type NzTimePickerUnit = 'hour' | 'minute' | 'second' | '12-hour';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nz-time-picker-panel',
  exportAs: 'nzTimePickerPanel',
  templateUrl: './nz-time-picker-panel.component.html',
  providers: [UpdateCls, { provide: NG_VALUE_ACCESSOR, useExisting: NzTimePickerPanelComponent, multi: true }]
})
export class NzTimePickerPanelComponent implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
  private _nzHourStep = 1;
  private _nzMinuteStep = 1;
  private _nzSecondStep = 1;
  private unsubscribe$ = new Subject<void>();
  private onChange: (value: Date) => void;
  private onTouch: () => void;
  private _format = 'HH:mm:ss';
  private _disabledHours: () => number[];
  private _disabledMinutes: (hour: number) => number[];
  private _disabledSeconds: (hour: number, minute: number) => number[];
  private _allowEmpty = true;
  prefixCls: string = 'ant-time-picker-panel';
  time = new TimeHolder();
  hourEnabled = true;
  minuteEnabled = true;
  secondEnabled = true;
  enabledColumns = 3;
  hourRange: ReadonlyArray<{ index: number; disabled: boolean }>;
  minuteRange: ReadonlyArray<{ index: number; disabled: boolean }>;
  secondRange: ReadonlyArray<{ index: number; disabled: boolean }>;
  use12HoursRange: ReadonlyArray<{ index: number; value: string }>;

  @ViewChild(NzTimeValueAccessorDirective, { static: false })
  nzTimeValueAccessorDirective: NzTimeValueAccessorDirective;
  @ViewChild('hourListElement', { static: false })
  hourListElement: DebugElement;
  @ViewChild('minuteListElement', { static: false }) minuteListElement: DebugElement;
  @ViewChild('secondListElement', { static: false }) secondListElement: DebugElement;
  @ViewChild('use12HoursListElement', { static: false }) use12HoursListElement: DebugElement;

  @Input() nzInDatePicker: boolean = false; // If inside a date-picker, more diff works need to be done
  @Input() nzAddOn: TemplateRef<void>;
  @Input() nzHideDisabledOptions = false;
  @Input() nzClearText: string;
  @Input() nzPlaceHolder: string;
  @Input() @InputBoolean() nzUse12Hours = false;
  @Input() opened = false;
  @Input() nzDefaultOpenValue = new Date();

  @Input()
  set nzAllowEmpty(value: boolean) {
    if (isNotNil(value)) {
      this._allowEmpty = value;
    }
  }

  get nzAllowEmpty(): boolean {
    return this._allowEmpty;
  }

  @Input()
  set nzDisabledHours(value: () => number[]) {
    this._disabledHours = value;
    if (this._disabledHours) {
      this.buildHours();
    }
  }

  get nzDisabledHours(): () => number[] {
    return this._disabledHours;
  }

  @Input()
  set nzDisabledMinutes(value: (hour: number) => number[]) {
    if (isNotNil(value)) {
      this._disabledMinutes = value;
      this.buildMinutes();
    }
  }

  get nzDisabledMinutes(): (hour: number) => number[] {
    return this._disabledMinutes;
  }

  @Input()
  set nzDisabledSeconds(value: (hour: number, minute: number) => number[]) {
    if (isNotNil(value)) {
      this._disabledSeconds = value;
      this.buildSeconds();
    }
  }

  get nzDisabledSeconds(): (hour: number, minute: number) => number[] {
    return this._disabledSeconds;
  }

  @Input()
  set format(value: string) {
    if (isNotNil(value)) {
      this._format = value;
      this.enabledColumns = 0;
      const charSet = new Set(value);
      this.hourEnabled = charSet.has('H') || charSet.has('h');
      this.minuteEnabled = charSet.has('m');
      this.secondEnabled = charSet.has('s');
      if (this.hourEnabled) {
        this.enabledColumns++;
      }
      if (this.minuteEnabled) {
        this.enabledColumns++;
      }
      if (this.secondEnabled) {
        this.enabledColumns++;
      }
      if (this.nzUse12Hours) {
        this.build12Hours();
      }
    }
  }

  get format(): string {
    return this._format;
  }

  @Input()
  set nzHourStep(value: number) {
    if (isNotNil(value)) {
      this._nzHourStep = value;
      this.buildHours();
    }
  }

  get nzHourStep(): number {
    return this._nzHourStep;
  }

  @Input()
  set nzMinuteStep(value: number) {
    if (isNotNil(value)) {
      this._nzMinuteStep = value;
      this.buildMinutes();
    }
  }

  get nzMinuteStep(): number {
    return this._nzMinuteStep;
  }

  @Input()
  set nzSecondStep(value: number) {
    if (isNotNil(value)) {
      this._nzSecondStep = value;
      this.buildSeconds();
    }
  }

  get nzSecondStep(): number {
    return this._nzSecondStep;
  }

  selectInputRange(): void {
    setTimeout(() => {
      if (this.nzTimeValueAccessorDirective) {
        this.nzTimeValueAccessorDirective.setRange();
      }
    });
  }

  buildHours(): void {
    let hourRanges = 24;
    let disabledHours = this.nzDisabledHours && this.nzDisabledHours();
    let startIndex = 0;
    if (this.nzUse12Hours) {
      hourRanges = 12;
      if (disabledHours) {
        if (this.time.selected12Hours === 'PM') {
          /**
           * Filter and transform hours which greater or equal to 12
           * [0, 1, 2, ..., 12, 13, 14, 15, ..., 23] => [12, 1, 2, 3, ..., 11]
           */
          disabledHours = disabledHours.filter(i => i >= 12).map(i => (i > 12 ? i - 12 : i));
        } else {
          /**
           * Filter and transform hours which less than 12
           * [0, 1, 2,..., 12, 13, 14, 15, ...23] => [12, 1, 2, 3, ..., 11]
           */
          disabledHours = disabledHours.filter(i => i < 12 || i === 24).map(i => (i === 24 || i === 0 ? 12 : i));
        }
      }
      startIndex = 1;
    }
    this.hourRange = makeRange(hourRanges, this.nzHourStep, startIndex).map(r => {
      return {
        index: r,
        disabled: this.nzDisabledHours && disabledHours.indexOf(r) !== -1
      };
    });
    if (this.nzUse12Hours && this.hourRange[this.hourRange.length - 1].index === 12) {
      const temp = [...this.hourRange];
      temp.unshift(temp[temp.length - 1]);
      temp.splice(temp.length - 1, 1);
      this.hourRange = temp;
    }
  }

  buildMinutes(): void {
    this.minuteRange = makeRange(60, this.nzMinuteStep).map(r => {
      return {
        index: r,
        disabled: this.nzDisabledMinutes && this.nzDisabledMinutes(this.time.hours!).indexOf(r) !== -1
      };
    });
  }

  buildSeconds(): void {
    this.secondRange = makeRange(60, this.nzSecondStep).map(r => {
      return {
        index: r,
        disabled:
          this.nzDisabledSeconds && this.nzDisabledSeconds(this.time.hours!, this.time.minutes!).indexOf(r) !== -1
      };
    });
  }

  build12Hours(): void {
    const isUpperForamt = this._format.includes('A');
    this.use12HoursRange = [
      {
        index: 0,
        value: isUpperForamt ? 'AM' : 'am'
      },
      {
        index: 1,
        value: isUpperForamt ? 'PM' : 'pm'
      }
    ];
  }

  buildTimes(): void {
    this.buildHours();
    this.buildMinutes();
    this.buildSeconds();
    this.build12Hours();
  }

  selectHour(hour: { index: number; disabled: boolean }): void {
    this.time.setHours(hour.index, hour.disabled);
    this.scrollToSelected(this.hourListElement.nativeElement, hour.index, 120, 'hour');

    if (this._disabledMinutes) {
      this.buildMinutes();
    }
    if (this._disabledSeconds || this._disabledMinutes) {
      this.buildSeconds();
    }
  }

  selectMinute(minute: { index: number; disabled: boolean }): void {
    this.time.setMinutes(minute.index, minute.disabled);
    this.scrollToSelected(this.minuteListElement.nativeElement, minute.index, 120, 'minute');
    if (this._disabledSeconds) {
      this.buildSeconds();
    }
  }

  selectSecond(second: { index: number; disabled: boolean }): void {
    this.time.setSeconds(second.index, second.disabled);
    this.scrollToSelected(this.secondListElement.nativeElement, second.index, 120, 'second');
  }

  select12Hours(value: { index: number; value: string }): void {
    this.time.selected12Hours = value.value;
    if (this._disabledHours) {
      this.buildHours();
    }
    if (this._disabledMinutes) {
      this.buildMinutes();
    }
    if (this._disabledSeconds) {
      this.buildSeconds();
    }
    this.scrollToSelected(this.use12HoursListElement.nativeElement, value.index, 120, '12-hour');
  }

  scrollToSelected(instance: HTMLElement, index: number, duration: number = 0, unit: NzTimePickerUnit): void {
    const transIndex = this.translateIndex(index, unit);
    const currentOption = (instance.children[0].children[transIndex] ||
      instance.children[0].children[0]) as HTMLElement;
    this.scrollTo(instance, currentOption.offsetTop, duration);
  }

  translateIndex(index: number, unit: NzTimePickerUnit): number {
    if (unit === 'hour') {
      const disabledHours = this.nzDisabledHours && this.nzDisabledHours();
      return this.calcIndex(disabledHours, this.hourRange.map(item => item.index).indexOf(index));
    } else if (unit === 'minute') {
      const disabledMinutes = this.nzDisabledMinutes && this.nzDisabledMinutes(this.time.hours!);
      return this.calcIndex(disabledMinutes, this.minuteRange.map(item => item.index).indexOf(index));
    } else if (unit === 'second') {
      // second
      const disabledSeconds = this.nzDisabledSeconds && this.nzDisabledSeconds(this.time.hours!, this.time.minutes!);
      return this.calcIndex(disabledSeconds, this.secondRange.map(item => item.index).indexOf(index));
    } else {
      // 12-hour
      return this.calcIndex([], this.use12HoursRange.map(item => item.index).indexOf(index));
    }
  }

  scrollTo(element: HTMLElement, to: number, duration: number): void {
    if (duration <= 0) {
      element.scrollTop = to;
      return;
    }
    const difference = to - element.scrollTop;
    const perTick = (difference / duration) * 10;

    reqAnimFrame(() => {
      element.scrollTop = element.scrollTop + perTick;
      if (element.scrollTop === to) {
        return;
      }
      this.scrollTo(element, to, duration - 10);
    });
  }

  calcIndex(array: number[], index: number): number {
    if (array && array.length && this.nzHideDisabledOptions) {
      return (
        index -
        array.reduce((pre, value) => {
          return pre + (value < index ? 1 : 0);
        }, 0)
      );
    } else {
      return index;
    }
  }

  protected changed(): void {
    if (this.onChange) {
      this.onChange(this.time.value!);
    }
  }

  protected touched(): void {
    if (this.onTouch) {
      this.onTouch();
    }
  }

  private setClassMap(): void {
    this.updateCls.updateHostClass(this.element.nativeElement, {
      [`${this.prefixCls}`]: true,
      [`${this.prefixCls}-column-${this.enabledColumns}`]: this.nzInDatePicker ? false : true,
      [`${this.prefixCls}-narrow`]: this.enabledColumns < 3,
      [`${this.prefixCls}-placement-bottomLeft`]: this.nzInDatePicker ? false : true
    });
  }

  isSelectedHour(hour: { index: number; disabled: boolean }): boolean {
    return (
      hour.index === this.time.viewHours ||
      (!isNotNil(this.time.viewHours) && hour.index === this.time.defaultViewHours)
    );
  }

  isSelectedMinute(minute: { index: number; disabled: boolean }): boolean {
    return (
      minute.index === this.time.minutes || (!isNotNil(this.time.minutes) && minute.index === this.time.defaultMinutes)
    );
  }

  isSelectedSecond(second: { index: number; disabled: boolean }): boolean {
    return (
      second.index === this.time.seconds || (!isNotNil(this.time.seconds) && second.index === this.time.defaultSeconds)
    );
  }

  isSelected12Hours(value: { index: number; value: string }): boolean {
    return (
      value.value.toUpperCase() === this.time.selected12Hours ||
      (!isNotNil(this.time.selected12Hours) && value.value.toUpperCase() === this.time.default12Hours)
    );
  }

  initPosition(): void {
    setTimeout(() => {
      if (this.hourEnabled && this.hourListElement) {
        if (isNotNil(this.time.viewHours)) {
          this.scrollToSelected(this.hourListElement.nativeElement, this.time.viewHours!, 0, 'hour');
        } else {
          this.scrollToSelected(this.hourListElement.nativeElement, this.time.defaultViewHours, 0, 'hour');
        }
      }
      if (this.minuteEnabled && this.minuteListElement) {
        if (isNotNil(this.time.minutes)) {
          this.scrollToSelected(this.minuteListElement.nativeElement, this.time.minutes!, 0, 'minute');
        } else {
          this.scrollToSelected(this.minuteListElement.nativeElement, this.time.defaultMinutes, 0, 'minute');
        }
      }
      if (this.secondEnabled && this.secondListElement) {
        if (isNotNil(this.time.seconds)) {
          this.scrollToSelected(this.secondListElement.nativeElement, this.time.seconds!, 0, 'second');
        } else {
          this.scrollToSelected(this.secondListElement.nativeElement, this.time.defaultSeconds, 0, 'second');
        }
      }
      if (this.nzUse12Hours && this.use12HoursListElement) {
        const selectedHours = isNotNil(this.time.selected12Hours)
          ? this.time.selected12Hours
          : this.time.default12Hours;
        const index = selectedHours === 'AM' ? 0 : 1;
        this.scrollToSelected(this.use12HoursListElement.nativeElement, index, 0, '12-hour');
      }
    });
  }

  constructor(private element: ElementRef, private updateCls: UpdateCls, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.nzInDatePicker) {
      this.prefixCls = 'ant-calendar-time-picker';
    }

    this.time.changes.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.changed();
      this.touched();
    });
    this.buildTimes();
    this.setClassMap();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzUse12Hours, opened, nzDefaultOpenValue } = changes;
    if (nzUse12Hours && !nzUse12Hours.previousValue && nzUse12Hours.currentValue) {
      this.build12Hours();
      this.enabledColumns++;
    }
    if (opened && opened.currentValue) {
      this.initPosition();
      this.selectInputRange();
    }
    if (nzDefaultOpenValue) {
      const value: Date = nzDefaultOpenValue.currentValue;
      if (isNotNil(value)) {
        this.time.setDefaultOpenValue(this.nzDefaultOpenValue);
      }
    }
  }

  writeValue(value: Date): void {
    this.time.setValue(value, this.nzUse12Hours);
    this.buildTimes();

    // Mark this component to be checked manually with internal properties changing (see: https://github.com/angular/angular/issues/10816)
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: Date) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }
}
