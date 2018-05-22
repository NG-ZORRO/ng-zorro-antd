import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { reqAnimFrame } from '../core/polyfill/request-animation';
import { NzUpdateHostClassService as UpdateCls } from '../core/services/update-host-class.service';
import { isNotNil } from '../core/util/check';
import { NzTimeValueAccessorDirective } from './nz-time-value-accessor.directive';
import { TimeHolder } from './time-holder';

function makeRange(length: number, step: number = 1): number[] {
  return new Array(Math.ceil(length / step)).fill(0).map((_, i) => i * step);
}

@Component({
  selector   : 'nz-time-picker-panel',
  templateUrl: './nz-time-picker-panel.component.html',
  providers  : [
    UpdateCls,
    { provide: NG_VALUE_ACCESSOR, useExisting: NzTimePickerPanelComponent, multi: true }
  ]
})
export class NzTimePickerPanelComponent implements ControlValueAccessor, OnInit, OnDestroy {
  private _nzHourStep = 1;
  private _nzMinuteStep = 1;
  private _nzSecondStep = 1;
  private sub: Subscription;
  private onChange: (value: Date) => void;
  private onTouch: () => void;
  private _format = 'HH:mm:ss';
  private _disabledHours: () => number[];
  private _disabledMinutes: (hour: number) => number[];
  private _disabledSeconds: (hour: number, minute: number) => number[];
  private _defaultOpenValue = new Date();
  private _opened = false;
  private _allowEmpty = true;
  prefixCls: string = 'ant-time-picker-panel';
  time = new TimeHolder();
  hourEnabled = true;
  minuteEnabled = true;
  secondEnabled = true;
  enabledColumns = 3;
  hourRange: ReadonlyArray<{ index: number, disabled: boolean }>;
  minuteRange: ReadonlyArray<{ index: number, disabled: boolean }>;
  secondRange: ReadonlyArray<{ index: number, disabled: boolean }>;
  @ViewChild(NzTimeValueAccessorDirective) nzTimeValueAccessorDirective: NzTimeValueAccessorDirective;
  @ViewChild('hourListElement') hourListElement;
  @ViewChild('minuteListElement') minuteListElement;
  @ViewChild('secondListElement') secondListElement;
  @Input() nzInDatePicker: boolean = false; // If inside a date-picker, more diff works need to be done
  @Input() nzAddOn: TemplateRef<void>;
  @Input() nzHideDisabledOptions = false;
  @Input() nzClearText: string;
  @Input() nzPlaceHolder: string;
  @Output() timeClear = new EventEmitter<void>();

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
  set opened(value: boolean) {
    this._opened = value;
    if (this.opened) {
      this.initPosition();
      this.selectInputRange();
    }
  }

  get opened(): boolean {
    return this._opened;
  }

  @Input()
  set nzDefaultOpenValue(value: Date) {
    if (isNotNil(value)) {
      this._defaultOpenValue = value;
      this.time.setDefaultOpenValue(this.nzDefaultOpenValue);
    }
  }

  get nzDefaultOpenValue(): Date {
    return this._defaultOpenValue;
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
    this.hourRange = makeRange(24, this.nzHourStep).map(r => {
        return {
          index   : r,
          disabled: this.nzDisabledHours && (this.nzDisabledHours().indexOf(r) !== -1)
        };
      }
    );
  }

  buildMinutes(): void {
    this.minuteRange = makeRange(60, this.nzMinuteStep).map(r => {
        return {
          index   : r,
          disabled: this.nzDisabledMinutes && (this.nzDisabledMinutes(this.time.hours).indexOf(r) !== -1)
        };
      }
    );
  }

  buildSeconds(): void {
    this.secondRange = makeRange(60, this.nzSecondStep).map(r => {
        return {
          index   : r,
          disabled: this.nzDisabledSeconds && (this.nzDisabledSeconds(this.time.hours, this.time.minutes).indexOf(r) !== -1)
        };
      }
    );
  }

  buildTimes(): void {
    this.buildHours();
    this.buildMinutes();
    this.buildSeconds();
  }

  selectHour(hour: { index: number, disabled: boolean }): void {
    this.time.setHours(hour.index, hour.disabled);
    this.scrollToSelected(this.hourListElement.nativeElement, hour.index, 120, 'hour');

    if (this._disabledMinutes) {
      this.buildMinutes();
    }
    if (this._disabledSeconds || this._disabledMinutes) {
      this.buildSeconds();
    }
  }

  selectMinute(minute: { index: number, disabled: boolean }): void {
    this.time.setMinutes(minute.index, minute.disabled);
    this.scrollToSelected(this.minuteListElement.nativeElement, minute.index, 120, 'minute');
    if (this._disabledSeconds) {
      this.buildSeconds();
    }
  }

