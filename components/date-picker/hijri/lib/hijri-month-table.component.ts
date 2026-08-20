/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, inject, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';

import { NzStringTemplateOutletDirective } from 'ng-zorro-antd/core/outlet';
import { CandyDate } from 'ng-zorro-antd/core/time';
import { valueFunctionProp } from 'ng-zorro-antd/core/util';

import { AbstractTable } from '../../lib/abstract-table';
import { DateBodyRow, DateCell } from '../../lib/interface';
import { transCompatFormat } from '../../lib/util';
import { NzHijriDateAdapter } from '../hijri-date-adapter';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'hijri-month-table',
  templateUrl: '../../lib/abstract-table.html',
  imports: [NzStringTemplateOutletDirective],
  encapsulation: ViewEncapsulation.None
})
export class HijriMonthTableComponent extends AbstractTable implements OnChanges, OnInit {
  private readonly dateAdapter = inject(NzHijriDateAdapter);

  override MAX_ROW = 4;
  override MAX_COL = 3;

  makeHeadRow(): DateCell[] {
    return [];
  }

  makeBodyRows(): DateBodyRow[] {
    const months: DateBodyRow[] = [];
    let monthValue = 0;

    for (let rowIndex = 0; rowIndex < this.MAX_ROW; rowIndex++) {
      const row: DateBodyRow = {
        dateCells: [],
        trackByIndex: rowIndex
      };

      for (let colIndex = 0; colIndex < this.MAX_COL; colIndex++) {
        const month = new CandyDate(this.dateAdapter.setMonth(this.activeDate.nativeDate, monthValue));
        const isDisabled = this.isDisabledMonth(month);
        const content = this.dateAdapter.format(month.nativeDate, transCompatFormat(this.locale.monthFormat || 'MMM'));
        const cell: DateCell = {
          trackByIndex: colIndex,
          value: month.nativeDate,
          isDisabled,
          isSelected: this.dateAdapter.sameMonth(month.nativeDate, this.value?.nativeDate),
          content,
          title: content,
          classMap: {},
          cellRender: valueFunctionProp(this.cellRender!, month), // Customized content
          fullCellRender: valueFunctionProp(this.fullCellRender!, month),
          onClick: () => this.chooseMonth(this.dateAdapter.getMonth(cell.value)), // don't use monthValue here,
          onMouseEnter: () => this.cellHover.emit(month)
        };

        this.addCellProperty(cell, month);
        row.dateCells.push(cell);
        monthValue++;
      }
      months.push(row);
    }
    return months;
  }

  private isDisabledMonth(month: CandyDate): boolean {
    if (!this.disabledDate) {
      return false;
    }

    let date = this.dateAdapter.setDate(month.nativeDate, 1);
    const monthValue = this.dateAdapter.getMonth(month.nativeDate);

    while (this.dateAdapter.getMonth(date) === monthValue) {
      if (!this.disabledDate(date)) {
        return false;
      }
      date = this.dateAdapter.addCalendarDays(date, 1);
    }

    return true;
  }

  private addCellProperty(cell: DateCell, month: CandyDate): void {
    if (this.hasRangeValue()) {
      const [startHover, endHover] = this.hoverValue;
      const [startSelected, endSelected] = this.selectedValue;
      // Selected
      if (this.dateAdapter.sameMonth(startSelected?.nativeDate, month.nativeDate)) {
        cell.isSelectedStart = true;
        cell.isSelected = true;
      }

      if (this.dateAdapter.sameMonth(endSelected?.nativeDate, month.nativeDate)) {
        cell.isSelectedEnd = true;
        cell.isSelected = true;
      }

      if (startHover && endHover) {
        cell.isHoverStart = this.dateAdapter.sameMonth(startHover.nativeDate, month.nativeDate);
        cell.isHoverEnd = this.dateAdapter.sameMonth(endHover.nativeDate, month.nativeDate);
        cell.isLastCellInPanel = this.dateAdapter.getMonth(month.nativeDate) === 11;
        cell.isFirstCellInPanel = this.dateAdapter.getMonth(month.nativeDate) === 0;
        cell.isInHoverRange =
          this.dateAdapter.beforeMonth(startHover.nativeDate, month.nativeDate) &&
          this.dateAdapter.beforeMonth(month.nativeDate, endHover.nativeDate);
      }
      cell.isStartSingle = startSelected && !endSelected;
      cell.isEndSingle = !startSelected && endSelected;
      cell.isInSelectedRange =
        this.dateAdapter.beforeMonth(startSelected?.nativeDate, month.nativeDate) &&
        this.dateAdapter.beforeMonth(month.nativeDate, endSelected?.nativeDate);
      cell.isRangeStartNearHover = startSelected && cell.isInHoverRange;
      cell.isRangeEndNearHover = endSelected && cell.isInHoverRange;
    } else if (this.dateAdapter.sameMonth(month.nativeDate, this.value?.nativeDate)) {
      cell.isSelected = true;
    }
    cell.classMap = this.getClassMap(cell);
  }

  private chooseMonth(month: number): void {
    this.value = new CandyDate(this.dateAdapter.setMonth(this.activeDate.nativeDate, month));
    this.valueChange.emit(this.value);
  }
}
