/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { addDays, differenceInCalendarMonths, isAfter, isBefore, isSameDay, isToday, setDay, startOfMonth, startOfWeek } from 'date-fns';
import { isNonEmptyString, isTemplateRef, valueFunctionProp, FunctionProp } from 'ng-zorro-antd/core';
import { DateHelperByDatePipe, DateHelperService, NzCalendarI18nInterface, NzI18nService } from 'ng-zorro-antd/i18n';

const DATE_ROW_NUM = 6;
const DATE_COL_NUM = 7;

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:component-selector
  selector: 'date-table',
  exportAs: 'dateTable',
  templateUrl: 'date-table.component.html'
})
export class DateTableComponent implements OnInit, OnChanges {
  _value: Date;
  headWeekDays: WeekDayLabel[];
  weekRows: WeekRow[];

  isTemplateRef = isTemplateRef;
  isNonEmptyString = isNonEmptyString;
  @Input() prefixCls: string = 'ant-calendar';
  @Input() locale: NzCalendarI18nInterface;
  @Input() selectedValue: Date[]; // Range ONLY
  @Input() hoverValue: Date[]; // Range ONLY

  @Input()
  set value(date: Date) {
    this._value = this.activeDate = date;
  }

  get value(): Date {
    return this._value;
  }

  @Input() activeDate: Date;
  @Output() readonly valueChange = new EventEmitter<Date>();

  @Input() showWeek: boolean = false;
  @Input() disabledDate: (d: Date) => boolean;
  // @Input() dateRender: FunctionProp<TemplateRef<Date> | string>; // Customize date content while rendering
  // TODO:
  @Input() dateRender: TemplateRef<Date> | string;

  @Output() readonly dayHover = new EventEmitter<Date>(); // Emitted when hover on a day by mouse enter

  constructor(private i18n: NzI18nService, private dateHelper: DateHelperService) {}

