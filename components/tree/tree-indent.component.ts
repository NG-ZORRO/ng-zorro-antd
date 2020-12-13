/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'nz-tree-indent',
  exportAs: 'nzTreeIndent',
  template: `
    <span
      [class.ant-tree-indent-unit]="!nzSelectMode"
      [class.ant-select-tree-indent-unit]="nzSelectMode"
      [class.ant-select-tree-indent-unit-start]="nzSelectMode && nzIsStart[i]"
      [class.ant-tree-indent-unit-start]="!nzSelectMode && nzIsStart[i]"
      [class.ant-select-tree-indent-unit-end]="nzSelectMode && nzIsEnd[i]"
      [class.ant-tree-indent-unit-end]="!nzSelectMode && nzIsEnd[i]"
      *ngFor="let _ of listOfUnit; let i = index"
    ></span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[attr.aria-hidden]': 'true',
    '[class.ant-tree-indent]': '!nzSelectMode',
    '[class.ant-select-tree-indent]': 'nzSelectMode'
  }
})
export class NzTreeIndentComponent implements OnInit, OnChanges {
  @Input() nzTreeLevel = 0;
  @Input() nzIsStart: boolean[] = [];
  @Input() nzIsEnd: boolean[] = [];
  @Input() nzSelectMode = false;

  listOfUnit: number[] = [];

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const { nzTreeLevel } = changes;
    if (nzTreeLevel) {
      this.listOfUnit = [...new Array(nzTreeLevel.currentValue || 0)];
    }
  }
}
