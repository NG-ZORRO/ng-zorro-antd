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
import endOfMonth from 'date-fns/end_of_month';
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
import { DateHelperService } from '../i18n/date-helper.service';
import { NzI18nService } from '../i18n/nz-i18n.service';
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
  templateUrl: './nz-calendar.component.html',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NzCalendarComponent), multi: true }]
})
export class NzCalendarComponent implements ControlValueAccessor, OnInit {
  @Input() nzMode: ModeType = 'month';
  @Output() readonly nzModeChange: EventEmitter<ModeType> = new EventEmitter();
  @Output() readonly nzPanelChange: EventEmitter<{ date: Date; mode: ModeType }> = new EventEmitter();

  @Output() readonly nzSelectChange: EventEmitter<Date> = new EventEmitter();

  @Input() set nzValue(value: Date) {
    this.updateDate(value, false);
  }
  @Output() readonly nzValueChange: EventEmitter<Date> = new EventEmitter();

  @Input()
  set nzDateCell(value: TemplateRef<{ $implicit: Date }>) {
    this.dateCell = value;
  }

  @Input()
  set nzDateFullCell(value: TemplateRef<{ $implicit: Date }>) {
    this.dateFullCell = value;
  }

  @Input()
  set nzMonthCell(value: TemplateRef<{ $implicit: Date }>) {
    this.monthCell = value;
  }

  @Input()
  set nzMonthFullCell(value: TemplateRef<{ $implicit: Date }>) {
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

  @ContentChild(DateCell, { read: TemplateRef })
  set dateCellChild(value: TemplateRef<{ $implicit: Date }>) {
    if (value) {
      this.dateCell = value;
    }
  }

  @ContentChild(DateFullCell, { read: TemplateRef })
  set dateFullCellChild(value: TemplateRef<{ $implicit: Date }>) {
    if (value) {
      this.dateFullCell = value;
    }
  }

  @ContentChild(MonthCell, { read: TemplateRef })
  set monthCellChild(value: TemplateRef<{ $implicit: Date }>) {
    if (value) {
      this.monthCell = value;
    }
  }

  @ContentChild(MonthFullCell, { read: TemplateRef })
  set monthFullCellChild(value: TemplateRef<{ $implicit: Date }>) {
    if (value) {
      this.monthFullCell = value;
    }
  }

  @HostBinding('class.ant-fullcalendar--fullscreen')
  fullscreen = true;

  daysInWeek: DayCellContext[] = [];
  monthsInYear: MonthCellContext[] = [];
  dateMatrix: DateCellContext[][] = [];
  activeDate: Date = new Date();
  currentDateRow: number = -1;
  currentDateCol: number = -1;
  activeDateRow: number = -1;
  activeDateCol: number = -1;
  currentMonthRow: number = -1;
  currentMonthCol: number = -1;
  activeMonthRow: number = -1;
  activeMonthCol: number = -1;
  dateCell: TemplateRef<{ $implicit: Date }> | null = null;
  dateFullCell: TemplateRef<{ $implicit: Date }> | null = null;
  monthCell: TemplateRef<{ $implicit: Date }> | null = null;
  monthFullCell: TemplateRef<{ $implicit: Date }> | null = null;

  private currentDate = new Date();
  private onChangeFn: (date: Date) => void = () => {};
  private onTouchFn: () => void = () => {};

  private get calendarStart(): Date {
    return startOfWeek(startOfMonth(this.activeDate), { weekStartsOn: this.dateHelper.getFirstDayOfWeek() });
  }

  constructor(private i18n: NzI18nService, private cdr: ChangeDetectorRef, private dateHelper: DateHelperService) {}

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

  onDateSelect(date: Date): void {
    this.updateDate(date);
    this.nzSelectChange.emit(date);
  }

  onYearSelect(year: number): void {
    const date = setYear(this.activeDate, year);
    this.updateDate(date);
    this.nzSelectChange.emit(date);
  }

  onMonthSelect(month: number): void {
    const date = setMonth(this.activeDate, month);
    this.updateDate(date);
    this.nzSelectChange.emit(date);
  }

  writeValue(value: Date | null): void {
    this.updateDate(value || new Date(), false);
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (date: Date) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchFn = fn;
  }

  private updateDate(date: Date, touched: boolean = true): void {
    const dayChanged = !isSameDay(date, this.activeDate);
    const monthChanged = !isSameMonth(date, this.activeDate);
    const yearChanged = !isSameYear(date, this.activeDate);

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

  private setUpDateMatrix(): void {
    this.dateMatrix = [];
    const monthStart = startOfMonth(this.activeDate);
    const monthEnd = endOfMonth(this.activeDate);
    const weekDiff =
      differenceInCalendarWeeks(monthEnd, monthStart, { weekStartsOn: this.dateHelper.getFirstDayOfWeek() }) + 2;

    for (let week = 0; week < weekDiff; week++) {
      const row: DateCellContext[] = [];
      const weekStart = addDays(this.calendarStart, week * 7);

      for (let day = 0; day < 7; day++) {
        const date = addDays(weekStart, day);
        const monthDiff = differenceInCalendarMonths(date, this.activeDate);
        const dateFormat = this.dateHelper.relyOnDatePipe
          ? 'longDate'
          : this.i18n.getLocaleData('DatePicker.lang.dateFormat', 'YYYY-MM-DD');
        const title = this.dateHelper.format(date, dateFormat);
        const label = this.dateHelper.format(date, this.dateHelper.relyOnDatePipe ? 'dd' : 'DD');
        const rel = monthDiff === 0 ? 'current' : monthDiff < 0 ? 'last' : 'next';
        row.push({ title, label, rel, value: date });
      }
      this.dateMatrix.push(row);
    }
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