  selectSecond(second: { index: number, disabled: boolean }): void {
    this.time.setSeconds(second.index, second.disabled);
    this.scrollToSelected(this.secondListElement.nativeElement, second.index, 120, 'second');
  }

  scrollToSelected(instance: HTMLElement, index: number, duration: number = 0, unit: string): void {
    const transIndex = this.translateIndex(index, unit);
    const currentOption = (instance.children[ 0 ].children[ transIndex ] || instance.children[ 0 ].children[ 0 ]) as HTMLElement;
    this.scrollTo(instance, currentOption.offsetTop, duration);
  }

  translateIndex(index: number, unit: string): number {
    if (unit === 'hour') {
      const disabledHours = this.nzDisabledHours && this.nzDisabledHours();
      return this.calcIndex(disabledHours, this.hourRange.map(item => item.index).indexOf(index));
    } else if (unit === 'minute') {
      const disabledMinutes = this.nzDisabledMinutes && this.nzDisabledMinutes(this.time.hours);
      return this.calcIndex(disabledMinutes, this.minuteRange.map(item => item.index).indexOf(index));
    } else if (unit === 'second') {
      const disabledSeconds = this.nzDisabledSeconds && this.nzDisabledSeconds(this.time.hours, this.time.minutes);
      return this.calcIndex(disabledSeconds, this.secondRange.map(item => item.index).indexOf(index));
    }
  }

  scrollTo(element: HTMLElement, to: number, duration: number): void {
    if (duration <= 0) {
      element.scrollTop = to;
      return;
    }
    const difference = to - element.scrollTop;
    const perTick = difference / duration * 10;

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
      return index - array.reduce((pre, value) => {
        return pre + (value < index ? 1 : 0);
      }, 0);
    } else {
      return index;
    }
  }

  clear(): void {
    this.time.clear();
    this.timeClear.emit();
  }

  protected changed(): void {
    if (this.onChange) {
      this.onChange(this.time.value);
    }
  }

  protected touched(): void {
    if (this.onTouch) {
      this.onTouch();
    }
  }

  private setClassMap(): void {
    this.updateCls.updateHostClass(this.element.nativeElement, {
      [`${this.prefixCls}`]                                   : true,
      [`${this.prefixCls}-column-${this.enabledColumns}`]     : this.nzInDatePicker ? false : true,
      [`${this.prefixCls}-narrow`]                            : this.enabledColumns < 3,
      [`${this.prefixCls}-placement-bottomLeft`]              : this.nzInDatePicker ? false : true
    });
  }

  isSelectedHour(hour: { index: number, disabled: boolean }): boolean {
    return (hour.index === this.time.hours) || (!isNotNil(this.time.hours) && (hour.index === this.time.defaultHours));
  }

  isSelectedMinute(minute: { index: number, disabled: boolean }): boolean {
    return (minute.index === this.time.minutes) || (!isNotNil(this.time.minutes) && (minute.index === this.time.defaultMinutes));
  }

  isSelectedSecond(second: { index: number, disabled: boolean }): boolean {
    return (second.index === this.time.seconds) || (!isNotNil(this.time.seconds) && (second.index === this.time.defaultSeconds));
  }

  initPosition(): void {
    setTimeout(() => {
      if (this.hourEnabled && this.hourListElement) {
        if (isNotNil(this.time.hours)) {
          this.scrollToSelected(this.hourListElement.nativeElement, this.time.hours, 0, 'hour');
        } else {
          this.scrollToSelected(this.hourListElement.nativeElement, this.time.defaultHours, 0, 'hour');
        }
      }
      if (this.minuteEnabled && this.minuteListElement) {
        if (isNotNil(this.time.minutes)) {
          this.scrollToSelected(this.minuteListElement.nativeElement, this.time.minutes, 0, 'minute');
        } else {
          this.scrollToSelected(this.minuteListElement.nativeElement, this.time.defaultMinutes, 0, 'minute');
        }
      }
      if (this.secondEnabled && this.secondListElement) {
        if (isNotNil(this.time.seconds)) {
          this.scrollToSelected(this.secondListElement.nativeElement, this.time.seconds, 0, 'second');
        } else {
          this.scrollToSelected(this.secondListElement.nativeElement, this.time.defaultSeconds, 0, 'second');
        }
      }
    });
  }

  constructor(private element: ElementRef, private updateCls: UpdateCls) {
  }

  ngOnInit(): void {
    if (this.nzInDatePicker) {
      this.prefixCls = 'ant-calendar-time-picker';
    }

    this.sub = this.time.changes.subscribe(() => {
      this.changed();
      this.touched();
    });
    this.buildTimes();
    this.setClassMap();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }
  }

  writeValue(value: Date): void {
    this.time.value = value;
    this.buildTimes();
  }

  registerOnChange(fn: (value: Date) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

}
