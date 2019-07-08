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

import { DateHelperService, NzCalendarI18nInterface, NzI18nService } from 'ng-zorro-antd/i18n';
import { CandyDate } from 'ng-zorro-antd/date-picker/lib/candy-date/candy-date';
import { valueFunctionProp, FunctionProp } from 'ng-zorro-antd/core';

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
  _value: CandyDate;
  headWeekDays: WeekDayLabel[];
  weekRows: WeekRow[];

  @Input() prefixCls: string = 'ant-calendar';
  @Input() locale: NzCalendarI18nInterface;
  @Input() selectedValue: CandyDate[]; // Range ONLY
  @Input() hoverValue: CandyDate[]; // Range ONLY

  @Input()
  set value(date: CandyDate) {
    this._value = this.activeDate = date;
  }

  get value(): CandyDate {
    return this._value;
  }

  @Input() activeDate: CandyDate;
  @Input() showWeek: boolean = false;
  @Input() disabledDate: (d: Date) => boolean;
  // @Input() dateRender: FunctionProp<TemplateRef<CandyDate> | string>; // Customize date content while rendering
  // TODO:
  @Input() dateCellRender: FunctionProp<TemplateRef<Date> | string>;
  @Input() dateFullCellRender: FunctionProp<TemplateRef<Date> | string>;

  @Output() readonly dayHover = new EventEmitter<CandyDate>(); // Emitted when hover on a day by mouse enter
  @Output() readonly valueChange = new EventEmitter<CandyDate>();

  constructor(private i18n: NzI18nService, private dateHelper: DateHelperService) {}

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
      const previousValue: CandyDate | CandyDate[] = change.previousValue;
      const currentValue: CandyDate | CandyDate[] = change.currentValue;
      if (Array.isArray(currentValue)) {
        return (
          !Array.isArray(previousValue) ||
          currentValue.length !== previousValue.length ||
          currentValue.some((value, index) => !previousValue[index].isSameDay(value))
        );
      } else {
        return !this.isSameDate(previousValue as CandyDate, currentValue);
      }
    }
    return false;
  }

  private isSameDate(left: CandyDate, right: CandyDate): boolean {
    return (!left && !right) || (left && right && right.isSameDay(left));
  }

  private render(): void {
    if (this.value) {
      this.headWeekDays = this.makeHeadWeekDays();
      this.weekRows = this.makeWeekRows();
    }
  }

  private changeValueFromInside(value: CandyDate): void {
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
      const tempDate = this.value.setDay(day, { weekStartsOn: 1 });
      weekDays[colIndex] = {
        short: this.dateHelper.format(tempDate.nativeDate, this.dateHelper.relyOnDatePipe ? 'E' : 'ddd'), // eg. Tue
        veryShort: this.dateHelper.format(tempDate.nativeDate, this.getVeryShortWeekFormat()) // eg. Tu
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
      const weekStart = this.activeDate.calendarStart().addDays(week * 7);

      for (let day = 0; day < 7; day++) {
        const date = weekStart.addDays(day);
        // const monthDiff = differenceInCalendarMonths(date, this.activeDate);
        const dateFormat = this.dateHelper.relyOnDatePipe
          ? 'longDate'
          : this.i18n.getLocaleData('DatePicker.lang.dateFormat', 'YYYY-MM-DD');
        const title = this.dateHelper.format(date.nativeDate, dateFormat);
        const label = this.dateHelper.format(date.nativeDate, this.dateHelper.relyOnDatePipe ? 'dd' : 'DD');
        // const rel = monthDiff === 0 ? 'current' : monthDiff < 0 ? 'last' : 'next';

        const cell: DateCell = {
          value: date.nativeDate,
          label: label,
          isSelected: false,
          isDisabled: false,
          isToday: false,
          title: title,
          dateCellRender: valueFunctionProp(this.dateCellRender, date), // Customized content
          dateFullCellRender: valueFunctionProp(this.dateFullCellRender, date),
          content: `${date.getDate()}`,
          onClick: () => this.changeValueFromInside(date),
          onMouseEnter: () => this.dayHover.emit(date)
        };

        if (this.showWeek && !row.weekNum) {
          row.weekNum = this.dateHelper.getISOWeek(date.nativeDate);
        }

        if (date.isToday()) {
          cell.isToday = true;
          row.isCurrent = true;
        }

        if (Array.isArray(this.selectedValue) && date.isSameMonth(this.activeDate)) {
          // Range selections
          const rangeValue = this.hoverValue && this.hoverValue.length ? this.hoverValue : this.selectedValue;
          const start = rangeValue[0];
          const end = rangeValue[1];
          if (start) {
            if (start.isSameDay(date)) {
              cell.isSelectedStartDate = true;
              cell.isSelected = true;
              row.isActive = true;
            }
            if (end) {
              if (end.isSameDay(date)) {
                cell.isSelectedEndDate = true;
                cell.isSelected = true;
                row.isActive = true;
              } else if (date.isAfterDay(start) && date.isBeforeDay(end)) {
                cell.isInRange = true;
              }
            }
          }
        } else if (date.isSameDay(this.value)) {
          cell.isSelected = true;
          row.isActive = true;
        }

        if (this.disabledDate && this.disabledDate(date.nativeDate)) {
          cell.isDisabled = true;
        }

        cell.classMap = {
          [`${this.prefixCls}-cell`]: true,
          // [`${this.prefixCls}-selected-date`]: false,
          [`${this.prefixCls}-today`]: cell.isToday,
          [`${this.prefixCls}-last-month-cell`]: date.isBeforeMonth(this.activeDate),
          [`${this.prefixCls}-next-month-btn-day`]: date.isAfterMonth(this.activeDate),
          [`${this.prefixCls}-selected-day`]: cell.isSelected,
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

  // private getDateTitle(date: CandyDate): string {
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
  dateCellRender: TemplateRef<Date> | string;
  dateFullCellRender: TemplateRef<Date> | string;
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
