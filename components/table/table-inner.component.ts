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
  selector: 'table[nz-table-inner]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <col [style.width]="width" [style.minWidth]="width" *ngFor="let width of listOfColWidth" />
    <thead class="ant-table-thead" *ngIf="!hideThead && theadTemplate">
      <ng-template [ngTemplateOutlet]="theadTemplate"></ng-template>
    </thead>
    <ng-content></ng-content>
  `,
  host: {
    '[class.ant-table-fixed]': 'scroll.x',
    '[style.width]': 'scroll.x'
  }
})
export class NzTableInnerComponent {
  @Input() theadTemplate: TemplateRef<NzSafeAny> | null = null;
  @Input() listOfColWidth: string[] = [];
  @Input() hideThead = false;
  @Input() scroll: { x?: string | null; y?: string | null } = { x: null, y: null };
}