  private get calendarStart(): Date {
    return startOfWeek(startOfMonth(this.activeDate), { weekStartsOn: this.dateHelper.getFirstDayOfWeek() });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.isDateRealChange(changes.activeDate) ||
      this.isDateRealChange(changes.value) ||
      this.isDateRealChange(changes.selectedValue) ||
      this.isDateRealChange(changes.hoverValue)
    ) {
      this.render();
    }
  }

  private isDateRealChange(change: SimpleChange): boolean {
    if (change) {
      const previousValue: Date | Date[] = change.previousValue;
      const currentValue: Date | Date[] = change.currentValue;
      if (Array.isArray(currentValue)) {
        return (
          !Array.isArray(previousValue) ||
          currentValue.length !== previousValue.length ||
          currentValue.some((value, index) => !isSameDay(previousValue[index], value))
        );
      } else {
        return !isSameDay(previousValue as Date, currentValue);
      }
    }
    return false;
  }

  private render(): void {
    if (this.value) {
      this.headWeekDays = this.makeHeadWeekDays();
      this.weekRows = this.makeWeekRows();
    }
  }

  private changeValueFromInside(value: Date): void {
    if (this.value !== value) {
      this.activeDate = value;
      this.valueChange.emit(value);
    }
  }

  private makeHeadWeekDays(): WeekDayLabel[] {
    const weekDays: WeekDayLabel[] = [];
    const firstDayOfWeek = this.dateHelper.getFirstDayOfWeek();
    for (let colIndex = 0; colIndex < DATE_COL_NUM; colIndex++) {
      const day = (firstDayOfWeek + colIndex) % DATE_COL_NUM;
      // TODO:
      const tempDate = setDay(this.value, day, { weekStartsOn: 1 });
      weekDays[colIndex] = {
        short: this.dateHelper.format(tempDate, this.dateHelper.relyOnDatePipe ? 'E' : 'ddd'), // eg. Tue
        veryShort: this.dateHelper.format(tempDate, this.getVeryShortWeekFormat()) // eg. Tu
      };
    }
    return weekDays;
  }

  private getVeryShortWeekFormat(): string {
    if (this.dateHelper.relyOnDatePipe) {
      return this.i18n
        .getLocaleId()
        .toLowerCase()
        .indexOf('zh') === 0
        ? 'EEEEE'
        : 'EEEEEE'; // Use extreme short for chinese
    }
    return 'dd';
  }

  private makeWeekRows(): WeekRow[] {
    const weekRows: WeekRow[] = [];
    // const monthStart = startOfMonth(this.activeDate);
    // const monthEnd = endOfMonth(this.activeDate);
    // const weekDiff =
    //   differenceInCalendarWeeks(monthEnd, monthStart, { weekStartsOn: this.dateHelper.getFirstDayOfWeek() }) + 2;
    for (let week = 0; week < DATE_ROW_NUM; week++) {
      const row: WeekRow = {
        isActive: false,
        isCurrent: false,
        dateCells: []
      };
      const weekStart = addDays(this.calendarStart, week * 7);

      for (let day = 0; day < 7; day++) {
        const date = addDays(weekStart, day);
        // const monthDiff = differenceInCalendarMonths(date, this.activeDate);
        const dateFormat = this.dateHelper.relyOnDatePipe
          ? 'longDate'
          : this.i18n.getLocaleData('DatePicker.lang.dateFormat', 'YYYY-MM-DD');
        const title = this.dateHelper.format(date, dateFormat);
        const label = this.dateHelper.format(date, this.dateHelper.relyOnDatePipe ? 'dd' : 'DD');
        // const rel = monthDiff === 0 ? 'current' : monthDiff < 0 ? 'last' : 'next';

        const cell: DateCell = {
          value: date,
          label: label,
          isSelected: false,
          isDisabled: false,
          isToday: false,
          title: title,
          customContent: this.dateRender, // Customized content
          content: `${date.getDate()}`,
          onClick: () => this.changeValueFromInside(date),
          onMouseEnter: () => this.dayHover.emit(cell.value)
        };

        if (this.showWeek && !row.weekNum) {
          row.weekNum = this.dateHelper.getISOWeek(date);
        }

        if (isToday(date)) {
          cell.isToday = true;
          row.isCurrent = true;
        }

        if (Array.isArray(this.selectedValue) && differenceInCalendarMonths(date, this.activeDate) === 0) {
          // Range selections
          const rangeValue = this.hoverValue && this.hoverValue.length ? this.hoverValue : this.selectedValue;
          const start = rangeValue[0];
          const end = rangeValue[1];
          if (start) {
            if (isSameDay(start, date)) {
              cell.isSelectedStartDate = true;
              cell.isSelected = true;
              row.isActive = true;
            }
            if (end) {
              if (isSameDay(end, date)) {
                cell.isSelectedEndDate = true;
                cell.isSelected = true;
                row.isActive = true;
              } else if (isAfter(start, date) && isBefore(end, date)) {
                cell.isInRange = true;
              }
            }
          }
        } else if (isSameDay(date, this.activeDate)) {
          cell.isSelected = true;
          row.isActive = true;
        }

        // if (this.disabledDate && this.disabledDate(current.nativeDate)) {
        //   cell.isDisabled = true;
        // }

        cell.classMap = {
          [`${this.prefixCls}-cell`]: true,
          // [`${this.prefixCls}-selected-date`]: false,
          [`${this.prefixCls}-today`]: cell.isToday,
          [`${this.prefixCls}-last-month-cell`]: differenceInCalendarMonths(date, this.activeDate) < 0,
          [`${this.prefixCls}-next-month-btn-day`]: differenceInCalendarMonths(date, this.activeDate) > 0,
          [`${this.prefixCls}-selected-day`]: isSameDay(date, this.activeDate),
          [`${this.prefixCls}-disabled-cell`]: cell.isDisabled,
          [`${this.prefixCls}-selected-start-date`]: !!cell.isSelectedStartDate,
          [`${this.prefixCls}-selected-end-date`]: !!cell.isSelectedEndDate,
          [`${this.prefixCls}-in-range-cell`]: !!cell.isInRange
        };

        row.dateCells.push(cell);
      }

      row.classMap = {
        [`${this.prefixCls}-current-week`]: row.isCurrent,
        [`${this.prefixCls}-active-week`]: row.isActive
      };

      weekRows.push(row);
    }

    return weekRows;
  }

  // private getDateTitle(date: Date): string {
  //   // NOTE: Compat for DatePipe formatting rules
  //   let dateFormat: string = (this.locale && this.locale.dateFormat) || 'YYYY-MM-DD';
  //   if (this.dateHelper.relyOnDatePipe) {
  //     dateFormat = (this.dateHelper as DateHelperByDatePipe).transCompatFormat(dateFormat);
  //   }
  //   return this.dateHelper.format(date.nativeDate, dateFormat);
  // }
}

export interface WeekDayLabel {
  short: string;
  veryShort: string;
}

export interface DateCell {
  value: Date;
  label: string;
  title: string;
  customContent: TemplateRef<Date> | string;
  content: string;
  isSelected?: boolean;
  isToday?: boolean;
  isDisabled?: boolean;
  isSelectedStartDate?: boolean;
  isSelectedEndDate?: boolean;
  isInRange?: boolean;
  classMap?: object;
  onClick(date: Date): void;
  onMouseEnter(): void;
}

export interface WeekRow {
  isCurrent?: boolean; // Is the week that today stays in
  isActive?: boolean; // Is the week that current setting date stays in
  weekNum?: number;
  classMap?: object;
  dateCells: DateCell[];
}
