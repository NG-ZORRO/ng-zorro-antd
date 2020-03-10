/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd';

@Component({
  selector: 'tr[nz-table-placeholder]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <td class="nz-disable-td ant-table-cell" [attr.colspan]="colspan">
      <div
        class="ant-table-expanded-row-fixed"
        *ngIf="enableAutoMeasure; else contentTemplate"
        style="position: sticky; left: 0px; overflow: hidden;"
        [style.width.px]="hostWidth"
      >
        <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
      </div>
    </td>
  `,
  host: {
    '[class.ant-table-placeholder]': 'true'
  }
})
export class NzTablePlaceholderComponent {
  @Input() contentTemplate: TemplateRef<NzSafeAny> | null = null;
  @Input() colspan: number | null = null;
  @Input() enableAutoMeasure = false;
  @Input() hostWidth: number | null = null;
}
