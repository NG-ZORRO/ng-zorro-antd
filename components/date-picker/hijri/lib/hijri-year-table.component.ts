/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, inject, ViewEncapsulation } from '@angular/core';

import { NzStringTemplateOutletDirective } from 'ng-zorro-antd/core/outlet';
import { CandyDate } from 'ng-zorro-antd/core/time';
import { valueFunctionProp } from 'ng-zorro-antd/core/util';

import { AbstractTable } from '../../lib/abstract-table';
import { DateBodyRow, DateCell, YearCell } from '../../lib/interface';
import { NzHijriDateAdapter } from '../hijri-date-adapter';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'hijri-year-table',
  templateUrl: '../../lib/abstract-table.html',
  imports: [NzStringTemplateOutletDirective],
  encapsulation: ViewEncapsulation.None
})
export class HijriYearTableComponent extends AbstractTable {
  private readonly dateAdapter = inject(NzHijriDateAdapter);

  override MAX_ROW = 4;
  override MAX_COL = 3;

  makeHeadRow(): DateCell[] {
    return [];
  }

  makeBodyRows(): DateBodyRow[] {
    const currentYear = this.activeDate && this.dateAdapter.getYear(this.activeDate.nativeDate);
    const startYear = parseInt(`${currentYear / 10}`, 10) * 10;
    const endYear = startYear + 9;
    const previousYear = startYear - 1;
    const years: DateBodyRow[] = [];
    let yearValue = 0;

    for (let rowIndex = 0; rowIndex < this.MAX_ROW; rowIndex++) {
      const row: DateBodyRow = {
        dateCells: [],
        trackByIndex: rowIndex
      };
      for (let colIndex = 0; colIndex < this.MAX_COL; colIndex++) {
        const yearNum = previousYear + yearValue;
        const year = new CandyDate(this.dateAdapter.setYear(this.activeDate.nativeDate, yearNum));
        const content = this.dateAdapter.format(year.nativeDate, 'yyyy');
        const isDisabled = this.isDisabledYear(year);
        const cell: YearCell = {
          trackByIndex: colIndex,
          value: year.nativeDate,
          isDisabled,
          isSameDecade: yearNum >= startYear && yearNum <= endYear,
          isSelected: yearNum === (this.value && this.dateAdapter.getYear(this.value.nativeDate)),
          content,
          title: content,
          classMap: {},
          isLastCellInPanel: this.dateAdapter.getYear(year.nativeDate) === endYear,
          isFirstCellInPanel: this.dateAdapter.getYear(year.nativeDate) === startYear,
          cellRender: valueFunctionProp(this.cellRender!, year), // Customized content
          fullCellRender: valueFunctionProp(this.fullCellRender!, year),
          onClick: () => this.chooseYear(this.dateAdapter.getYear(cell.value)), // don't use yearValue here,
          onMouseEnter: () => this.cellHover.emit(year)
        };

        this.addCellProperty(cell, year);
        row.dateCells.push(cell);
        yearValue++;
      }
      years.push(row);
    }
    return years;
  }

  override getClassMap(cell: YearCell): Record<string, boolean> {
    return {
      ...super.getClassMap(cell),
      [`ant-picker-cell-in-view`]: !!cell.isSameDecade
    };
  }

  private isDisabledYear(year: CandyDate): boolean {
    if (!this.disabledDate) {
      return false;
    }

    let date = this.dateAdapter.setDate(this.dateAdapter.setMonth(year.nativeDate, 0), 1);
    const yearValue = this.dateAdapter.getYear(year.nativeDate);

    while (this.dateAdapter.getYear(date) === yearValue) {
      if (!this.disabledDate(date)) {
        return false;
      }
      date = this.dateAdapter.addCalendarDays(date, 1);
    }

    return true;
  }

  private addCellProperty(cell: DateCell, year: CandyDate): void {
    if (this.hasRangeValue()) {
      const [startHover, endHover] = this.hoverValue;
      const [startSelected, endSelected] = this.selectedValue;
      // Selected
      if (this.dateAdapter.sameYear(startSelected?.nativeDate, year.nativeDate)) {
        cell.isSelectedStart = true;
        cell.isSelected = true;
      }

      if (this.dateAdapter.sameYear(endSelected?.nativeDate, year.nativeDate)) {
        cell.isSelectedEnd = true;
        cell.isSelected = true;
      }

      if (startHover && endHover) {
        cell.isHoverStart = this.dateAdapter.sameYear(startHover.nativeDate, year.nativeDate);
        cell.isHoverEnd = this.dateAdapter.sameYear(endHover.nativeDate, year.nativeDate);
        cell.isInHoverRange =
          this.dateAdapter.beforeYear(startHover.nativeDate, year.nativeDate) &&
          this.dateAdapter.beforeYear(year.nativeDate, endHover.nativeDate);
      }
      cell.isStartSingle = startSelected && !endSelected;
      cell.isEndSingle = !startSelected && endSelected;
      cell.isInSelectedRange =
        this.dateAdapter.beforeYear(startSelected?.nativeDate, year.nativeDate) &&
        this.dateAdapter.beforeYear(year.nativeDate, endSelected?.nativeDate);
      cell.isRangeStartNearHover = startSelected && cell.isInHoverRange;
      cell.isRangeEndNearHover = endSelected && cell.isInHoverRange;
    } else if (this.dateAdapter.sameYear(year.nativeDate, this.value?.nativeDate)) {
      cell.isSelected = true;
    }
    cell.classMap = this.getClassMap(cell);
  }

  private chooseYear(year: number): void {
    this.value = new CandyDate(this.dateAdapter.setYear(this.activeDate.nativeDate, year));
    this.valueChange.emit(this.value);
    this.render();
  }
}
