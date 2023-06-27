/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzTableLayout } from '../table.types';

@Component({
  selector: 'table[nz-table-content]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <colgroup>
      <col [style.width]="width" [style.minWidth]="width" *ngFor="let width of listOfColWidth" />
      <col *ngIf="hasVerticalScrollBar && scrollbarWidth" [style.width]="scrollbarWidth + 'px'" />
    </colgroup>
    <thead class="ant-table-thead" *ngIf="theadTemplate">
      <ng-template [ngTemplateOutlet]="theadTemplate"></ng-template>
    </thead>
    <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
    <ng-content></ng-content>
  `,
  host: {
    '[style.table-layout]': 'tableLayout',
    '[class.ant-table-fixed]': 'scrollX',
    '[style.width]': 'scrollX',
    '[style.min-width]': `scrollX ? '100%': null`
  }
})
export class NzTableContentComponent implements OnChanges {
  @Input() tableLayout: NzTableLayout = 'auto';
  @Input() theadTemplate: TemplateRef<NzSafeAny> | null = null;
  @Input() contentTemplate: TemplateRef<NzSafeAny> | null = null;
  @Input() listOfColWidth: ReadonlyArray<string | null> = [];
  @Input() hasVerticalScrollBar: boolean | null = null;
  @Input() scrollX: string | null = null;
  @Input() hasFixRight: boolean | null = null;
  @Input() scrollbarWidth: number = 0;

  constructor(private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { hasVerticalScrollBar, hasFixRight, theadTemplate } = changes;
    // If the table has vertical scrollbar, we should add an extra column to fix the width of table header.
    if (hasVerticalScrollBar || hasFixRight || theadTemplate) {
      if (this.hasVerticalScrollBar && this.hasFixRight !== null && this.theadTemplate) {
        const thead = this.theadTemplate!.createEmbeddedView(this).rootNodes;
        if (thead?.length) {
          const scrollBarCell = this.renderer.createElement('th');
          this.renderer.addClass(scrollBarCell, 'ant-table-cell');
          this.renderer.addClass(scrollBarCell, 'ant-table-cell-scrollbar');
          // If the table has fixed right column, we should add 'ant-table-cell-fix-right' class, set right to 0 and position to sticky.
          if (this.hasFixRight) {
            this.renderer.addClass(scrollBarCell, 'ant-table-cell-fix-right');
            this.renderer.setStyle(scrollBarCell, 'right', '0');
            this.renderer.setStyle(scrollBarCell, 'position', 'sticky');
          }
          // if the row num of table header is not equal to 1, we should add rowspan to the cell.
          if (thead.length > 1) {
            this.renderer.setAttribute(scrollBarCell, 'rowspan', `${thead.length}`);
          }
          this.renderer.appendChild(thead[0], scrollBarCell);
        }
      }
    }
  }
}
