/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

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
import startOfMonth from 'date-fns/start_of_month';
import startOfWeek from 'date-fns/start_of_week';

import { CandyDate } from 'ng-zorro-antd/date-picker/lib/candy-date/candy-date';
import { DateHelperService } from 'ng-zorro-antd/i18n';
import {
  // NzDateCellDirective as DateCell,
  NzDateCellDirective,
  NzDateFullCellDirective,
  NzMonthCellDirective,
  NzMonthFullCellDirective
} from './nz-calendar-cells';
import { InputBoolean, warnDeprecation, toBoolean } from 'ng-zorro-antd/core';

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
  daysInWeek: DayCellContext[] = [];
  monthsInYear: MonthCellContext[] = [];
  activeDate: CandyDate = new CandyDate();
  prefixCls: string = 'ant-fullcalendar';

  private onChangeFn: (date: Date) => void = () => {};
  private onTouchFn: () => void = () => {};

  @Input() nzMode: ModeType = 'month';

  @Output() readonly nzModeChange: EventEmitter<ModeType> = new EventEmitter();
  @Output() readonly nzPanelChange: EventEmitter<{ date: Date; mode: ModeType }> = new EventEmitter();
  @Output() readonly nzSelectChange: EventEmitter<Date> = new EventEmitter();

  @Input() set nzValue(value: Date) {
    this.updateDate(new CandyDate(value), false);
  }
  @Output() readonly nzValueChange: EventEmitter<Date> = new EventEmitter();

  /**
   * Cannot use @Input and @ContentChild on one variable
   * because { static: false } will make @Input property get delay
   **/
  @Input() nzDateCell: TemplateRef<{ $implicit: Date }>;
  @ContentChild(NzDateCellDirective, { static: false, read: TemplateRef })
  nzDateCellChild: TemplateRef<{ $implicit: Date }>;
  get dateCell(): TemplateRef<{ $implicit: Date }> {
    return this.nzDateCell || this.nzDateCellChild;
  }

  @Input() nzDateFullCell: TemplateRef<{ $implicit: Date }>;
  @ContentChild(NzDateFullCellDirective, { static: false, read: TemplateRef })
  nzDateFullCellChild: TemplateRef<{ $implicit: Date }>;
  get dateFullCell(): TemplateRef<{ $implicit: Date }> {
    return this.nzDateFullCell || this.nzDateFullCellChild
  }

  @Input() nzMonthCell: TemplateRef<{ $implicit: Date }>;
  @ContentChild(NzMonthCellDirective, { static: false, read: TemplateRef })
  nzMonthCellChild: TemplateRef<{ $implicit: Date }>;
  get monthCell(): TemplateRef<{ $implicit: Date }> {
    return this.nzMonthCell || this.nzMonthCellChild;
  }

  @Input() nzMonthFullCell: TemplateRef<{ $implicit: Date }>;
  @ContentChild(NzMonthFullCellDirective, { static: false, read: TemplateRef })
  nzMonthFullCellChild: TemplateRef<{ $implicit: Date }>;
  get monthFullCell(): TemplateRef<{ $implicit: Date }> {
    return this.nzMonthFullCell || this.nzMonthFullCellChild;
  }

  @Input()
  @InputBoolean()
  @HostBinding('class.ant-fullcalendar--fullscreen')
  nzFullscreen: boolean = true;

  /**
   * @deprecated use `[nzFullscreen]` instead.
   */
  @Input()
  set nzCard(value: boolean) {
    warnDeprecation(`'nzCard' is going to be removed in 9.0.0. Please use 'nzFullscreen' instead.`);
    this.nzFullscreen = !toBoolean(value);
  }
  get nzCard(): boolean {
    return !this.nzFullscreen;
  }

  constructor(private cdr: ChangeDetectorRef, private dateHelper: DateHelperService) {}

  ngOnInit(): void {
    this.setUpDaysInWeek();
    this.setUpMonthsInYear();
  }

  onModeChange(mode: ModeType): void {
    this.nzModeChange.emit(mode);
    this.nzPanelChange.emit({ date: this.activeDate.nativeDate, mode });
  }

  onYearSelect(year: number): void {
    const date = this.activeDate.setYear(year);
    this.updateDate(date);
  }

  onMonthSelect(month: number): void {
    const date = this.activeDate.setMonth(month);
    this.updateDate(date);
  }

  onDateSelect(date: CandyDate): void {
    // Only activeDate is enough in calendar
    // this.value = date;
    this.updateDate(date);
  }

  writeValue(value: Date | null): void {
    this.updateDate(new CandyDate(value as Date), false);
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
    const weekStart = startOfWeek(this.activeDate.nativeDate, { weekStartsOn: this.dateHelper.getFirstDayOfWeek() });
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
      const date = this.activeDate.setMonth(i);
      const title = this.dateHelper.format(date.nativeDate, 'MMM');
      const label = this.dateHelper.format(date.nativeDate, 'MMM');
      const start = startOfMonth(date.nativeDate);
      this.monthsInYear.push({ title, label, start });
    }
  }

  private updateDate(date: CandyDate, touched: boolean = true): void {
    this.activeDate = date;

    if (touched) {
      this.onChangeFn(date.nativeDate);
      this.onTouchFn();
      this.nzSelectChange.emit(date.nativeDate);
      this.nzValueChange.emit(date.nativeDate);
    }
  }

  // private calculateCurrentDate(): void {
  //   if (isThisMonth(this.activeDate)) {
  //     this.currentDateRow = differenceInCalendarWeeks(this.currentDate, this.calendarStart, {
  //       weekStartsOn: this.dateHelper.getFirstDayOfWeek()
  //     });
  //     this.currentDateCol = differenceInCalendarDays(
  //       this.currentDate,
  //       addDays(this.calendarStart, this.currentDateRow * 7)
  //     );
  //   } else {
  //     this.currentDateRow = -1;
  //     this.currentDateCol = -1;
  //   }
  // }
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
