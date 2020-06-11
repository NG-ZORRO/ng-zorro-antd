/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { valueFunctionProp } from 'ng-zorro-antd/core/util';
import { DateHelperService } from 'ng-zorro-antd/i18n';
import { AbstractTable } from './abstract-table';
import { DateBodyRow, DateCell, YearCell } from './interface';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:component-selector
  selector: 'year-table',
  exportAs: 'yearTable',
  templateUrl: 'abstract-table.html'
})
export class YearTableComponent extends AbstractTable implements OnChanges {
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
    const currentYear = this.activeDate && this.activeDate.getYear();
    const startYear = parseInt(`${currentYear / 10}`, 10) * 10;
    const endYear = startYear + 9;
    const previousYear = startYear - 1;

    const years: DateBodyRow[] = [];

    let yearValue = 0;
    for (let rowIndex = 0; rowIndex < this.MAX_ROW; rowIndex++) {
      const row: DateCell[] = [];
      for (let colIndex = 0; colIndex < this.MAX_COL; colIndex++) {
        const yearNum = previousYear + yearValue;
        const year = this.activeDate.setYear(yearNum);
        const content = this.dateHelper.format(year.nativeDate, 'yyyy');
        const isDisabled = this.disabledDate ? this.disabledDate(year.nativeDate) : false;

        const cell: YearCell = {
          value: year.nativeDate,
          isDisabled,
          isSameDecade: yearNum >= startYear && yearNum <= endYear,
          isSelected: yearNum === (this.value && this.value.getYear()),
          content,
          title: content,
          classMap: {},
          cellRender: valueFunctionProp(this.cellRender!, year), // Customized content
          fullCellRender: valueFunctionProp(this.fullCellRender!, year),
          onClick: () => this.chooseYear(cell.value.getFullYear()), // don't use yearValue here,
          onMouseEnter: () => null
        };

        cell.classMap = this.getClassMap(cell);

        row.push(cell);
        yearValue++;
      }
      years.push({ dateCells: row });
    }
    return years;
  }

  getClassMap(cell: YearCell): { [key: string]: boolean } {
    return {
      [`${this.prefixCls}-cell`]: true,
      [`${this.prefixCls}-cell-in-view`]: !!cell.isSameDecade,
      [`${this.prefixCls}-cell-selected`]: cell.isSelected,
      [`${this.prefixCls}-cell-disabled`]: cell.isDisabled
    };
  }

  private chooseYear(year: number): void {
    this.value = this.activeDate.setYear(year);
    this.valueChange.emit(this.value);
    this.render();
  }
}
