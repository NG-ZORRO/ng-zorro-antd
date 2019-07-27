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
  Inject,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  SimpleChange,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import * as momentNs from 'jalali-moment';
// tslint:disable-next-line:no-duplicate-imports
import { Moment } from 'jalali-moment';
import { isNonEmptyString, isTemplateRef, valueFunctionProp, FunctionProp } from 'ng-zorro-antd/core';
import { NzCalendarI18nInterface, WeekDayIndex } from 'ng-zorro-antd/i18n';
import { mergeDateConfig, NzDateConfig, NZ_DATE_CONFIG } from '../../../i18n/date-config';
import { CandyDate } from '../candy-date/candy-date';
import { WeekDayLabel } from '../date/date-table.component';
const moment = momentNs;
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
  @Input() locale: NzCalendarI18nInterface;
  @Input() dateLocale: string;
  @Input() selectedValue: CandyDate[]; // Range ONLY
  @Input() hoverValue: CandyDate[]; // Range ONLY

  @Input() value: CandyDate;
  @Output() readonly valueChange = new EventEmitter<CandyDate>();

  @Input() showWeek: boolean;
  @Input() disabledDate: (d: CandyDate) => boolean;
  @Input() dateRender: FunctionProp<TemplateRef<CandyDate> | string>; // Customize date content while rendering

  @Output() readonly dayHover = new EventEmitter<CandyDate>(); // Emitted when hover on a day by mouse enter

  objectKeys = Object.keys;
  prefixCls: string = 'ant-calendar';
  headWeekDays: { [key: string]: WeekDayLabel };
  weekRows: WeekRow[];

  isTemplateRef = isTemplateRef;
  isNonEmptyString = isNonEmptyString;
  private readonly DAYS = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];

  constructor(@Optional() @Inject(NZ_DATE_CONFIG) protected dateConfig: NzDateConfig) {
    this.dateConfig = mergeDateConfig(this.dateConfig);
  }
  ngOnInit(): void {
    this.value._moment.locale(this.dateLocale);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.render();
    if (
      this.isDateRealChange(changes.value) ||
      this.isDateRealChange(changes.selectedValue) ||
      this.isDateRealChange(changes.hoverValue)
    ) {
      // this.value._moment.locale(this.dateLocale);
      this.render();
    }
  }

  private isDateRealChange(change: SimpleChange): boolean {
    if (change) {
      const previousValue: CandyDate | CandyDate[] = change.previousValue;
      const currentValue: CandyDate | CandyDate[] = change.currentValue;
      if (Array.isArray(currentValue)) {
        return (
          !Array.isArray(previousValue) ||
          currentValue.length !== previousValue.length ||
          currentValue.some((value, index) => !this.isSameDate(previousValue[index], value))
        );
      } else {
        return !this.isSameDate(previousValue as CandyDate, currentValue);
      }
    }
    return false;
  }

  private isSameDate(left: CandyDate, right: CandyDate): boolean {
    return (!left && !right) || (left && right && right.isSame(left, 'day'));
  }

  private render(): void {
    if (this.value) {
      this.headWeekDays = this.makeHeadWeekDays();
      this.weekRows = this.makeWeekRows();
    }
  }

  private changeValueFromInside(value: CandyDate): void {
    if (this.value !== value) {
      this.valueChange.emit(value);
    }
  }

  generateDaysMap(firstDayOfWeek: WeekDayIndex): { [key: number]: string } {
    const daysArr = this.DAYS.slice(firstDayOfWeek, 7).concat(this.DAYS.slice(0, firstDayOfWeek));
    return daysArr.reduce(
      (map, day, index) => {
        map[index] = day;
        return map;
      },
      {} as { [key: number]: string }
    );
  }
  generateWeekdays(firstDayOfWeek: WeekDayIndex, locale?: string): { [key: string]: Moment } {
    const weekdayNames: { [key: string]: Moment } = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'].reduce(
      (acc, d, i) => {
        const m = moment();
        if (locale) {
          m.locale(locale);
        }
        m.day(i);
        acc[d] = m;
        return acc;
      },
      {} as { [key: string]: Moment }
    );

    const weekdays: { [key: string]: Moment } = {};
    const daysMap = this.generateDaysMap(firstDayOfWeek);

    for (const dayKey in daysMap) {
      if (daysMap.hasOwnProperty(dayKey)) {
        const day = daysMap[dayKey];
        weekdays[day] = weekdayNames[daysMap[Number(dayKey)]];
      }
    }
    return weekdays;
  }

  getWeekdayName(weekday: Moment, format: string = 'dd'): string {
    return weekday.format(format);
  }
  getfirstDayOfWeek(): WeekDayIndex {
    return this.dateConfig.firstDayOfWeek == null ? 1 : this.dateConfig.firstDayOfWeek;
  }
  private makeHeadWeekDays(): { [key: string]: WeekDayLabel } {
    const weekDays: { [key: string]: WeekDayLabel } = {};
    const firstDayOfWeek = this.getfirstDayOfWeek();
    const weekdaysMoment = this.generateWeekdays(firstDayOfWeek, this.dateLocale);
    for (const i in weekdaysMoment) {
      weekDays[i] = {
        short: this.getWeekdayName(weekdaysMoment[i]),
        veryShort: this.getWeekdayName(weekdaysMoment[i])
      };
    }
    return weekDays;
  }

  private makeWeekRows(): WeekRow[] {
    const weekRows: WeekRow[] = [];
    const firstDayOfWeek = this.getfirstDayOfWeek();
    const firstDateOfMonth = this.value.clone().setDate(1);
    const firstDateOffset = (firstDateOfMonth.getDay() + 7 - firstDayOfWeek) % 7;
    const firstDateToShow = firstDateOfMonth.clone().addDays(0 - firstDateOffset);

    let increased = 0;
    for (let rowIndex = 0; rowIndex < DATE_ROW_NUM; rowIndex++) {
      const week: WeekRow = (weekRows[rowIndex] = {
        isActive: false,
        isCurrent: false,
        dateCells: []
      });

      for (let colIndex = 0; colIndex < DATE_COL_NUM; colIndex++) {
        const current = firstDateToShow.clone().addDays(increased++);
        const isBeforeMonthYear = this.isBeforeMonthYear(current, this.value);
        const isAfterMonthYear = this.isAfterMonthYear(current, this.value);
        const cell: DateCell = {
          value: current,
          isSelected: false,
          isDisabled: false,
          isToday: false,
          title: this.getDateTitle(current),
          customContent: valueFunctionProp(this.dateRender, current), // Customized content
          content: `${current.getDate()}`,
          onClick: () => this.changeValueFromInside(current),
          onMouseEnter: () => this.dayHover.emit(cell.value)
        };

        if (this.showWeek && !week.weekNum) {
          week.weekNum = this.getWeekNum(current);
        }

        if (current.isToday()) {
          cell.isToday = true;
          week.isCurrent = true;
        }

        if (Array.isArray(this.selectedValue) && !isBeforeMonthYear && !isAfterMonthYear) {
          // Range selections
          const rangeValue = this.hoverValue && this.hoverValue.length ? this.hoverValue : this.selectedValue;
          const start = rangeValue[0];
          const end = rangeValue[1];
          if (start) {
            if (current.isSame(start, 'day')) {
              cell.isSelectedStartDate = true;
              cell.isSelected = true;
              week.isActive = true;
            }
            if (end) {
              if (current.isSame(end, 'day')) {
                cell.isSelectedEndDate = true;
                cell.isSelected = true;
                week.isActive = true;
              } else if (current.isAfter(start, 'day') && current.isBefore(end, 'day')) {
                cell.isInRange = true;
              }
            }
          }
        } else if (current.isSame(this.value, 'day')) {
          cell.isSelected = true;
          week.isActive = true;
        }

        if (this.disabledDate && this.disabledDate(current)) {
          cell.isDisabled = true;
        }

        cell.classMap = {
          [`${this.prefixCls}-cell`]: true,
          // [`${this.prefixCls}-selected-date`]: false,
          [`${this.prefixCls}-today`]: cell.isToday,
          [`${this.prefixCls}-last-month-cell`]: isBeforeMonthYear,
          [`${this.prefixCls}-next-month-btn-day`]: isAfterMonthYear,
          [`${this.prefixCls}-selected-day`]: cell.isSelected,
          [`${this.prefixCls}-disabled-cell`]: cell.isDisabled,
          [`${this.prefixCls}-selected-start-date`]: !!cell.isSelectedStartDate,
          [`${this.prefixCls}-selected-end-date`]: !!cell.isSelectedEndDate,
          [`${this.prefixCls}-in-range-cell`]: !!cell.isInRange
        };

        week.dateCells.push(cell);
      }

      week.classMap = {
        [`${this.prefixCls}-current-week`]: week.isCurrent,
        [`${this.prefixCls}-active-week`]: week.isActive
      };
    }
    return weekRows;
  }

  private getDateTitle(date: CandyDate): string {
    // NOTE: Compat for DatePipe formatting rules
    const dateFormat: string = (this.locale && this.locale.dateFormat) || 'YYYY/MM/DD';
    return date._moment.format(dateFormat);
  }

  private getWeekNum(date: CandyDate): number {
    return date._moment.isoWeek();
  }

  private isBeforeMonthYear(current: CandyDate, target: CandyDate): boolean {
    if (current.getYear() < target.getYear()) {
      return true;
    }
    return current.getYear() === target.getYear() && current.getMonth() < target.getMonth();
  }

  private isAfterMonthYear(current: CandyDate, target: CandyDate): boolean {
    if (current.getYear() > target.getYear()) {
      return true;
    }
    return current.getYear() === target.getYear() && current.getMonth() > target.getMonth();
  }
}

export interface WeekDayLabel {
  short: string;
  veryShort: string;
}

export interface DateCell {
  value: CandyDate;
  title: string;
  customContent: TemplateRef<CandyDate> | string;
  content: string;
  isSelected?: boolean;
  isToday?: boolean;
  isDisabled?: boolean;
  isSelectedStartDate?: boolean;
  isSelectedEndDate?: boolean;
  isInRange?: boolean;
  classMap?: object;
  onClick(date: CandyDate): void;
  onMouseEnter(): void;
}

export interface WeekRow {
  isCurrent?: boolean; // Is the week that today stays in
  isActive?: boolean; // Is the week that current setting date stays in
  weekNum?: number;
  classMap?: object;
  dateCells: DateCell[];
}
