/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzTableLayout } from '../table.types';
import { NzTableContentComponent } from './table-content.component';

@Component({
  selector: 'nz-table-inner-default',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="ant-table-content">
      <table
        nz-table-content
        [contentTemplate]="contentTemplate"
        [tableLayout]="tableLayout"
        [listOfColWidth]="listOfColWidth"
        [theadTemplate]="theadTemplate"
        [tfootTemplate]="tfootTemplate"
      ></table>
    </div>
  `,
  host: { class: 'ant-table-container' },
  imports: [NzTableContentComponent]
})
export class NzTableInnerDefaultComponent {
  @Input() tableLayout: NzTableLayout = 'auto';
  @Input() listOfColWidth: ReadonlyArray<string | null> = [];
  @Input() theadTemplate: TemplateRef<NzSafeAny> | null = null;
  @Input() contentTemplate: TemplateRef<NzSafeAny> | null = null;
  @Input() tfootTemplate: TemplateRef<NzSafeAny> | null = null;
}
