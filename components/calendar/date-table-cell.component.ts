/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, Input } from '@angular/core';
import { isNonEmptyString, isTemplateRef } from 'ng-zorro-antd/core';
import { DateCell } from './date-table.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[date-table-cell]',
  exportAs: 'dateTableCell',
  templateUrl: './date-table-cell.component.html',
  styles: []
})
export class DateTableCellComponent {
  isTemplateRef = isTemplateRef;
  isNonEmptyString = isNonEmptyString;

  @Input() prefixCls: 'ant-calendar' | 'ant-fullcalendar';
  @Input() cell: DateCell;
}
