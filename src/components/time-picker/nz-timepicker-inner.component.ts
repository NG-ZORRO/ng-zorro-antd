import {
  forwardRef,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';
import { dropDownAnimation } from '../core/animation/dropdown-animations';
import { reqAnimFrame } from '../core/polyfill/request-animation';
import { NzLocaleService } from '../locale/index';
import { toBoolean } from '../util/convert';

export interface TimeUnitInterface {
  index: number;
  name: string;
  disabled: boolean;
}

@Component({
  selector     : 'nz-timepicker-inner',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <span
      class="ant-calendar-time-picker"
      [ngClass]="{'ant-time-picker-large':nzSize=='large','ant-time-picker-small':nzSize=='small'}">
      <div
        class="ant-calendar-time-picker-panel"
        [@dropDownAnimation]="'bottom'">
        <div class="ant-calendar-time-picker-inner"
          [class.ant-calendar-time-picker-column-3]="_showHour&&_showMinute&&_showSecond"
          [class.ant-calendar-time-picker-column-2]="_showHour&&_showMinute&&!_showSecond"
          [class.ant-calendar-time-picker-column-1]="_showHour&&(!_showMinute)&&(!_showSecond)">
        <div class="ant-calendar-time-picker-combobox">
          <div
            class="ant-calendar-time-picker-select"
            #hourListInstance
            *ngIf="_showHour">
            <ul>
              <ng-template
                ngFor
                let-_hour
                [ngForOf]="_hourList"
                let-i="index">
                 <li
                   [ngClass]="_hour.name"
                   *ngIf="!(nzHideDisabledOptions&&_hour.disabled)"
                   [class.ant-time-picker-panel-select-option-selected]="_hour.index===_selectedHour"
                   [class.ant-time-picker-panel-select-option-disabled]="_hour.disabled"
                   (click)="_selectHour(hourListInstance,_hour.index,_hour.disabled)">
                   {{ _hour.name }}
                 </li>
              </ng-template>
            </ul>
          </div>
          <div
            class="ant-calendar-time-picker-select"
            #minuteListInstance
            *ngIf="_showMinute">
            <ul>
              <ng-template
                ngFor
                let-_minute
                [ngForOf]="_minuteList"
                let-i="index">
                 <li
                   [ngClass]="_minute.name"
                   *ngIf="!(nzHideDisabledOptions&&_minute.disabled)"
                   [class.ant-time-picker-panel-select-option-selected]="_minute.index===_selectedMinute"
                   [class.ant-time-picker-panel-select-option-disabled]="_minute.disabled"
                   (click)="_selectMinute(minuteListInstance,_minute.index,_minute.disabled)">
                   {{ _minute.name }}
                 </li>
              </ng-template>
            </ul>
          </div>
          <div
            class="ant-calendar-time-picker-select"
            #secondListInstance
            *ngIf="_showSecond">
            <ul>
              <ng-template
                ngFor
                let-_second
                [ngForOf]="_secondList"
                let-i="index">
                 <li
                   [ngClass]="_second.name"
                   *ngIf="!(nzHideDisabledOptions&&_second.disabled)"
                   [class.ant-time-picker-panel-select-option-selected]="_second.index===_selectedSecond"
                   [class.ant-time-picker-panel-select-option-disabled]="_second.disabled"
                   (click)="_selectSecond(secondListInstance,_second.index,_second.disabled)">
                   {{ _second.name }}
                 </li>
              </ng-template>
            </ul>
          </div>
        </div>
      </div>
      </div>
    </span>`,
  animations   : [
    dropDownAnimation
  ],
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzTimePickerInnerComponent),
      multi      : true
    }
  ],
  styleUrls    : [
    './style/index.less',
    './style/patch.less'
  ]
})
export class NzTimePickerInnerComponent implements OnInit, ControlValueAccessor {
  private _disabled = false;
  private _hideDisabledOptions = false;
  _now = new Date();
  _el: HTMLElement;
  _open = false;
  _hourList: TimeUnitInterface[] = [];
  _minuteList: TimeUnitInterface[] = [];
  _secondList: TimeUnitInterface[] = [];
  _value = null;
  _selectedHour = moment(this._now).hours();
  _selectedMinute = moment(this._now).minutes();
  _selectedSecond = moment(this._now).seconds();
  _format = 'HH:mm:ss';
  _showHour = this._format.indexOf('HH') > -1;
  _showMinute = this._format.indexOf('mm') > -1;
  _showSecond = this._format.indexOf('ss') > -1;
  _width = `${( +this._showHour + +this._showMinute + +this._showSecond) * 56 + 1 }px`;
  _nzDisabledHours: () => number[];
  // ngModel Access
  onChange: (value: Date) => void = () => null;
  onTouched: () => void = () => null;

  @ViewChild('hourListInstance') _hourListInstance;
  @ViewChild('minuteListInstance') _minuteListInstance;
  @ViewChild('inputTimeInstance') _inputTimeInstance;
  @ViewChild('secondListInstance') _secondListInstance;

  @Input()
  set nzHideDisabledOptions(value: boolean) {
    this._hideDisabledOptions = toBoolean(value);
  }

  get nzHideDisabledOptions(): boolean {
    return this._hideDisabledOptions;
  }

  @Input() nzPlaceHolder = this._locale.translate('DateTime.chooseTimePlease');
  @Input() nzSize: 'small' | 'large' | 'default' = 'default';

  @Input()
  set nzDisabledHours(fun: () => number[]) {
    this._nzDisabledHours = fun;
    this._buildHours();
  }

  get nzDisabledHours(): () => number[] {
    return this._nzDisabledHours;
  }

  @Input() nzDisabledMinutes: (hour: number) => number[];
  @Input() nzDisabledSeconds: (hour: number, minute: number) => number[];

  @Input()
  set nzDisabled(value: boolean) {
    this._disabled = toBoolean(value);
  }

  get nzDisabled(): boolean {
    return this._disabled;
  }

  @Input()
  set nzFormat(value: string) {
    this._format = value;
    this._showHour = this._format.indexOf('HH') > -1;
    this._showMinute = this._format.indexOf('mm') > -1;
    this._showSecond = this._format.indexOf('ss') > -1;
    this._width = `${( +this._showHour + +this._showMinute + +this._showSecond) * 56 + 1 }px`;
  }

  get nzFormat(): string {
    return this._format;
  }

  get nzValue(): Date {
    return this._value || this._now;
  }

  set nzValue(value: Date) {
    if (this._value === value) {
      return;
    }
    this._value = value;
    this._selectedHour = moment(this.nzValue).hours();
    this._selectedMinute = moment(this.nzValue).minutes();
    this._selectedSecond = moment(this.nzValue).seconds();
  }

  _scrollToSelected(instance: HTMLElement, index: number, duration: number = 0, unit: string): void {
    const _transIndex = this._translateIndex(index, unit);
    const currentOption = (instance.children[ 0 ].children[ _transIndex ] || instance.children[ 0 ].children[ 0 ]) as HTMLElement;
    this.scrollTo(instance, currentOption.offsetTop, duration);
  }

  // got from rc-timepicker
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

  _selectHour(instance: HTMLElement, index: number, disabled: boolean): void {
    if (disabled) {
      return;
    }
    this._scrollToSelected(instance, index, 120, 'hour');
    this._selectedHour = index;
    this.nzValue = moment(this.nzValue).hour(index).toDate();
    this.onChange(this._value);
    this._buildMinutes();
    this._buildSeconds();
  }

  _selectMinute(instance: HTMLElement, index: number, disabled: boolean): void {
    if (disabled) {
      return;
    }
    this._scrollToSelected(instance, index, 120, 'minute');
    this._selectedMinute = index;
    this.nzValue = moment(this.nzValue).minute(index).toDate();
    this.onChange(this._value);
    this._buildSeconds();
  }

  _selectSecond(instance: HTMLElement, index: number, disabled: boolean): void {
    if (disabled) {
      return;
    }
    this._scrollToSelected(instance, index, 120, 'second');
    this._selectedSecond = index;
    this.nzValue = moment(this.nzValue).second(index).toDate();
    this.onChange(this._value);
  }

  _translateIndex(index: number, unit: string): number {
    if (!this.nzHideDisabledOptions) {
      return index;
    }
    if (unit === 'hour') {
      const disabledHours = this.nzDisabledHours && this.nzDisabledHours();
      return this._calcIndex(disabledHours, index);
    } else if (unit === 'minute') {
      const disabledMinutes = this.nzDisabledMinutes && this.nzDisabledMinutes(this._selectedHour);
      return this._calcIndex(disabledMinutes, index);
    } else if (unit === 'second') {
      const disabledSeconds = this.nzDisabledSeconds && this.nzDisabledSeconds(this._selectedHour, this._selectedMinute);
      return this._calcIndex(disabledSeconds, index);
    }
  }

  _calcIndex(array: number[], index: number): number {
    if (array && array.length) {
      return index - array.reduce((pre, value) => {
        return pre + (value < index ? 1 : 0);
      }, 0);
    } else {
      return index;
    }
  }

  _initPosition(): void {
    this._selectedHour = moment(this.nzValue).hours();
    this._selectedMinute = moment(this.nzValue).minutes();
    this._selectedSecond = moment(this.nzValue).seconds();
    if (this._showHour) {
      this._scrollToSelected(this._hourListInstance.nativeElement, this._selectedHour, 0, 'hour');
    }
    if (this._showMinute) {
      this._scrollToSelected(this._minuteListInstance.nativeElement, this._selectedMinute, 0, 'minute');
    }
    if (this._showSecond) {
      this._scrollToSelected(this._secondListInstance.nativeElement, this._selectedSecond, 0, 'second');
    }
  }

  _buildTime(): void {
    this._buildHours();
    this._buildMinutes();
    this._buildSeconds();
  }

  _buildHours(): void {
    this._hourList = [];
    for (let i = 0; i <= 23; i++) {
      this._hourList.push({
        disabled: this.nzDisabledHours && (this.nzDisabledHours().indexOf(i) !== -1),
        name    : i.toString().length === 1 ? ('0' + i) : ('' + i),
        index   : i
      });
    }
  }

  _buildMinutes(): void {
    this._minuteList = [];
    for (let i = 0; i <= 59; i++) {
      this._minuteList.push({
        disabled: this.nzDisabledMinutes && (this.nzDisabledMinutes(this._selectedHour).indexOf(i) !== -1),
        name    : i.toString().length === 1 ? ('0' + i) : ('' + i),
        index   : i
      });
    }
  }

  _buildSeconds(): void {
    this._secondList = [];
    for (let i = 0; i <= 59; i++) {
      this._secondList.push({
        disabled: this.nzDisabledSeconds && (this.nzDisabledSeconds(this._selectedHour, this._selectedMinute).indexOf(i) !== -1),
        name    : i.toString().length === 1 ? ('0' + i) : ('' + i),
        index   : i
      });
    }
  }

  writeValue(value: Date): void {
    this.nzValue = value;
  }

  registerOnChange(fn: (_: Date) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
  }

  constructor(public _cdr: ChangeDetectorRef, private _locale: NzLocaleService) {
  }

  ngOnInit(): void {
    this._buildTime();
  }
}
