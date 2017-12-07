/* tslint:disable:no-duplicate-imports max-line-length */
import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

import * as moment from 'moment';
import { Moment } from 'moment';
// import 'moment/locale/zh-cn';
import { NzLocaleService } from '../locale/index';
import { toBoolean } from '../util/convert';

export interface MonthInterface {
  index: number;
  name: string;
  year: number;
  isCurrentMonth: boolean;
  isSelectedMonth: boolean;
  disabled: boolean;
}

export type QuartersType = MonthInterface[];

export interface DayInterface {
  number: number;
  isLastMonth: boolean;
  isNextMonth: boolean;
  isCurrentDay: boolean;
  isSelectedDay: boolean;
  title: string;
  date: Moment;
  disabled: boolean;
  firstDisabled: boolean;
  lastDisabled: boolean;
}

export interface WeekInterface {
  days: DayInterface[];
}

@Component({
  selector     : 'nz-calendar',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div
      [class.ant-fullcalendar-fullscreen]="nzFullScreen"
      [class.ant-patch-full-height]="nzDatePicker">
      <div class="ant-fullcalendar-header" *ngIf="nzShowHeader">
        <nz-select
          class="ant-fullcalendar-year-select" style="width: 75px;"
          [ngModel]="_showYear"
          (ngModelChange)="_showYear = $event;_buildCalendar()">
          <nz-option
            *ngFor="let year of _listOfYearName"
            [nzLabel]="year"
            [nzValue]="year">
          </nz-option>
        </nz-select>
        <nz-select
          class="ant-fullcalendar-month-select"
          style="width: 70px;"
          *ngIf="nzMode == 'year'"
          [ngModel]="_showMonth"
          (ngModelChange)="_showMonth = $event;_buildCalendar()">
          <nz-option
            *ngFor="let _month of _listOfMonthName;let i = index;"
            [nzLabel]="_month"
            [nzValue]="i">
          </nz-option>
        </nz-select>
        <nz-radio-group [(ngModel)]="nzMode">
          <label nz-radio-button [nzValue]="'year'">
            <span>{{ _yearUnit }}</span>
          </label><label nz-radio-button [nzValue]="'month'">
          <span>{{ _monthUnit }}</span>
        </label>
        </nz-radio-group>
      </div>
      <div
        [class.ant-fullcalendar-fullscreen]="nzFullScreen"
        [class.ant-fullcalendar]="!nzDatePicker"
        [class.ant-fullcalendar-full]="!nzDatePicker"
        [class.ant-patch-full-height]="nzDatePicker">
        <div
          [class.ant-fullcalendar-calendar-body]="!nzDatePicker"
          [class.ant-calendar-body]="!nzDatePicker"
          [class.ant-patch-full-height]="nzDatePicker">
          <table
            [class.ant-fullcalendar-table]="!nzDatePicker"
            [class.ant-calendar-table]="nzDatePicker"
            [class.ant-patch-full-height]="nzDatePicker"
            *ngIf="nzMode == 'year'">
            <thead>
              <tr>
                <th
                  *ngFor="let _min of _listOfWeekName"
                  [class.ant-fullcalendar-column-header]="!nzDatePicker"
                  [class.ant-calendar-column-header]="nzDatePicker">
                  <span class="ant-fullcalendar-column-header-inner">{{ _min }}</span>
                </th>
              </tr>
            </thead>
            <tbody
              [class.ant-fullcalendartbody]="!nzDatePicker"
              [class.ant-calendartbody]="nzDatePicker">
              <tr *ngFor="let week of _weeksCalendar">
                <ng-template [ngIf]="!nzDatePicker">
                  <td
                    [attr.title]="day.title"
                    *ngFor="let day of week.days"
                    [class.ant-fullcalendar-cell]="!nzDatePicker"
                    [class.ant-calendar-cell]="nzDatePicker"
                    [class.ant-fullcalendar-last-month-cell]="day.isLastMonth"
                    [class.ant-fullcalendar-next-month-btn-day]="day.isNextMonth"
                    [class.ant-fullcalendar-selected-day]="day.isSelectedDay"
                    [class.ant-fullcalendar-today]="day.isCurrentDay">
                    <div class="ant-fullcalendar-date">
                      <div class="ant-fullcalendar-value" (click)="_clickDay($event,day)">{{ day.number }}</div>
                      <div class="ant-fullcalendar-content">
                        <ng-template
                          *ngIf="dateCell"
                          [ngTemplateOutlet]="dateCell"
                          [ngTemplateOutletContext]="{ $implicit: day}">
                        </ng-template>
                      </div>
                    </div>
                  </td>
                </ng-template>
                <ng-template [ngIf]="nzDatePicker">
                  <td
                    [attr.title]="day.title"
                    *ngFor="let day of week.days"
                    class="ant-calendar-cell"
                    [class.ant-calendar-disabled-cell-first-of-row]="day.firstDisabled"
                    [class.ant-calendar-disabled-cell-last-of-row]="day.lastDisabled"
                    [class.ant-calendar-disabled-cell]="day.disabled"
                    [class.ant-calendar-last-month-cell]="day.isLastMonth"
                    [class.ant-calendar-next-month-btn-day]="day.isNextMonth"
                    [class.ant-calendar-selected-day]="day.isSelectedDay"
                    [class.ant-calendar-today]="day.isCurrentDay">
                    <div class="ant-calendar-date" (click)="_clickDay($event,day)">{{ day.number }}</div>
                  </td>
                </ng-template>
              </tr>
            </tbody>
          </table>
          <table
            [class.ant-fullcalendar-month-panel-table]="!nzDatePicker"
            [class.ant-calendar-month-panel-table]="nzDatePicker"
            *ngIf="nzMode == 'month'">
            <tbody class="ant-fullcalendar-month-panel-tbody">
              <tr *ngFor="let quarter of _quartersCalendar">
                <ng-template [ngIf]="!nzDatePicker">
                  <td
                    *ngFor="let month of quarter"
                    [attr.title]="month.name"
                    class="ant-fullcalendar-month-panel-cell"
                    [class.ant-fullcalendar-month-panel-selected-cell]="month.isSelectedMonth"
                    [class.ant-fullcalendar-month-panel-current-cell]="month.isCurrentMonth">
                    <div class="ant-fullcalendar-month">
                      <div class="ant-fullcalendar-value" (click)="_clickMonth($event,month)">{{ month.name }}</div>
                      <div class="ant-fullcalendar-content">
                        <ng-template
                          *ngIf="monthCell"
                          [ngTemplateOutlet]="monthCell"
                          [ngTemplateOutletContext]="{ $implicit: month}">
                        </ng-template>
                      </div>
                    </div>
                  </td>
                </ng-template>
                <ng-template [ngIf]="nzDatePicker">
                  <td
                    *ngFor="let month of quarter"
                    [attr.title]="month.name"
                    class="ant-calendar-month-panel-cell"
                    [class.ant-calendar-month-panel-selected-cell]="month.isSelectedMonth"
                    [class.ant-calendar-month-panel-cell-disabled]="month.disabled"
                    [class.ant-calendar-month-panel-current-cell]="month.isCurrentMonth">
                    <div class="ant-calendar-month-panel-month" (click)="_clickMonth($event,month)">
                      {{ month.name }}
                    </div>
                  </td>
                </ng-template>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>`,
  styleUrls    : [
    './style/index.less',
    './style/patch.less'
  ]
})
export class NzCalendarComponent implements OnInit {
  private _clearTime = true;
  private _datePicker = false;
  private _fullScreen = true;
  private _showHeader = true;

  _el: HTMLElement;
  _weeksCalendar: WeekInterface[] = [];
  _quartersCalendar: QuartersType[] = [];
  _listOfWeekName: string[] = [];
  _listOfMonthName: string[] = [];
  _listOfYearName: string[] = [];
  _yearUnit = '年';
  _monthUnit = '月';
  _showMonth = moment(new Date()).month();
  _showYear = moment(new Date()).year();
  _value: Date = new Date();
  _locale = this._localeService.getLocale().locale;
  @ContentChild('dateCell') dateCell: TemplateRef<void>;
  @ContentChild('monthCell') monthCell: TemplateRef<void>;

  @Output() nzClickDay: EventEmitter<DayInterface> = new EventEmitter();
  @Output() nzClickMonth: EventEmitter<MonthInterface> = new EventEmitter();
  @Input() nzClearTime = true;
  @Input() nzMode = 'year';

  @Input()
  set nzFullScreen(value: boolean) {
    this._fullScreen = toBoolean(value);
  }

  get nzFullScreen(): boolean {
    return this._fullScreen;
  }

  @Input()
  set nzShowHeader(value: boolean) {
    this._showHeader = toBoolean(value);
  }

  get nzShowHeader(): boolean {
    return this._showHeader;
  }

  @Input() nzDisabledDate: (date: Date) => boolean = () => false;

  @Input()
  @HostBinding('class.ant-patch-full-height')
  set nzDatePicker(value: boolean) {
    this._datePicker = toBoolean(value);
  }

  get nzDatePicker(): boolean {
    return this._datePicker;
  }

  @Input()
  set nzValue(value: Date) {
    if (this._value === value) {
      return;
    }
    this._value = value || new Date();
    this._showMonth = moment(this._value).month();
    this._showYear = moment(this._value).year();
    this._buildCalendar();
  }

  get nzValue(): Date {
    return this._value || new Date();
  }

  @Input()
  set nzShowYear(value: number) {
    this._showYear = value;
    this._buildCalendar();
  }

  get nzShowYear(): number {
    return this._showYear;
  }

  @Input()
  set nzShowMonth(value: number) {
    this._showMonth = value;
    this._buildCalendar();
  }

  get nzShowMonth(): number {
    return this._showMonth;
  }

  @Input()
  set nzLocale(value: string) {
    this._locale = value;
    moment.locale(this._locale);
  }

  get nzLocale(): string {
    return this._locale;
  }

  _removeTime(date: Moment): Moment {
    if (this.nzClearTime) {
      return date.hour(0).minute(0).second(0).millisecond(0);
    } else {
      return date;
    }
  }

  _clickDay($event: MouseEvent, day: DayInterface): void {
    $event.preventDefault();
    $event.stopPropagation();
    if (day.disabled) {
      return;
    }
    this.nzClickDay.emit(day);
  }

  _clickMonth($event: MouseEvent, month: MonthInterface): void {
    $event.preventDefault();
    $event.stopPropagation();
    if (month.disabled) {
      return;
    }
    this.nzClickMonth.emit(month);
  }

  _buildMonth(d: Moment): WeekInterface[] {
    const weeks: WeekInterface[] = [];
    const _rawDate = this._removeTime(d);
    const start = _rawDate.clone().date(1).day(0);
    const month = _rawDate.clone();
    let done = false;
    const date = start.clone();
    let monthIndex = date.month();
    let count = 0;
    while (!done) {
      weeks.push({ days: this._buildWeek(date.clone(), month) });
      date.add(1, 'w');
      done = count++ > 4;
      monthIndex = date.month();
    }
    return weeks;
  }

  _buildWeek(firstDate: Moment, month: Moment): DayInterface[] {
    let date = firstDate;
    const days: DayInterface[] = [];
    for (let i = 0; i < 7; i++) {
      days.push({
        number       : date.date(),
        isLastMonth  : date.month() < month.month(),
        isNextMonth  : date.month() > month.month(),
        isCurrentDay : date.isSame(new Date(), 'day'),
        isSelectedDay: date.isSame(this.nzValue, 'day'),
        title        : date.format('YYYY-MM-DD'),
        date,
        disabled     : this.nzDisabledDate && this.nzDisabledDate(date.toDate()),
        firstDisabled: this.nzDisabledDate && this.nzDisabledDate(date.toDate()) && (date.day() === 0 || (date.day() !== 0 && this.nzDisabledDate && !this.nzDisabledDate(date.clone().subtract(1, 'day').toDate()))),
        lastDisabled : this.nzDisabledDate && this.nzDisabledDate(date.toDate()) && (date.day() === 6 || (date.day() !== 6 && this.nzDisabledDate && !this.nzDisabledDate(date.clone().add(1, 'day').toDate())))
      });
      date = date.clone();
      date.add(1, 'd');
    }
    return days;
  }

  _buildYears(date: Moment): MonthInterface[][] {
    const quarters: MonthInterface[][] = [];
    let months: MonthInterface[] = [];
    for (let i = 0; i < 12; i++) {
      months.push({
        index          : i,
        name           : this._listOfMonthName[ i ],
        year           : date.year(),
        isCurrentMonth : moment(new Date()).month() === i && date.isSame(new Date(), 'year'),
        isSelectedMonth: this._showMonth === i,
        disabled       : this.nzDisabledDate && this.nzDisabledDate(date.month(i).toDate())
      });
      if ((i + 1) % 3 === 0) {
        quarters.push(months);
        months = [];
      }
    }
    return quarters;
  }

  _buildCalendar(): void {
    moment.locale(this._locale);
    /** TODO replace with real i18n*/
    if (this._locale !== 'zh-cn') {
      try {
        this._yearUnit = moment.duration(12, 'month').humanize().split(' ')[ 1 ][ 0 ].toUpperCase() + moment.duration(12, 'month').humanize().split(' ')[ 1 ].slice(1, moment.duration(12, 'month').humanize().split(' ')[ 1 ].length);
        this._monthUnit = moment.duration(4, 'week').humanize().split(' ')[ 1 ][ 0 ].toUpperCase() + moment.duration(4, 'week').humanize().split(' ')[ 1 ].slice(1, moment.duration(4, 'week').humanize().split(' ')[ 1 ].length);
      } catch (e) { }
    }
    this._listOfYearName = this._generateYears(this._showYear).map(x => `${x}`);
    this._listOfWeekName = moment.weekdaysMin();
    this._listOfMonthName = moment.months();
    const date = moment(this.nzValue).year(this._showYear).month(this._showMonth);
    this._weeksCalendar = this._buildMonth(date);
    this._quartersCalendar = this._buildYears(date);
  }

  _generateYears(year: number): number[] {
    const listOfYears: number[] = [];
    for (const i of Array.from(Array(20).keys())) {
      listOfYears.push(i - 10 + year);
    }
    return listOfYears;
  }

  constructor(private _elementRef: ElementRef, private _localeService: NzLocaleService) {
    this._el = this._elementRef.nativeElement;
  }

  ngOnInit(): void {
    this._buildCalendar();
  }
}
