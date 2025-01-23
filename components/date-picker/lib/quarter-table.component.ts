/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';

import { startOfQuarter } from 'date-fns';

import { NzStringTemplateOutletDirective } from 'ng-zorro-antd/core/outlet';
import { CandyDate } from 'ng-zorro-antd/core/time';
import { valueFunctionProp } from 'ng-zorro-antd/core/util';
import { DateHelperService } from 'ng-zorro-antd/i18n';

import { AbstractTable } from './abstract-table';
import { DateBodyRow, DateCell } from './interface';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'quarter-table',
  exportAs: 'quarterTable',
  templateUrl: 'abstract-table.html',
  imports: [NzStringTemplateOutletDirective]
})
export class QuarterTableComponent extends AbstractTable implements OnChanges, OnInit {
  override MAX_ROW = 1;
  override MAX_COL = 4;

  constructor(private dateHelper: DateHelperService) {
    super();
  }

  private changeValueFromInside(value: CandyDate): void {
    this.activeDate = value.clone();
    this.valueChange.emit(this.activeDate);

    if (!this.activeDate.isSameQuarter(this.value)) {
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
      const date = this.activeDate.setQuarter(quarterValue);
      const isDisabled = this.isDisabledQuarter(date);
      const content = this.dateHelper.format(date.nativeDate, '[Q]Q');
      const cell: DateCell = {
        trackByIndex: colIndex,
        value: date.nativeDate,
        isDisabled,
        isSelected: date.isSameQuarter(this.value),
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

    const firstDayOfQuarter = new CandyDate(startOfQuarter(quarter.nativeDate));
    for (let date = firstDayOfQuarter; date.getQuarter() === quarter.getQuarter(); date = date.addMonths(1)) {
      if (!this.disabledDate(date.nativeDate)) {
        return false;
      }
    }
    return true;
  }

  private addCellProperty(cell: DateCell, month: CandyDate): void {
    if (this.hasRangeValue()) {
      const [startHover, endHover] = this.hoverValue;
      const [startSelected, endSelected] = this.selectedValue;

      if (startSelected?.isSameQuarter(month)) {
        cell.isSelectedStart = true;
        cell.isSelected = true;
      }

      if (endSelected?.isSameQuarter(month)) {
        cell.isSelectedEnd = true;
        cell.isSelected = true;
      }

      if (startHover && endHover) {
        cell.isHoverStart = startHover.isSameQuarter(month);
        cell.isHoverEnd = endHover.isSameQuarter(month);
        cell.isLastCellInPanel = month.getQuarter() === 4;
        cell.isFirstCellInPanel = month.getQuarter() === 1;
        cell.isInHoverRange = startHover.isBeforeQuarter(month) && month.isBeforeQuarter(endHover);
      }
      cell.isStartSingle = startSelected && !endSelected;
      cell.isEndSingle = !startSelected && endSelected;
      cell.isInSelectedRange = startSelected?.isBeforeQuarter(month) && month?.isBeforeQuarter(endSelected);
      cell.isRangeStartNearHover = startSelected && cell.isInHoverRange;
      cell.isRangeEndNearHover = endSelected && cell.isInHoverRange;
    } else if (month.isSameQuarter(this.value)) {
      cell.isSelected = true;
    }
    cell.classMap = this.getClassMap(cell);
  }
}
