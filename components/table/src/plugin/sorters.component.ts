/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core';

@Component({
  selector: 'nz-table-sorters',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <span><ng-template [ngTemplateOutlet]="contentTemplate"></ng-template></span>
    <span class="ant-table-column-sorter ant-table-column-sorter-full">
      <span class="ant-table-column-sorter-inner">
        <i nz-icon nzType="caret-up" class="ant-table-column-sorter-up" [class.active]="nzSort == 'ascend'"></i>
        <i nz-icon nzType="caret-down" class="ant-table-column-sorter-down" [class.active]="nzSort == 'descend'"></i>
      </span>
    </span>
  `,
  host: {
    '[class.ant-table-column-sorters]': 'true'
  }
})
export class NzTableSortersComponent {
  @Input() nzSort: 'ascend' | 'descend' | null = null;
  @Input() contentTemplate: TemplateRef<NzSafeAny> | null = null;
}
