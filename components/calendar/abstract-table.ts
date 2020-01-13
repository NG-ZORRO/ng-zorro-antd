/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { CandyDate, FunctionProp, isNonEmptyString, isTemplateRef } from 'ng-zorro-antd/core';
import { PREFIX_CLASS } from 'ng-zorro-antd/date-picker/name';

/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export abstract class AbstractTable implements OnInit {
  isTemplateRef = isTemplateRef;
  isNonEmptyString = isNonEmptyString;

  headRow: DateCell[] = [];
  bodyRows: DateBodyRow[] = [];
  @Input() prefixCls: string = PREFIX_CLASS;
  @Input() value: CandyDate = new CandyDate();
  @Input() activeDate: CandyDate;
  @Input() showWeek: boolean = false;
  @Input() disabledDate: (d: Date) => boolean;
  @Input() dateCellRender: FunctionProp<TemplateRef<Date> | string>;
  @Input() dateFullCellRender: FunctionProp<TemplateRef<Date> | string>;

  @Output() readonly dayHover = new EventEmitter<CandyDate>(); // Emitted when hover on a day by mouse enter
  @Output() readonly valueChange = new EventEmitter<CandyDate>();

  protected render(): void {
    if (this.value) {
      this.headRow = this.makeHeadRow();
      this.bodyRows = this.makeBodyRows();
    }
  }

  // trackByDateFn(_index: number, item: DateCell): string {
  //   return `${item.title}`;
  // }
  //
  // trackByWeekFn(_index: number, item: WeekRow): string {
  //   return `${item.year}-${item.weekNum}`;
  // }

  abstract makeHeadRow(): DateCell[];
  abstract makeBodyRows(): DateBodyRow[];

  ngOnInit(): void {
    this.render();
  }
}

export interface DateCell {
  value: Date;
  content: TemplateRef<Date> | string;
  label?: string;
  title?: string;
  cellRender?: TemplateRef<Date> | string;
  fullCellRender?: TemplateRef<Date> | string;
  isSelected?: boolean;
  isToday?: boolean;
  isDisabled?: boolean;
  // isSelectedStartDate?: boolean;
  // isSelectedEndDate?: boolean;
  // isInRange?: boolean;
  classMap?: object;
  onClick?(): void;
  onMouseEnter?(): void;
}

export interface DateBodyRow {
  isCurrent?: boolean; // Is the week that today stays in
  isActive?: boolean; // Is the week that current setting date stays in
  weekNum?: number;
  year?: number;
  classMap?: object;
  dateCells: DateCell[];
}
