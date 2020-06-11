/**
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
  ViewEncapsulation
} from '@angular/core';
import { CandyDate } from 'ng-zorro-antd/core/time';
import { valueFunctionProp } from 'ng-zorro-antd/core/util';

import { DateHelperService, NzCalendarI18nInterface, NzI18nService } from 'ng-zorro-antd/i18n';
import { AbstractTable } from './abstract-table';
import { DateBodyRow, DateCell, DayCell } from './interface';
import { transCompatFormat } from './util';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:component-selector
  selector: 'date-table',
  exportAs: 'dateTable',
  templateUrl: './abstract-table.html'
})
export class DateTableComponent extends AbstractTable implements OnChanges, OnInit {
  @Input() locale!: NzCalendarI18nInterface;
  @Input() selectedValue: CandyDate[] = []; // Range ONLY
  @Input() hoverValue: CandyDate[] = []; // Range ONLY

  @Output() readonly dayHover = new EventEmitter<CandyDate>(); // Emitted when hover on a day by mouse enter

  constructor(private i18n: NzI18nService, private dateHelper: DateHelperService) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
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
          currentValue.some((value, index) => {
            const previousCandyDate = previousValue[index];
            return previousCandyDate instanceof CandyDate ? previousCandyDate.isSameDay(value) : previousCandyDate !== value;
          })
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

  private changeValueFromInside(value: CandyDate): void {
    // Only change date not change time
    this.activeDate = this.activeDate.setYear(value.getYear()).setMonth(value.getMonth()).setDate(value.getDate());
    this.valueChange.emit(this.activeDate);

    if (!this.activeDate.isSameMonth(this.value)) {
      this.render();
    }
  }

  makeHeadRow(): DayCell[] {
    const weekDays: DayCell[] = [];
    const start = this.activeDate.calendarStart({ weekStartsOn: this.dateHelper.getFirstDayOfWeek() });
    for (let colIndex = 0; colIndex < this.MAX_COL; colIndex++) {
      const day = start.addDays(colIndex);
      weekDays.push({
        value: day.nativeDate,
        title: this.dateHelper.format(day.nativeDate, 'E'), // eg. Tue
        content: this.dateHelper.format(day.nativeDate, this.getVeryShortWeekFormat()), // eg. Tu,
        isSelected: false,
        isDisabled: false,
        onClick(): void {},
        onMouseEnter(): void {}
      });
    }
    return weekDays;
  }

  private getVeryShortWeekFormat(): string {
    return this.i18n.getLocaleId().toLowerCase().indexOf('zh') === 0 ? 'EEEEE' : 'EEEEEE'; // Use extreme short for chinese
  }

  makeBodyRows(): DateBodyRow[] {
    const weekRows: DateBodyRow[] = [];
    const firstDayOfMonth = this.activeDate.calendarStart({ weekStartsOn: this.dateHelper.getFirstDayOfWeek() });

    for (let week = 0; week < this.MAX_ROW; week++) {
      const weekStart = firstDayOfMonth.addDays(week * 7);
      const row: DateBodyRow = {
        isActive: false,
        isCurrent: false,
        dateCells: [],
        year: weekStart.getYear()
      };

      for (let day = 0; day < 7; day++) {
        const date = weekStart.addDays(day);
        const dateFormat = transCompatFormat(this.i18n.getLocaleData('DatePicker.lang.dateFormat', 'YYYY-MM-DD'));
        const title = this.dateHelper.format(date.nativeDate, dateFormat);
        const label = this.dateHelper.format(date.nativeDate, 'dd');

        const cell: DayCell = {
          value: date.nativeDate,
          label: label,
          isSelected: false,
          isDisabled: false,
          isToday: false,
          title: title,
          cellRender: valueFunctionProp(this.cellRender!, date), // Customized content
          fullCellRender: valueFunctionProp(this.fullCellRender!, date),
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

        if (
          ((Array.isArray(this.selectedValue) && this.selectedValue.length > 0) || (this.hoverValue && this.hoverValue.length > 0)) &&
          date.isSameMonth(this.activeDate)
        ) {
          const [startHover, endHover] = this.hoverValue;
          const [startSelected, endSelected] = this.selectedValue;

          // Selected
          if (startSelected && startSelected.isSameDay(date)) {
            cell.isSelectedStartDate = true;
            cell.isSelected = true;
            row.isActive = true;
          }
          if (endSelected && endSelected.isSameDay(date)) {
            cell.isSelectedEndDate = true;
            cell.isSelected = true;
            row.isActive = true;
          } else if (date.isAfterDay(startSelected) && date.isBeforeDay(endSelected)) {
            cell.isInSelectedRange = true;
          }

          if (startHover && endHover) {
            // Hover
            if (startHover.isSameDay(date)) {
              cell.isHoverStartDate = true;
            }
            if (endHover.isSameDay(date)) {
              cell.isHoverEndDate = true;
            }
            if (date.isLastDayOfMonth()) {
              cell.isLastDayOfMonth = true;
            }
            if (date.isFirstDayOfMonth()) {
              cell.isFirstDayOfMonth = true;
            }
          }

          if (startSelected && !endSelected) {
            cell.isStartSingle = true;
          }

          if (!startSelected && endSelected) {
            cell.isEndSingle = true;
          }

          if (date.isAfterDay(startHover) && date.isBeforeDay(endHover)) {
            cell.isInHoverRange = true;
          }
        } else if (date.isSameDay(this.value)) {
          cell.isSelected = true;
          row.isActive = true;
        }

        if (this.disabledDate?.(date.nativeDate)) {
          cell.isDisabled = true;
        }

        cell.classMap = this.getClassMap(cell);

        row.dateCells.push(cell);
      }

      row.classMap = {
        [`${this.prefixCls}-week-panel-row`]: this.showWeek,
        [`${this.prefixCls}-week-panel-row-selected`]: this.showWeek && row.isActive
      };

      weekRows.push(row);
    }

    return weekRows;
  }

  getClassMap(cell: DayCell): { [key: string]: boolean } {
    const date = new CandyDate(cell.value);
    return {
      [`ant-picker-cell`]: true,
      [`ant-picker-cell-today`]: !!cell.isToday,
      [`ant-picker-cell-in-view`]: date.isSameMonth(this.activeDate),
      [`ant-picker-cell-selected`]: cell.isSelected,
      [`ant-picker-cell-disabled`]: cell.isDisabled,
      [`ant-picker-cell-in-range`]: !!cell.isInSelectedRange,
      [`ant-picker-cell-range-start`]: !!cell.isSelectedStartDate,
      [`ant-picker-cell-range-end`]: !!cell.isSelectedEndDate,
      [`ant-picker-cell-range-start-single`]: !!cell.isStartSingle,
      [`ant-picker-cell-range-end-single`]: !!cell.isEndSingle,
      [`ant-picker-cell-range-hover`]: !!cell.isInHoverRange,
      [`ant-picker-cell-range-hover-start`]: !!cell.isHoverStartDate,
      [`ant-picker-cell-range-hover-end`]: !!cell.isHoverEndDate,
      [`ant-picker-cell-range-hover-edge-start`]: !!cell.isFirstDayOfMonth,
      [`ant-picker-cell-range-hover-edge-end`]: !!cell.isLastDayOfMonth
    };
  }

  trackByBodyRow(_index: number, item: DateBodyRow): string {
    return `${item.year}-${item.weekNum}`;
  }

  trackByBodyColumn(_index: number, item: DateCell): string {
    return item.title as string;
  }
}
