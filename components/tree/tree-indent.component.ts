/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'nz-tree-indent',
  exportAs: 'nzTreeIndent',
  template: ` <span *ngFor="let i of listOfUnit; let index = index" [ngClass]="unitMapOfClass(index)"></span> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[attr.aria-hidden]': 'true',
    '[class.ant-tree-indent]': '!nzSelectMode',
    '[class.ant-select-tree-indent]': 'nzSelectMode'
  }
})
export class NzTreeIndentComponent implements OnInit, OnChanges {
  @Input() nzTreeLevel?: number;
  @Input() nzIsStart?: boolean[];
  @Input() nzIsEnd?: boolean[];
  @Input() nzSelectMode = false;

  listOfUnit: number[] = [];

  unitMapOfClass(index: number): { [key: string]: boolean } {
    return {
      [`ant-tree-indent-unit`]: !this.nzSelectMode,
      [`ant-tree-indent-unit-start`]: !this.nzSelectMode && this.nzIsStart![index + 1],
      [`ant-tree-indent-unit-end`]: !this.nzSelectMode && this.nzIsEnd![index + 1],
      [`ant-select-tree-indent-unit`]: this.nzSelectMode,
      [`ant-select-tree-indent-unit-start`]: this.nzSelectMode && this.nzIsStart![index + 1],
      [`ant-select-tree-indent-unit-end`]: this.nzSelectMode && this.nzIsEnd![index + 1]
    };
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const { nzTreeLevel } = changes;
    if (nzTreeLevel) {
      this.listOfUnit = [...new Array(nzTreeLevel.currentValue || 0)];
    }
  }
}
