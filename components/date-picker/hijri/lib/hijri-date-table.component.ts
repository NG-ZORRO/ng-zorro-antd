/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, inject, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';

import { NzStringTemplateOutletDirective } from 'ng-zorro-antd/core/outlet';
import { CandyDate } from 'ng-zorro-antd/core/time';
import { valueFunctionProp } from 'ng-zorro-antd/core/util';
import { NzI18nService } from 'ng-zorro-antd/i18n';

import { AbstractTable } from '../../lib/abstract-table';
import { DateBodyRow, DateCell } from '../../lib/interface';
import { transCompatFormat } from '../../lib/util';
import { NzHijriDateAdapter } from '../hijri-date-adapter';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'hijri-date-table',
  templateUrl: '../../lib/abstract-table.html',
  imports: [NzStringTemplateOutletDirective],
  encapsulation: ViewEncapsulation.None
})
export class HijriDateTableComponent extends AbstractTable implements OnChanges, OnInit {
  private readonly i18n = inject(NzI18nService);
  private readonly dateAdapter = inject(NzHijriDateAdapter);

  @Input() format?: string;

  private changeValueFromInside(value: CandyDate): void {
    // Only change date, does not change time
    const { year, month, day } = this.dateAdapter.toHijri(value.nativeDate);
    let nativeDate = this.dateAdapter.setYear(this.activeDate.nativeDate, year);
    nativeDate = this.dateAdapter.setMonth(nativeDate, month - 1);
    nativeDate = this.dateAdapter.setDate(nativeDate, day);
    this.activeDate = new CandyDate(nativeDate);
    this.valueChange.emit(this.activeDate);

    if (!this.dateAdapter.sameMonth(this.activeDate.nativeDate, this.value?.nativeDate)) {
      this.render();
    }
  }

  makeHeadRow(): DateCell[] {
    const weekDays: DateCell[] = [];
    const start = this.dateAdapter.calendarStartOfWeek(this.activeDate.nativeDate);
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
    // The Hijri month starts on its own day, so the grid starts at the week containing 1 Muharram etc.
    const firstDayOfMonth = new CandyDate(
      this.dateAdapter.calendarStartOfWeek(this.dateAdapter.calendarStartOfMonth(this.activeDate.nativeDate))
    );

    for (let week = 0; week < this.MAX_ROW; week++) {
      const weekStart = new CandyDate(this.dateAdapter.addCalendarDays(firstDayOfMonth.nativeDate, week * 7));
      const row: DateBodyRow = {
        isActive: false,
        dateCells: [],
        trackByIndex: week
      };

      for (let day = 0; day < 7; day++) {
        const date = new CandyDate(this.dateAdapter.addCalendarDays(weekStart.nativeDate, day));
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
        cell.isLastCellInPanel = this.dateAdapter.isLastDayOfMonth(date.nativeDate);
        cell.isFirstCellInPanel = this.dateAdapter.isFirstDayOfMonth(date.nativeDate);
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

  override getClassMap(cell: DateCell): Record<string, boolean> {
    return {
      ...super.getClassMap(cell),
      [`ant-picker-cell-today`]: !!cell.isToday,
      [`ant-picker-cell-in-view`]: this.dateAdapter.sameMonth(cell.value, this.activeDate.nativeDate)
    };
  }
}
