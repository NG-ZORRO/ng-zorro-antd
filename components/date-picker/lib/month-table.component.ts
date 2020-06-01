/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { valueFunctionProp } from 'ng-zorro-antd/core/util';
import { DateHelperService } from 'ng-zorro-antd/i18n';
import { AbstractTable } from './abstract-table';
import { DateBodyRow, DateCell, DayCell } from './interface';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:component-selector
  selector: 'month-table',
  exportAs: 'monthTable',
  templateUrl: 'abstract-table.html'
})
export class MonthTableComponent extends AbstractTable implements OnChanges {
  MAX_ROW = 4;
  MAX_COL = 3;

  constructor(private dateHelper: DateHelperService) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes.value || changes.disabledDate || changes.activeDate) {
      this.render();
    }
  }

  makeHeadRow(): DateCell[] {
    return [];
  }

  makeBodyRows(): DateBodyRow[] {
    const months: DateBodyRow[] = [];
    const currentMonth = this.value && this.value.getMonth();

    let monthValue = 0;
    for (let rowIndex = 0; rowIndex < this.MAX_ROW; rowIndex++) {
      const row: DateCell[] = [];
      for (let colIndex = 0; colIndex < this.MAX_COL; colIndex++) {
        const month = this.activeDate.setMonth(monthValue);
        const isDisabled = this.disabledDate ? this.disabledDate(month.nativeDate) : false;
        const content = this.dateHelper.format(month.nativeDate, 'MMM');

        const cell: DateCell = {
          value: month.nativeDate,
          isDisabled,
          isSelected: monthValue === currentMonth,
          content,
          title: content,
          classMap: {},
          cellRender: valueFunctionProp(this.cellRender!, month), // Customized content
          fullCellRender: valueFunctionProp(this.fullCellRender!, month),
          onClick: () => this.chooseMonth(cell.value.getMonth()), // don't use monthValue here,
          onMouseEnter: () => null
        };

        cell.classMap = this.getClassMap(cell);

        row.push(cell);
        monthValue++;
      }
      months.push({ dateCells: row });
    }
    return months;
  }

  getClassMap(cell: DayCell): { [key: string]: boolean } {
    return {
      [`ant-picker-cell`]: true,
      [`ant-picker-cell-in-view`]: true,
      [`ant-picker-cell-selected`]: cell.isSelected,
      [`ant-picker-cell-disabled`]: cell.isDisabled
    };
  }

  private chooseMonth(month: number): void {
    this.value = this.activeDate.setMonth(month);
    this.valueChange.emit(this.value);
  }
}
