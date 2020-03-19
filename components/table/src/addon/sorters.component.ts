/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzSortOrderType } from '../table.types';

@Component({
  selector: 'nz-table-sorters',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <span><ng-template [ngTemplateOutlet]="contentTemplate"></ng-template></span>
    <span class="ant-table-column-sorter" [class.ant-table-column-sorter-full]="showSorterDown && showSorterUp">
      <span class="ant-table-column-sorter-inner">
        <i nz-icon nzType="caret-up" *ngIf="showSorterUp" class="ant-table-column-sorter-up" [class.active]="sortOrder == 'ascend'"></i>
        <i
          nz-icon
          nzType="caret-down"
          *ngIf="showSorterDown"
          class="ant-table-column-sorter-down"
          [class.active]="sortOrder == 'descend'"
        ></i>
      </span>
    </span>
  `,
  host: {
    '[class.ant-table-column-sorters]': 'true'
  }
})
export class NzTableSortersComponent implements OnChanges {
  @Input() sortDirections: NzSortOrderType[] = ['ascend', 'descend', null];
  @Input() sortOrder: NzSortOrderType = null;
  @Input() contentTemplate: TemplateRef<NzSafeAny> | null = null;
  showSorterUp = false;
  showSorterDown = false;
  ngOnChanges(changes: SimpleChanges): void {
    const { sortDirections } = changes;
    if (sortDirections) {
      this.showSorterUp = this.sortDirections.indexOf('ascend') !== -1;
      this.showSorterDown = this.sortDirections.indexOf('descend') !== -1;
    }
  }
}
