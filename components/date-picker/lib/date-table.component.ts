/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { CandyDate } from 'ng-zorro-antd/core/time';
import { valueFunctionProp } from 'ng-zorro-antd/core/util';

import { DateHelperService, NzCalendarI18nInterface, NzI18nService } from 'ng-zorro-antd/i18n';
import { AbstractTable } from './abstract-table';
import { DateBodyRow, DateCell } from './interface';
import { transCompatFormat } from './util';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'date-table',
  exportAs: 'dateTable',
  templateUrl: './abstract-table.html'
})
export class DateTableComponent extends AbstractTable implements OnChanges, OnInit {
  @Input() override locale!: NzCalendarI18nInterface;

  constructor(private i18n: NzI18nService, private dateHelper: DateHelperService) {
    super();
  }

  private changeValueFromInside(value: CandyDate): void {
    // Only change date not change time
    this.activeDate = this.activeDate.setYear(value.getYear()).setMonth(value.getMonth()).setDate(value.getDate());
    this.valueChange.emit(this.activeDate);

    if (!this.activeDate.isSameMonth(this.value)) {
      this.render();
    }
  }

  makeHeadRow(): DateCell[] {
    const weekDays: DateCell[] = [];
    const start = this.activeDate.calendarStart({ weekStartsOn: this.dateHelper.getFirstDayOfWeek() });
    for (let colIndex = 0; colIndex < this.MAX_COL; colIndex++) {
      const day = start.addDays(colIndex);
      weekDays.push({
        trackByIndex: null,
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
        dateCells: [],
        trackByIndex: week
      };

      for (let day = 0; day < 7; day++) {
        const date = weekStart.addDays(day);
        const dateFormat = transCompatFormat(this.i18n.getLocaleData('DatePicker.lang.dateFormat', 'YYYY-MM-DD'));
        const title = this.dateHelper.format(date.nativeDate, dateFormat);
        const label = this.dateHelper.format(date.nativeDate, 'dd');
        const cell: DateCell = {
          trackByIndex: day,
          value: date.nativeDate,
          label,
          isSelected: false,
          isDisabled: false,
          isToday: false,
          title,
          cellRender: valueFunctionProp(this.cellRender!, date), // Customized content
          fullCellRender: valueFunctionProp(this.fullCellRender!, date),
          content: `${date.getDate()}`,
          onClick: () => this.changeValueFromInside(date),
          onMouseEnter: () => this.cellHover.emit(date)
        };

        this.addCellProperty(cell, date);

        if (this.showWeek && !row.weekNum) {
          row.weekNum = this.dateHelper.getISOWeek(date.nativeDate);
        }
        if (date.isSameDay(this.value)) {
          row.isActive = date.isSameDay(this.value);
        }
        row.dateCells.push(cell);
      }
      row.classMap = {
        [`ant-picker-week-panel-row`]: this.canSelectWeek,
        [`ant-picker-week-panel-row-selected`]: this.canSelectWeek && row.isActive
      };
      weekRows.push(row);
    }
    return weekRows;
  }

  addCellProperty(cell: DateCell, date: CandyDate): void {
    if (this.hasRangeValue() && !this.canSelectWeek) {
      const [startHover, endHover] = this.hoverValue;
      const [startSelected, endSelected] = this.selectedValue;
      // Selected
      if (startSelected?.isSameDay(date)) {
        cell.isSelectedStart = true;
        cell.isSelected = true;
      }

      if (endSelected?.isSameDay(date)) {
        cell.isSelectedEnd = true;
        cell.isSelected = true;
      }

      if (startHover && endHover) {
        cell.isHoverStart = startHover.isSameDay(date);
        cell.isHoverEnd = endHover.isSameDay(date);
        cell.isLastCellInPanel = date.isLastDayOfMonth();
        cell.isFirstCellInPanel = date.isFirstDayOfMonth();
        cell.isInHoverRange = startHover.isBeforeDay(date) && date.isBeforeDay(endHover);
      }
      cell.isStartSingle = startSelected && !endSelected;
      cell.isEndSingle = !startSelected && endSelected;
      cell.isInSelectedRange = startSelected?.isBeforeDay(date) && date.isBeforeDay(endSelected);
      cell.isRangeStartNearHover = startSelected && cell.isInHoverRange;
      cell.isRangeEndNearHover = endSelected && cell.isInHoverRange;
    }

    cell.isToday = date.isToday();
    cell.isSelected = date.isSameDay(this.value);
    cell.isDisabled = !!this.disabledDate?.(date.nativeDate);
    cell.classMap = this.getClassMap(cell);
  }

  override getClassMap(cell: DateCell): { [key: string]: boolean } {
    const date = new CandyDate(cell.value);
    return {
      ...super.getClassMap(cell),
      [`ant-picker-cell-today`]: !!cell.isToday,
      [`ant-picker-cell-in-view`]: date.isSameMonth(this.activeDate)
    };
  }
}
