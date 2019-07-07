/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import addDays from 'date-fns/add_days';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import differenceInCalendarMonths from 'date-fns/difference_in_calendar_months';
import differenceInCalendarWeeks from 'date-fns/difference_in_calendar_weeks';
import isSameDay from 'date-fns/is_same_day';
import isSameMonth from 'date-fns/is_same_month';
import isSameYear from 'date-fns/is_same_year';
import isThisMonth from 'date-fns/is_this_month';
import isThisYear from 'date-fns/is_this_year';
import setMonth from 'date-fns/set_month';
import setYear from 'date-fns/set_year';
import startOfMonth from 'date-fns/start_of_month';
import startOfWeek from 'date-fns/start_of_week';
import startOfYear from 'date-fns/start_of_year';

import { DateHelperService, NzI18nService } from 'ng-zorro-antd/i18n';

import { isAfter, isBefore, isToday } from 'date-fns';
import { warnDeprecation, InputBoolean } from 'ng-zorro-antd/core';
import {
  // NzDateCellDirective as DateCell,
  NzDateCellDirective,
  NzDateFullCellDirective,
  NzMonthCellDirective,
  NzMonthFullCellDirective
} from './nz-calendar-cells';

export type ModeType = 'month' | 'year';

export interface DateCell {
  value: Date; // CandyDate before
  label: string; // day
  title: string;
  customContent: TemplateRef<{ $implicit: Date }> | string;
  content: string;
  isSelected?: boolean;
  isToday?: boolean;
  isDisabled?: boolean;
  isSelectedStartDate?: boolean;
  isSelectedEndDate?: boolean;
  isInRange?: boolean;
  classMap?: object;
  onClick(date: any): void;
  onMouseEnter(): void;
}

export interface WeekRow {
  isCurrent?: boolean; // Is the week that today stays in
  isActive?: boolean; // Is the week that current setting date stays in
  weekNum?: number;
  classMap?: object;
  dateCells: DateCell[];
}

export type Date1 = string | Date;

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nz-calendar',
  exportAs: 'nzCalendar',
  templateUrl: './nz-calendar.component.html',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NzCalendarComponent), multi: true }]
})
export class NzCalendarComponent implements ControlValueAccessor, OnInit {
  value: Date | null = new Date();
  daysInWeek: DayCellContext[] = [];
  monthsInYear: MonthCellContext[] = [];
  dateMatrix: any[] = [];
  activeDate: Date = new Date();
  currentDateRow: number = -1;
  currentDateCol: number = -1;
  activeDateRow: number = -1;
  activeDateCol: number = -1;
  currentMonthRow: number = -1;
  currentMonthCol: number = -1;
  activeMonthRow: number = -1;
  activeMonthCol: number = -1;
  prefixCls: string = 'ant-fullcalendar';

  private currentDate = new Date();
  private onChangeFn: (date: Date) => void = () => {};
  private onTouchFn: () => void = () => {};

  @Input() nzMode: ModeType = 'month';
  @Input() showWeek: boolean = false;
  @Input() selectedValue: Date1[]; // Range ONLY
  @Input() hoverValue: Date1[]; // Range ONLY

  @Output() readonly nzModeChange: EventEmitter<ModeType> = new EventEmitter();
  @Output() readonly nzPanelChange: EventEmitter<{ date: Date; mode: ModeType }> = new EventEmitter();
  @Output() readonly nzSelectChange: EventEmitter<Date> = new EventEmitter();
  @Output() readonly dayHover = new EventEmitter<Date>();

  // compatible for date-table
  // TODO:
  @Input()
  @ContentChild(NzDateCellDirective, { static: false, read: TemplateRef })
  nzDateCell: TemplateRef<{ $implicit: Date }>;

  @Input()
  @ContentChild(NzDateFullCellDirective, { static: false, read: TemplateRef })
  nzDateFullCell: TemplateRef<{ $implicit: Date }>;

  @Input()
  @ContentChild(NzMonthCellDirective, { static: false, read: TemplateRef })
  nzMonthCell: TemplateRef<{ $implicit: Date }>;

  @Input()
  @ContentChild(NzMonthFullCellDirective, { static: false, read: TemplateRef })
  nzMonthFullCell: TemplateRef<{ $implicit: Date }>;

  @Input() @InputBoolean() nzFullscreen: boolean;

  /**
   * @deprecated use `[nzFullscreen]` instead.
   */
  @Input()
  set nzCard(value: boolean) {
    warnDeprecation(`'nzCard' is going to be removed in 9.0.0. Please use 'nzFullscreen' instead.`);
    this.fullscreen = !coerceBooleanProperty(value);
  }
  get nzCard(): boolean {
    return !this.fullscreen;
  }

