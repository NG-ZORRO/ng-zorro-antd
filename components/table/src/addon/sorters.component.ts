/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzTableSortOrder } from '../table.types';

@Component({
  selector: 'nz-table-sorters',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <span class="ant-table-column-title"><ng-template [ngTemplateOutlet]="contentTemplate" /></span>
    <span class="ant-table-column-sorter" [class.ant-table-column-sorter-full]="isDown && isUp">
      <span class="ant-table-column-sorter-inner">
        @if (isUp) {
          <nz-icon nzType="caret-up" class="ant-table-column-sorter-up" [class.active]="sortOrder === 'ascend'" />
        }
        @if (isDown) {
          <nz-icon nzType="caret-down" class="ant-table-column-sorter-down" [class.active]="sortOrder === 'descend'" />
        }
      </span>
    </span>
  `,
  host: {
    class: 'ant-table-column-sorters'
  },
  imports: [NzIconModule, NgTemplateOutlet]
})
export class NzTableSortersComponent implements OnChanges {
  @Input() sortDirections: NzTableSortOrder[] = ['ascend', 'descend', null];
  @Input() sortOrder: NzTableSortOrder = null;
  @Input() contentTemplate: TemplateRef<NzSafeAny> | null = null;
  isUp = false;
  isDown = false;

  ngOnChanges(changes: SimpleChanges): void {
    const { sortDirections } = changes;
    if (sortDirections) {
      this.isUp = this.sortDirections.indexOf('ascend') !== -1;
      this.isDown = this.sortDirections.indexOf('descend') !== -1;
    }
  }
}
