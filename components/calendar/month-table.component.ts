/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { AbstractTable, DateBodyRow, DateCell } from 'ng-zorro-antd/calendar/abstract-table';

import { CandyDate, valueFunctionProp } from 'ng-zorro-antd/core';
import { DateHelperService } from 'ng-zorro-antd/i18n';

const MAX_ROW = 4;
const MAX_COL = 3;

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:component-selector
  selector: 'month-table',
  exportAs: 'monthTable',
  templateUrl: 'abstract-table.html'
})
export class MonthTableComponent extends AbstractTable implements OnChanges {
  @Input() prefixCls: string = 'ant-picker';
  @Input() monthCellRender: TemplateRef<{ $implicit: Date }>;
  @Input() monthFullCellRender: TemplateRef<{ $implicit: Date }>;
  @Input() disabledDate: (date: Date) => boolean;

  @Output() readonly valueChange = new EventEmitter<CandyDate>();

  constructor(private dateHelper: DateHelperService) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value || changes.disabledDate) {
      this.render();
    }
  }

  trackYear(_index: number): number {
    return this.value ? this.value.getYear() : _index;
  }

  // trackPanelMonth(_index: number, monthData: PanelMonthData): string {
  //   return monthData.content;
  // }

  makeHeadRow(): DateCell[] {
    return [];
  }

  makeBodyRows(): DateBodyRow[] {
    const months: DateBodyRow[] = [];
    const currentMonth = this.value.getMonth();
    const today = new CandyDate();

    let monthValue = 0;
    for (let rowIndex = 0; rowIndex < MAX_ROW; rowIndex++) {
      const row: DateCell[] = [];
      for (let colIndex = 0; colIndex < MAX_COL; colIndex++) {
        const month = this.value.setMonth(monthValue);
        const isDisabled = this.disabledDate ? this.disabledDate(this.value.setMonth(monthValue).nativeDate) : false;
        const content = this.dateHelper.format(month.nativeDate, 'MMM');

        const cell: DateCell = {
          value: month.nativeDate,
          isDisabled,
          content,
          title: content,
          classMap: {},
          cellRender: valueFunctionProp(this.dateCellRender, month), // Customized content
          fullCellRender: valueFunctionProp(this.dateFullCellRender, month),
          onClick: () => this.chooseMonth(cell.value.getMonth() + 1) // don't use monthValue here
        };

        cell.classMap = {
          [`${this.prefixCls}-month-panel-cell`]: true,
          [`${this.prefixCls}-month-panel-cell-disabled`]: isDisabled,
          [`${this.prefixCls}-month-panel-selected-cell`]: monthValue === currentMonth,
          [`${this.prefixCls}-month-panel-current-cell`]: today.getYear() === this.value.getYear() && monthValue === today.getMonth()
        };

        row.push(cell);
        monthValue++;
      }
      months.push({ dateCells: row });
    }
    return months;
  }

  private chooseMonth(month: number): void {
    this.value = this.value.setMonth(month);
    this.valueChange.emit(this.value);
    this.render();
  }
}