  @HostBinding('class.ant-fullcalendar--fullscreen')
  fullscreen = true;

  private get calendarStart(): Date {
    return startOfWeek(startOfMonth(this.activeDate), { weekStartsOn: this.dateHelper.getFirstDayOfWeek() });
  }

  constructor(private i18n: NzI18nService, private cdr: ChangeDetectorRef, private dateHelper: DateHelperService) {}

  ngOnInit(): void {
    this.setUpDaysInWeek();
    this.setUpMonthsInYear();
    this.calculateCurrentDate();
    this.calculateActiveDate();
    this.calculateCurrentMonth();
    this.calculateActiveMonth();
  }

  onModeChange(mode: ModeType): void {
    this.nzModeChange.emit(mode);
    this.nzPanelChange.emit({ date: this.activeDate, mode });
  }

  onYearSelect(year: number): void {
    const date = setYear(this.activeDate, year);
    this.updateDate(date);
  }

  onMonthSelect(month: number): void {
    const date = setMonth(this.activeDate, month);
    this.updateDate(date);
  }

  onDateSelect(date: Date): void {
    this.value = date;
    this.updateDate(date);
  }

  writeValue(value: Date | null): void {
    this.value = value;
    this.updateDate(value || new Date(), false);
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (date: Date) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchFn = fn;
  }

  private setUpDaysInWeek(): void {
    this.daysInWeek = [];
    const weekStart = startOfWeek(this.activeDate, { weekStartsOn: this.dateHelper.getFirstDayOfWeek() });
    for (let i = 0; i < 7; i++) {
      const date = addDays(weekStart, i);
      const title = this.dateHelper.format(date, this.dateHelper.relyOnDatePipe ? 'E' : 'ddd');
      const label = this.dateHelper.format(date, this.dateHelper.relyOnDatePipe ? 'EEEEEE' : 'dd');
      this.daysInWeek.push({ title, label });
    }
  }

  private setUpMonthsInYear(): void {
    this.monthsInYear = [];
    for (let i = 0; i < 12; i++) {
      const date = setMonth(this.activeDate, i);
      const title = this.dateHelper.format(date, 'MMM');
      const label = this.dateHelper.format(date, 'MMM');
      const start = startOfMonth(date);
      this.monthsInYear.push({ title, label, start });
    }
  }

  private updateDate(date: Date, touched: boolean = true): void {
    this.activeDate = date;

    if (touched) {
      this.onChangeFn(date);
      this.onTouchFn();
      this.nzSelectChange.emit(date);
    }
  }

  isSameDay(pre: Date, next: Date): boolean {
    return isSameDay(pre, next);
  }

  private calculateCurrentDate(): void {
    if (isThisMonth(this.activeDate)) {
      this.currentDateRow = differenceInCalendarWeeks(this.currentDate, this.calendarStart, {
        weekStartsOn: this.dateHelper.getFirstDayOfWeek()
      });
      this.currentDateCol = differenceInCalendarDays(
        this.currentDate,
        addDays(this.calendarStart, this.currentDateRow * 7)
      );
    } else {
      this.currentDateRow = -1;
      this.currentDateCol = -1;
    }
  }

  private calculateActiveDate(): void {
    this.activeDateRow = differenceInCalendarWeeks(this.activeDate, this.calendarStart, {
      weekStartsOn: this.dateHelper.getFirstDayOfWeek()
    });
    this.activeDateCol = differenceInCalendarDays(this.activeDate, addDays(this.calendarStart, this.activeDateRow * 7));
  }

  private calculateCurrentMonth(): void {
    if (isThisYear(this.activeDate)) {
      const yearStart = startOfYear(this.currentDate);
      const monthDiff = differenceInCalendarMonths(this.currentDate, yearStart);
      this.currentMonthRow = Math.floor(monthDiff / 3);
      this.currentMonthCol = monthDiff % 3;
    } else {
      this.currentMonthRow = -1;
      this.currentMonthCol = -1;
    }
  }

  private calculateActiveMonth(): void {
    this.activeMonthRow = Math.floor(this.activeDate.getMonth() / 3);
    this.activeMonthCol = this.activeDate.getMonth() % 3;
  }
}

export interface DayCellContext {
  title: string;
  label: string;
}

export interface MonthCellContext {
  title: string;
  label: string;
  start: Date;
}

export interface DateCellContext {
  title: string;
  label: string;
  rel: 'last' | 'current' | 'next';
  value: Date;
}
