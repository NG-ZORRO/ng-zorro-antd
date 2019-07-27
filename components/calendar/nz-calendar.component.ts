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
import * as momentNs from 'jalali-moment';
// tslint:disable-next-line:no-duplicate-imports
import { Moment } from 'jalali-moment';
const moment = momentNs;
import { NzI18nService } from 'ng-zorro-antd/i18n';

import {
  NzDateCellDirective as DateCell,
  NzDateFullCellDirective as DateFullCell,
  NzMonthCellDirective as MonthCell,
  NzMonthFullCellDirective as MonthFullCell
} from './nz-calendar-cells';

export type ModeType = 'month' | 'year';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nz-calendar',
  exportAs: 'nzCalendar',
  templateUrl: './nz-calendar.component.html',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NzCalendarComponent), multi: true }]
})
export class NzCalendarComponent implements ControlValueAccessor, OnInit {
  @Input() nzMode: ModeType = 'month';
  @Output() readonly nzModeChange: EventEmitter<ModeType> = new EventEmitter();
  @Output() readonly nzPanelChange: EventEmitter<{ date: Moment; mode: ModeType }> = new EventEmitter();

  @Output() readonly nzSelectChange: EventEmitter<Moment> = new EventEmitter();

  @Input() set nzValue(value: Moment) {
    this.updateDate(value, false);
  }
  @Output() readonly nzValueChange: EventEmitter<Moment> = new EventEmitter();

  @Input()
  set nzDateCell(value: TemplateRef<{ $implicit: Moment }>) {
    this.dateCell = value;
  }

  @Input()
  set nzDateFullCell(value: TemplateRef<{ $implicit: Moment }>) {
    this.dateFullCell = value;
  }

  @Input()
  set nzMonthCell(value: TemplateRef<{ $implicit: Moment }>) {
    this.monthCell = value;
  }

  @Input()
  set nzMonthFullCell(value: TemplateRef<{ $implicit: Moment }>) {
    this.monthFullCell = value;
  }

  @Input()
  set nzFullscreen(value: boolean) {
    this.fullscreen = coerceBooleanProperty(value);
  }
  get nzFullscreen(): boolean {
    return this.fullscreen;
  }

  @Input()
  set nzCard(value: boolean) {
    this.fullscreen = !coerceBooleanProperty(value);
  }
  get nzCard(): boolean {
    return !this.fullscreen;
  }

  @ContentChild(DateCell, { static: false, read: TemplateRef })
  set dateCellChild(value: TemplateRef<{ $implicit: Moment }>) {
    if (value) {
      this.dateCell = value;
    }
  }

  @ContentChild(DateFullCell, { static: false, read: TemplateRef })
  set dateFullCellChild(value: TemplateRef<{ $implicit: Moment }>) {
    if (value) {
      this.dateFullCell = value;
    }
  }

  @ContentChild(MonthCell, { static: false, read: TemplateRef })
  set monthCellChild(value: TemplateRef<{ $implicit: Moment }>) {
    if (value) {
      this.monthCell = value;
    }
  }

  @ContentChild(MonthFullCell, { static: false, read: TemplateRef })
  set monthFullCellChild(value: TemplateRef<{ $implicit: Moment }>) {
    if (value) {
      this.monthFullCell = value;
    }
  }

  @HostBinding('class.ant-fullcalendar--fullscreen')
  fullscreen = true;

  daysInWeek: DayCellContext[] = [];
  monthsInYear: MonthCellContext[] = [];
  dateMatrix: DateCellContext[][] = [];
  activeDate: Moment = moment();
  currentDateRow: number = -1;
  currentDateCol: number = -1;
  activeDateRow: number = -1;
  activeDateCol: number = -1;
  currentMonthRow: number = -1;
  currentMonthCol: number = -1;
  activeMonthRow: number = -1;
  activeMonthCol: number = -1;
  dateCell: TemplateRef<{ $implicit: Moment }> | null = null;
  dateFullCell: TemplateRef<{ $implicit: Moment }> | null = null;
  monthCell: TemplateRef<{ $implicit: Moment }> | null = null;
  monthFullCell: TemplateRef<{ $implicit: Moment }> | null = null;

  private currentDate = moment();
  private onChangeFn: (date: Moment) => void = () => {};
  private onTouchFn: () => void = () => {};

  private get calendarStart(): Moment {
    return this.activeDate
      .clone()
      .startOf('month')
      .startOf('week');
  }

  constructor(private i18n: NzI18nService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.setUpDaysInWeek();
    this.setUpMonthsInYear();
    this.setUpDateMatrix();
    this.calculateCurrentDate();
    this.calculateActiveDate();
    this.calculateCurrentMonth();
    this.calculateActiveMonth();
  }

