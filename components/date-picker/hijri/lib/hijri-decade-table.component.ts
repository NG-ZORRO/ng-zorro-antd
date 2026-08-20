/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, inject, OnChanges, ViewEncapsulation } from '@angular/core';

import { NzStringTemplateOutletDirective } from 'ng-zorro-antd/core/outlet';
import { CandyDate } from 'ng-zorro-antd/core/time';

import { AbstractTable } from '../../lib/abstract-table';
import { DateBodyRow, DateCell, DecadeCell } from '../../lib/interface';
import { NzHijriDateAdapter } from '../hijri-date-adapter';

const MAX_ROW = 4;
const MAX_COL = 3;

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'hijri-decade-table',
  templateUrl: '../../lib/abstract-table.html',
  imports: [NzStringTemplateOutletDirective],
  encapsulation: ViewEncapsulation.None
})
export class HijriDecadeTableComponent extends AbstractTable implements OnChanges {
  private readonly dateAdapter = inject(NzHijriDateAdapter);

  get startYear(): number {
    return parseInt(`${this.dateAdapter.getYear(this.activeDate.nativeDate) / 100}`, 10) * 100;
  }

  get endYear(): number {
    return this.startYear + 99;
  }

  makeHeadRow(): DateCell[] {
    return [];
  }

  makeBodyRows(): DateBodyRow[] {
    const decades: DateBodyRow[] = [];
    const currentYear = this.value && this.dateAdapter.getYear(this.value.nativeDate);
    const startYear = this.startYear;
    const endYear = this.endYear;
    const previousYear = startYear - 10;

    let index = 0;
    for (let rowIndex = 0; rowIndex < MAX_ROW; rowIndex++) {
      const row: DateBodyRow = {
        dateCells: [],
        trackByIndex: rowIndex
      };

      for (let colIndex = 0; colIndex < MAX_COL; colIndex++) {
        const start = previousYear + index * 10;
        const end = start + 9;
        const content = `${start}-${end}`;

        const cell: DecadeCell = {
          trackByIndex: colIndex,
          value: this.dateAdapter.setYear(this.activeDate.nativeDate, start),
          content,
          title: content,
          isDisabled: false,
          isSelected: currentYear >= start && currentYear <= end,
          isLowerThanStart: end < startYear,
          isBiggerThanEnd: start > endYear,
          classMap: {},
          onClick(): void {},
          onMouseEnter(): void {}
        };

        cell.classMap = this.getClassMap(cell);
        cell.onClick = () => this.chooseDecade(start);
        index++;
        row.dateCells.push(cell);
      }

      decades.push(row);
    }
    return decades;
  }

  override getClassMap(cell: DecadeCell): Record<string, boolean> {
    return {
      [`${this.prefixCls}-cell`]: true,
      [`${this.prefixCls}-cell-in-view`]: !cell.isBiggerThanEnd && !cell.isLowerThanStart,
      [`${this.prefixCls}-cell-selected`]: cell.isSelected,
      [`${this.prefixCls}-cell-disabled`]: cell.isDisabled
    };
  }

  private chooseDecade(year: number): void {
    this.value = new CandyDate(this.dateAdapter.setYear(this.activeDate.nativeDate, year));
    this.valueChange.emit(this.value);
  }
}
