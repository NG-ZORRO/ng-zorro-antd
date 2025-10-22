/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Directive,
  inject,
  Input
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { animationFrameScheduler, asapScheduler, merge } from 'rxjs';
import { auditTime } from 'rxjs/operators';

import { NzNodeBase } from './node-base';
import { NzTreeView } from './tree';
import { getNextSibling, getParent } from './utils';

/**
 * [true, false, false, true] => 1001
 */
function booleanArrayToString(arr: boolean[]): string {
  return arr.map(i => (i ? 1 : 0)).join('');
}

const BUILD_INDENTS_SCHEDULER = typeof requestAnimationFrame !== 'undefined' ? animationFrameScheduler : asapScheduler;

@Component({
  selector: 'nz-tree-node-indents',
  template: `
    @for (isEnd of indents; track isEnd) {
      <span class="ant-tree-indent-unit" [class.ant-tree-indent-unit-end]="!isEnd"></span>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ant-tree-indent'
  }
})
export class NzTreeNodeIndentsComponent {
  @Input() indents: boolean[] = [];
}

@Directive({
  selector: 'nz-tree-node[nzTreeNodeIndentLine]',
  host: {
    class: 'ant-tree-show-line',
    '[class.ant-tree-treenode-leaf-last]': 'isLast && isLeaf'
  }
})
export class NzTreeNodeIndentLineDirective<T> {
  private treeNode = inject(NzNodeBase<T>);
  private tree = inject(NzTreeView<T>);
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  isLast: boolean | 'unset' = 'unset';
  isLeaf = false;
  private preNodeRef: T | null = null;
  private nextNodeRef: T | null = null;
  private currentIndents: string = '';

  constructor() {
    this.buildIndents();
    this.checkLast();

    /**
     * The dependent data (TreeControl.dataNodes) can be set after node instantiation,
     * and setting the indents can cause frame rate loss if it is set too often.
     */
    merge(this.treeNode._dataChanges, this.tree._dataSourceChanged)
      .pipe(auditTime(0, BUILD_INDENTS_SCHEDULER), takeUntilDestroyed())
      .subscribe(() => {
        this.buildIndents();
        this.checkAdjacent();
        this.cdr.markForCheck();
      });

    this.destroyRef.onDestroy(() => {
      this.preNodeRef = null;
      this.nextNodeRef = null;
    });
  }

  private getIndents(): boolean[] {
    const indents: boolean[] = [];
    if (!this.tree.treeControl) {
      return indents;
    }

    const nodes = this.tree.treeControl.dataNodes;
    const getLevel = this.tree.treeControl.getLevel;
    let parent = getParent(nodes, this.treeNode.data, getLevel);
    while (parent) {
      const parentNextSibling = getNextSibling(nodes, parent, getLevel);
      if (parentNextSibling) {
        indents.unshift(true);
      } else {
        indents.unshift(false);
      }
      parent = getParent(nodes, parent, getLevel);
    }
    return indents;
  }

  private buildIndents(): void {
    if (this.treeNode.data) {
      const indents = this.getIndents();
      const diffString = booleanArrayToString(indents);
      if (diffString !== this.currentIndents) {
        this.treeNode.setIndents(this.getIndents());
        this.currentIndents = diffString;
      }
    }
  }

  /**
   * We need to add an class name for the last child node,
   * this result can also be affected when the adjacent nodes are changed.
   */
  private checkAdjacent(): void {
    const nodes = this.tree.treeControl?.dataNodes || [];
    const index = nodes.indexOf(this.treeNode.data);
    const preNode = nodes[index - 1] || null;
    const nextNode = nodes[index + 1] || null;
    if (this.nextNodeRef !== nextNode || this.preNodeRef !== preNode) {
      this.checkLast(index);
    }
    this.preNodeRef = preNode;
    this.nextNodeRef = nextNode;
  }

  private checkLast(index?: number): void {
    const nodes = this.tree.treeControl?.dataNodes || [];
    this.isLeaf = this.treeNode.isLeaf;
    this.isLast =
      !!this.tree.treeControl && !getNextSibling(nodes, this.treeNode.data, this.tree.treeControl.getLevel, index);
  }
}
