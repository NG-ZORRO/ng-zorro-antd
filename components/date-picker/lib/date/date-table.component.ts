import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, SimpleChange } from '@angular/core';

import { FunctionProp } from '../../../core/types/common-wrap';
import { isNonEmptyString, isTemplateRef } from '../../../core/util/check';
import { valueFunctionProp } from '../../../core/util/convert';
import { NzI18nService } from '../../../i18n/nz-i18n.service';
import { CandyDate } from '../candy-date';

const DATE_ROW_NUM = 6;
const DATE_COL_NUM = 7;

@Component({
  selector: 'date-table',
  templateUrl: 'date-table.component.html'
})

export class DateTableComponent implements OnInit, OnChanges {
  @Input() selectedValue: CandyDate[]; // Range ONLY
  @Input() hoverValue: CandyDate[]; // Range ONLY

  @Input() value: CandyDate;
  @Output() valueChange = new EventEmitter<CandyDate>();

  @Input() showWeek: boolean;
  @Input() disabledDate: (d: Date) => boolean;
  @Input() dateRender: FunctionProp<TemplateRef<Date> | string>; // Customize date content while rendering

  @Output() dayHover = new EventEmitter<CandyDate>(); // Emitted when hover on a day by mouse enter

  prefixCls: string = 'ant-calendar';
  headWeekDays: WeekDayLabel[];
  weekRows: WeekRow[];

  isTemplateRef = isTemplateRef;
  isNonEmptyString = isNonEmptyString;

  constructor(private i18n: NzI18nService) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isDateRealChange(changes.value) ||
        this.isDateRealChange(changes.selectedValue) ||
        this.isDateRealChange(changes.hoverValue)) {

      this.render();
    }
  }

  private isDateRealChange(change: SimpleChange): boolean {
    if (change) {
      const previousValue: CandyDate | CandyDate[] = change.previousValue;
      const currentValue: CandyDate | CandyDate[] = change.currentValue;
      if (Array.isArray(currentValue)) {
        return !Array.isArray(previousValue) ||
          currentValue.length !== previousValue.length ||
          currentValue.some((value, index) => !this.isSameDate(previousValue[index], value));
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
      // this.value = value;
      // this.valueChange.emit(this.value);
      // this.render();
      this.valueChange.emit(value);
    }
  }

  private makeHeadWeekDays(): WeekDayLabel[] {
    const weekDays: WeekDayLabel[] = [];
    const firstDayOfWeek = this.getFirstDayOfWeek();
    for (let colIndex = 0; colIndex < DATE_COL_NUM; colIndex ++) {
      const day = (firstDayOfWeek + colIndex) % DATE_COL_NUM;
      const tempDate = this.value.setDay(day);
      weekDays[ colIndex ] = {
        short: this.i18n.formatDate(tempDate.nativeDate, 'E'), // eg. Tue
        veryShort: this.i18n.formatDate(tempDate.nativeDate, this.getVeryShortWeekFormat()) // eg. Tu
      };
    }
    return weekDays;
  }

  private getVeryShortWeekFormat(): string {
    return this.i18n.getLocaleId().toLowerCase().indexOf('zh') === 0 ? 'EEEEE' : 'EEEEEE'; // Use extreme short for chinese
  }

  private makeWeekRows(): WeekRow[] {
    // let justRendered = true;
    const weekRows: WeekRow[] = [];
    const firstDayOfWeek = this.getFirstDayOfWeek();
    const firstDateOfMonth = this.value.setDate(1);
    // const firstDateToShow = firstDateOfMonth.setDay(firstDayOfWeek, { weekStartsOn: firstDayOfWeek });
    const firstDateOffset = (firstDateOfMonth.getDay() + 7 - firstDayOfWeek) % 7;
    const firstDateToShow = firstDateOfMonth.addDays(0 - firstDateOffset);

    let increased = 0;
    for (let rowIndex = 0; rowIndex < DATE_ROW_NUM; rowIndex ++) {
      const week: WeekRow = weekRows[rowIndex] = {
        isActive: false,
        isCurrent: false,
        dateCells: []
      };

      for (let colIndex = 0; colIndex < DATE_COL_NUM; colIndex ++) {
        const current = firstDateToShow.addDays(increased ++);
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
          // onMouseEnter: () => {
            // if (!justRendered) { // [Hack] To prevent the immediately "mouseenter" event when it just rendered, or the "hoverValue" may always said as changed
              // this.dayHover.emit(cell.value);
            // }
            // justRendered = false;
          // }
        };

        if (this.showWeek && !week.weekNum) {
          week.weekNum = this.getWeekNum(current);
        }

        if (current.isToday()) {
          cell.isToday = true;
          week.isCurrent = true;
        }

        if (Array.isArray(this.selectedValue) && !isBeforeMonthYear && !isAfterMonthYear) { // Range selections
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

        if (this.disabledDate && this.disabledDate(current.nativeDate)) {
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

  private getFirstDayOfWeek(): number {
    return this.value.firstDayOfWeek(this.i18n.getLocaleId());
  }

  private getDateTitle(date: CandyDate): string {
    return this.i18n.formatDate(date.nativeDate, 'longDate');
  }

  private getWeekNum(date: CandyDate): number {
    return +this.i18n.formatDate(date.nativeDate, 'w');
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
  customContent: TemplateRef<Date> | string;
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
