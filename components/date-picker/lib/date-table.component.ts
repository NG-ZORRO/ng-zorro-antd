/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, inject, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';

import { NzStringTemplateOutletDirective } from 'ng-zorro-antd/core/outlet';
import { CandyDate, NzDateAdapter } from 'ng-zorro-antd/core/time';
import { valueFunctionProp } from 'ng-zorro-antd/core/util';
import { NzI18nService } from 'ng-zorro-antd/i18n';

import { AbstractTable } from './abstract-table';
import { DateBodyRow, DateCell } from './interface';
import { transCompatFormat } from './util';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'date-table',
  templateUrl: './abstract-table.html',
  imports: [NzStringTemplateOutletDirective],
  encapsulation: ViewEncapsulation.None
})
export class DateTableComponent extends AbstractTable implements OnChanges, OnInit {
  private readonly i18n = inject(NzI18nService);
  private readonly dateAdapter = inject<NzDateAdapter<Date>>(NzDateAdapter);

  @Input() format?: string;

  private changeValueFromInside(value: CandyDate): void {
    // Only change date, does not change time
    let date = this.dateAdapter.setDate(this.dateAdapter.clone(this.activeDate.nativeDate), 1);
    date = this.dateAdapter.setYear(date, this.dateAdapter.getYear(value.nativeDate));
    date = this.dateAdapter.setMonth(date, this.dateAdapter.getMonth(value.nativeDate));
    date = this.dateAdapter.setDate(date, this.dateAdapter.getDate(value.nativeDate));
    this.activeDate = new CandyDate(date);
    this.valueChange.emit(this.activeDate);

    if (
      !this.value ||
      this.dateAdapter.getYear(date) !== this.dateAdapter.getYear(this.value.nativeDate) ||
      this.dateAdapter.getMonth(date) !== this.dateAdapter.getMonth(this.value.nativeDate)
    ) {
      this.render();
    }
  }

  makeHeadRow(): DateCell[] {
    const weekDays: DateCell[] = [];
    const start = this.dateAdapter.calendarStartOfWeek(
      this.dateAdapter.calendarStartOfMonth(this.activeDate.nativeDate)
    );
    for (let colIndex = 0; colIndex < this.MAX_COL; colIndex++) {
      const day = this.dateAdapter.addCalendarDays(start, colIndex);
      weekDays.push({
        trackByIndex: null,
        value: day,
        title: this.dateAdapter.format(day, 'E'), // eg. Tue
        content: this.dateAdapter.format(day, this.getVeryShortWeekFormat()), // eg. Tu,
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
    const firstDayOfMonth = this.dateAdapter.calendarStartOfWeek(
      this.dateAdapter.calendarStartOfMonth(this.activeDate.nativeDate)
    );

    for (let week = 0; week < this.MAX_ROW; week++) {
      const weekStart = this.dateAdapter.addCalendarDays(firstDayOfMonth, week * 7);
      const row: DateBodyRow = {
        isActive: false,
        dateCells: [],
        trackByIndex: week
      };

      for (let day = 0; day < 7; day++) {
        const date = new CandyDate(this.dateAdapter.addCalendarDays(weekStart, day));
        const dateFormat = transCompatFormat(
          this.format ?? this.i18n.getLocaleData('DatePicker.lang.dateFormat', 'YYYY-MM-DD')
        );
        const title = this.dateAdapter.format(date.nativeDate, dateFormat);
        const label = this.dateAdapter.format(date.nativeDate, 'dd');
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
          content: `${this.dateAdapter.getDate(date.nativeDate)}`,
          onClick: () => this.changeValueFromInside(date),
          onMouseEnter: () => this.cellHover.emit(date)
        };

        this.addCellProperty(cell, date);

        if (this.showWeek && !row.weekNum) {
          row.weekNum = this.dateAdapter.getISOWeek(date.nativeDate);
        }
        if (this.value && this.dateAdapter.sameDate(date.nativeDate, this.value.nativeDate)) {
          row.isActive = true;
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
      if (startSelected && this.dateAdapter.sameDate(startSelected.nativeDate, date.nativeDate)) {
        cell.isSelectedStart = true;
        cell.isSelected = true;
      }

      if (endSelected && this.dateAdapter.sameDate(endSelected.nativeDate, date.nativeDate)) {
        cell.isSelectedEnd = true;
        cell.isSelected = true;
      }

      if (startHover && endHover) {
        cell.isHoverStart = this.dateAdapter.sameDate(startHover.nativeDate, date.nativeDate);
        cell.isHoverEnd = this.dateAdapter.sameDate(endHover.nativeDate, date.nativeDate);
        cell.isLastCellInPanel = this.dateAdapter.isLastDayOfMonth(date.nativeDate);
        cell.isFirstCellInPanel = this.dateAdapter.isFirstDayOfMonth(date.nativeDate);
        cell.isInHoverRange =
          this.dateAdapter.compareDate(startHover.nativeDate, date.nativeDate) < 0 &&
          this.dateAdapter.compareDate(date.nativeDate, endHover.nativeDate) < 0;
      }
      cell.isStartSingle = startSelected && !endSelected;
      cell.isEndSingle = !startSelected && endSelected;
      cell.isInSelectedRange =
        !!startSelected &&
        !!endSelected &&
        this.dateAdapter.compareDate(startSelected.nativeDate, date.nativeDate) < 0 &&
        this.dateAdapter.compareDate(date.nativeDate, endSelected.nativeDate) < 0;
      cell.isRangeStartNearHover = startSelected && cell.isInHoverRange;
      cell.isRangeEndNearHover = endSelected && cell.isInHoverRange;
    }

    cell.isToday = this.dateAdapter.isToday(date.nativeDate);
    cell.isSelected = !!this.value && this.dateAdapter.sameDate(date.nativeDate, this.value.nativeDate);
    cell.isDisabled = !!this.disabledDate?.(date.nativeDate);
    cell.classMap = this.getClassMap(cell);
  }

  override getClassMap(cell: DateCell): Record<string, boolean> {
    return {
      ...super.getClassMap(cell),
      [`ant-picker-cell-today`]: !!cell.isToday,
      [`ant-picker-cell-in-view`]:
        this.dateAdapter.getYear(cell.value) === this.dateAdapter.getYear(this.activeDate.nativeDate) &&
        this.dateAdapter.getMonth(cell.value) === this.dateAdapter.getMonth(this.activeDate.nativeDate)
    };
  }
}
