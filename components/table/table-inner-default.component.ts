/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'nz-table-inner-default',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="ant-table-content">
      <table nz-table-inner [listOfColWidth]="listOfColWidth" [theadTemplate]="theadTemplate">
        <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
      </table>
    </div>
  `,
  host: {
    '[class.ant-table-container]': 'true'
  }
})
export class NzTableInnerDefaultComponent {
  @Input() listOfColWidth: string[] = [];
  @Input() theadTemplate: TemplateRef<NzSafeAny> | null = null;
  @Input() contentTemplate: TemplateRef<NzSafeAny> | null = null;
}
