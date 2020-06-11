/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { CandyDate } from 'ng-zorro-antd/core/time';
import { FunctionProp, NzSafeAny } from 'ng-zorro-antd/core/types';
import { isNonEmptyString, isTemplateRef } from 'ng-zorro-antd/core/util';
import { DateBodyRow, DateCell } from './interface';

export abstract class AbstractTable implements OnInit, OnChanges {
  isTemplateRef = isTemplateRef;
  isNonEmptyString = isNonEmptyString;
  headRow: DateCell[] = [];
  bodyRows: DateBodyRow[] = [];
  MAX_ROW = 6;
  MAX_COL = 7;

  @Input() prefixCls: string = 'ant-picker';
  @Input() value!: CandyDate;
  @Input() activeDate: CandyDate = new CandyDate();
  @Input() showWeek: boolean = false;
  @Input() disabledDate?: (d: Date) => boolean;
  @Input() cellRender?: string | TemplateRef<Date> | FunctionProp<TemplateRef<Date> | string>;
  @Input() fullCellRender?: string | TemplateRef<Date> | FunctionProp<TemplateRef<Date> | string>;

  @Output() readonly valueChange = new EventEmitter<CandyDate>();

  protected render(): void {
    if (this.activeDate) {
      this.headRow = this.makeHeadRow();
      this.bodyRows = this.makeBodyRows();
    }
  }

  trackByBodyRow(_index: number, item: DateBodyRow): NzSafeAny {
    return item;
  }

  // Item usually is an object, so trackby has no use by default.
  trackByBodyColumn(_index: number, item: DateCell): NzSafeAny {
    return item;
  }

  abstract makeHeadRow(): DateCell[];
  abstract makeBodyRows(): DateBodyRow[];

  ngOnInit(): void {
    this.render();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.activeDate && !changes.activeDate.currentValue) {
      this.activeDate = new CandyDate();
    }
  }
}
