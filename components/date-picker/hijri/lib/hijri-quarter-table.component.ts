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
import { NzHijriDateAdapter } from '../hijri-date-adapter';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'hijri-quarter-table',
  templateUrl: '../../lib/abstract-table.html',
  imports: [NzStringTemplateOutletDirective],
  encapsulation: ViewEncapsulation.None
})
export class HijriQuarterTableComponent extends AbstractTable implements OnChanges, OnInit {
  private readonly dateAdapter = inject(NzHijriDateAdapter);

  override MAX_ROW = 1;
  override MAX_COL = 4;

  private changeValueFromInside(value: CandyDate): void {
    this.activeDate = value.clone();
    this.valueChange.emit(this.activeDate);

    if (!this.dateAdapter.sameQuarter(this.activeDate.nativeDate, this.value?.nativeDate)) {
      this.render();
    }
  }

  makeHeadRow(): DateCell[] {
    return [];
  }

  makeBodyRows(): DateBodyRow[] {
    const dateCells: DateCell[] = [];
    const months: DateBodyRow[] = [{ dateCells, trackByIndex: 0 }];
    let quarterValue = 1;

    for (let colIndex = 1; colIndex <= this.MAX_COL; colIndex++, quarterValue++) {
      const date = new CandyDate(this.dateAdapter.setQuarter(this.activeDate.nativeDate, quarterValue));
      const isDisabled = this.isDisabledQuarter(date);
      const content = this.dateAdapter.format(date.nativeDate, '[Q]Q');
      const cell: DateCell = {
        trackByIndex: colIndex,
        value: date.nativeDate,
        isDisabled,
        isSelected: this.dateAdapter.sameQuarter(date.nativeDate, this.value?.nativeDate),
        content,
        title: content,
        classMap: {},
        cellRender: valueFunctionProp(this.cellRender!, date),
        fullCellRender: valueFunctionProp(this.fullCellRender!, date),
        onClick: () => this.changeValueFromInside(date),
        onMouseEnter: () => this.cellHover.emit(date)
      };

      this.addCellProperty(cell, date);
      dateCells.push(cell);
    }
    return months;
  }

  private isDisabledQuarter(quarter: CandyDate): boolean {
    if (!this.disabledDate) {
      return false;
    }

    let date = this.dateAdapter.startOfQuarter(quarter.nativeDate);
    const quarterValue = this.dateAdapter.getQuarter(quarter.nativeDate);

    while (this.dateAdapter.getQuarter(date) === quarterValue) {
      if (!this.disabledDate(date)) {
        return false;
      }
      date = this.dateAdapter.addCalendarMonths(date, 1);
    }
    return true;
  }

  private addCellProperty(cell: DateCell, month: CandyDate): void {
    if (this.hasRangeValue()) {
      const [startHover, endHover] = this.hoverValue;
      const [startSelected, endSelected] = this.selectedValue;

      if (this.dateAdapter.sameQuarter(startSelected?.nativeDate, month.nativeDate)) {
        cell.isSelectedStart = true;
        cell.isSelected = true;
      }

      if (this.dateAdapter.sameQuarter(endSelected?.nativeDate, month.nativeDate)) {
        cell.isSelectedEnd = true;
        cell.isSelected = true;
      }

      if (startHover && endHover) {
        cell.isHoverStart = this.dateAdapter.sameQuarter(startHover.nativeDate, month.nativeDate);
        cell.isHoverEnd = this.dateAdapter.sameQuarter(endHover.nativeDate, month.nativeDate);
        cell.isLastCellInPanel = this.dateAdapter.getQuarter(month.nativeDate) === 4;
        cell.isFirstCellInPanel = this.dateAdapter.getQuarter(month.nativeDate) === 1;
        cell.isInHoverRange =
          this.dateAdapter.beforeQuarter(startHover.nativeDate, month.nativeDate) &&
          this.dateAdapter.beforeQuarter(month.nativeDate, endHover.nativeDate);
      }
      cell.isStartSingle = startSelected && !endSelected;
      cell.isEndSingle = !startSelected && endSelected;
      cell.isInSelectedRange =
        this.dateAdapter.beforeQuarter(startSelected?.nativeDate, month.nativeDate) &&
        this.dateAdapter.beforeQuarter(month.nativeDate, endSelected?.nativeDate);
      cell.isRangeStartNearHover = startSelected && cell.isInHoverRange;
      cell.isRangeEndNearHover = endSelected && cell.isInHoverRange;
    } else if (this.dateAdapter.sameQuarter(month.nativeDate, this.value?.nativeDate)) {
      cell.isSelected = true;
    }
    cell.classMap = this.getClassMap(cell);
  }
}