  onModeChange(mode: ModeType): void {
    this.nzModeChange.emit(mode);
    this.nzPanelChange.emit({ date: this.activeDate, mode });
  }

  onDateSelect(date: Moment): void {
    this.updateDate(date);
    this.nzSelectChange.emit(date);
  }

  onYearSelect(year: number): void {
    const date = this.activeDate.clone().year(year);
    this.updateDate(date);
    this.nzSelectChange.emit(date);
  }

  onMonthSelect(month: number): void {
    const date = this.activeDate.clone().month(month);
    this.updateDate(date);
    this.nzSelectChange.emit(date);
  }

  writeValue(value: Moment | null): void {
    this.updateDate(value || moment(), false);
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (date: Moment) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchFn = fn;
  }

  private updateDate(date: Moment, touched: boolean = true): void {
    const dayChanged = !date.isSame(this.activeDate, 'day');
    const monthChanged = !date.isSame(this.activeDate, 'month');
    const yearChanged = !date.isSame(this.activeDate, 'year');

    this.activeDate = date;

    if (dayChanged) {
      this.calculateActiveDate();
    }
    if (monthChanged) {
      this.setUpDateMatrix();
      this.calculateCurrentDate();
      this.calculateActiveMonth();
    }
    if (yearChanged) {
      this.calculateCurrentMonth();
    }

    if (touched) {
      this.onChangeFn(date);
      this.onTouchFn();
      this.nzValueChange.emit(date);
    }
  }

  private setUpDaysInWeek(): void {
    this.daysInWeek = [];
    const weekStart = this.activeDate.clone().startOf('isoWeek');
    for (let i = 0; i < 7; i++) {
      const date = weekStart.clone().date(i);
      const title = date.format('DD');
      const label = date.format('DD');
      this.daysInWeek.push({ title, label });
    }
  }

  private setUpMonthsInYear(): void {
    this.monthsInYear = [];
    for (let i = 0; i < 12; i++) {
      const date = this.activeDate.clone().month(i);
      const title = date.format('MMM');
      const label = date.format('MMM');
      const start = date.clone().startOf('month');
      this.monthsInYear.push({ title, label, start });
    }
  }

  private setUpDateMatrix(): void {
    this.dateMatrix = [];
    const monthStart = this.activeDate.clone().startOf('month');
    const monthEnd = this.activeDate.clone().endOf('month');
    const weekDiff = monthEnd.diff(monthStart, 'weeks', true) + 2;

    for (let week = 0; week < weekDiff; week++) {
      const row: DateCellContext[] = [];
      const weekStart = this.calendarStart.clone().add(week * 7, 'days');

      for (let day = 0; day < 7; day++) {
        const date = weekStart.clone().add(day, 'days');
        const monthDiff = date.diff(this.activeDate, 'months');
        const dateFormat = this.i18n.getLocaleData('DatePicker.lang.dateFormat', 'YYYY/MM/DD');
        const title = date.format(dateFormat);
        const label = date.format('DD');
        const rel = monthDiff === 0 ? 'current' : monthDiff < 0 ? 'last' : 'next';
        row.push({ title, label, rel, value: date });
      }
      this.dateMatrix.push(row);
    }
  }

  private calculateCurrentDate(): void {
    if (this.activeDate.isSame(moment(), 'month')) {
      this.currentDateRow = this.currentDate.diff(this.calendarStart, 'weeks');
      this.currentDateCol = this.currentDate.diff(this.calendarStart.clone().add(this.currentDateRow * 7, 'days'));
    } else {
      this.currentDateRow = -1;
      this.currentDateCol = -1;
    }
  }

  private calculateActiveDate(): void {
    this.activeDateRow = this.activeDate.diff(this.calendarStart, 'weeks');
    this.activeDateCol = this.activeDate.diff(this.calendarStart.clone().add(this.activeDateRow * 7, 'days'));
  }

  private calculateCurrentMonth(): void {
    if (this.activeDate.isSame(moment(), 'year')) {
      const yearStart = this.currentDate.clone().startOf('year');
      const monthDiff = this.currentDate.diff(yearStart, 'months');
      this.currentMonthRow = Math.floor(monthDiff / 3);
      this.currentMonthCol = monthDiff % 3;
    } else {
      this.currentMonthRow = -1;
      this.currentMonthCol = -1;
    }
  }

  private calculateActiveMonth(): void {
    this.activeMonthRow = Math.floor(this.activeDate.month() / 3);
    this.activeMonthCol = this.activeDate.month() % 3;
  }
}

export interface DayCellContext {
  title: string;
  label: string;
}

export interface MonthCellContext {
  title: string;
  label: string;
  start: Moment;
}

export interface DateCellContext {
  title: string;
  label: string;
  rel: 'last' | 'current' | 'next';
  value: Moment;
}
