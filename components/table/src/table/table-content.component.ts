/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzTableLayout } from '../table.types';

@Component({
  selector: 'table[nz-table-content]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    @for (width of listOfColWidth; track width) {
      <col [style.width]="width" [style.minWidth]="width" />
    }
    @if (theadTemplate) {
      <thead class="ant-table-thead">
        <ng-template [ngTemplateOutlet]="theadTemplate"></ng-template>
      </thead>
    }
    <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
    <ng-content></ng-content>
  `,
  host: {
    '[style.table-layout]': 'tableLayout',
    '[class.ant-table-fixed]': 'scrollX',
    '[style.width]': 'scrollX',
    '[style.min-width]': `scrollX ? '100%' : null`
  },
  imports: [NgTemplateOutlet],
  standalone: true
})
export class NzTableContentComponent {
  @Input() tableLayout: NzTableLayout = 'auto';
  @Input() theadTemplate: TemplateRef<NzSafeAny> | null = null;
  @Input() contentTemplate: TemplateRef<NzSafeAny> | null = null;
  @Input() listOfColWidth: ReadonlyArray<string | null> = [];
  @Input() scrollX: string | null = null;
}
