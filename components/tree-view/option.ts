/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';

import { NzTreeNodeComponent } from './node';

@Component({
  selector: 'nz-tree-node-option',
  template: `
    <span class="ant-tree-title"><ng-content></ng-content></span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ant-tree-node-content-wrapper',
    '[class.ant-tree-node-content-wrapper-open]': 'isExpanded',
    '[class.ant-tree-node-selected]': 'nzSelected',
    '(click)': 'onClick($event)'
  }
})
export class NzTreeNodeOptionComponent<T> implements OnChanges {
  static ngAcceptInputType_nzSelected: BooleanInput;
  static ngAcceptInputType_nzDisabled: BooleanInput;

  @Input() @InputBoolean() nzSelected = false;
  @Input() @InputBoolean() nzDisabled = false;
  @Output() readonly nzClick = new EventEmitter<MouseEvent>();

  constructor(private treeNode: NzTreeNodeComponent<T>) {}

  get isExpanded(): boolean {
    return this.treeNode.isExpanded;
  }

  onClick(e: MouseEvent): void {
    if (!this.nzDisabled) {
      this.nzClick.emit(e);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzDisabled, nzSelected } = changes;
    if (nzDisabled) {
      if (nzDisabled.currentValue) {
        this.treeNode.disable();
      } else {
        this.treeNode.enable();
      }
    }

    if (nzSelected) {
      if (nzSelected.currentValue) {
        this.treeNode.select();
      } else {
        this.treeNode.deselect();
      }
    }
  }
}
