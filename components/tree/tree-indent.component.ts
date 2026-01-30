/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'nz-tree-indent',
  exportAs: 'nzTreeIndent',
  template: `
    @for (_ of listOfUnit; track $index) {
      <span
        [class.ant-tree-indent-unit]="!nzSelectMode"
        [class.ant-select-tree-indent-unit]="nzSelectMode"
        [class.ant-select-tree-indent-unit-start]="nzSelectMode && nzIsStart[$index]"
        [class.ant-tree-indent-unit-start]="!nzSelectMode && nzIsStart[$index]"
        [class.ant-select-tree-indent-unit-end]="nzSelectMode && nzIsEnd[$index]"
        [class.ant-tree-indent-unit-end]="!nzSelectMode && nzIsEnd[$index]"
      ></span>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.aria-hidden]': 'true',
    '[class.ant-tree-indent]': '!nzSelectMode',
    '[class.ant-select-tree-indent]': 'nzSelectMode'
  }
})
export class NzTreeIndentComponent implements OnChanges {
  @Input() nzTreeLevel = 0;
  @Input() nzIsStart: boolean[] = [];
  @Input() nzIsEnd: boolean[] = [];
  @Input() nzSelectMode = false;

  listOfUnit: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    const { nzTreeLevel } = changes;
    if (nzTreeLevel) {
      this.listOfUnit = [...new Array(nzTreeLevel.currentValue || 0)];
    }
  }
}
