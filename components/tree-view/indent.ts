/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, Input, OnDestroy } from '@angular/core';
import { Subscription, animationFrameScheduler, asapScheduler, merge } from 'rxjs';
import { auditTime } from 'rxjs/operators';

import { NzNodeBase } from './node-base';
import { NzTreeView } from './tree';
import {
  flattenNestedNodes,
  getNextSibling,
  getNextSiblingForNestedData,
  getParent,
  getParentForNestedData
} from './utils';

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
export class NzTreeNodeIndentLineDirective<T> implements OnDestroy {
  isLast: boolean | 'unset' = 'unset';
  isLeaf = false;
  private preNodeRef: T | null = null;
  private nextNodeRef: T | null = null;
  private currentIndents: string = '';
  private changeSubscription: Subscription;

  constructor(
    private treeNode: NzNodeBase<T>,
    private tree: NzTreeView<T>,
    private cdr: ChangeDetectorRef
  ) {
    this.buildIndents();
    this.checkLast();

    /**
     * The dependent data (TreeControl.dataNodes) can be set after node instantiation,
     * and setting the indents can cause frame rate loss if it is set too often.
     */
    this.changeSubscription = merge(this.treeNode._dataChanges, tree._dataSourceChanged)
      .pipe(auditTime(0, BUILD_INDENTS_SCHEDULER))
      .subscribe(() => {
        this.buildIndents();
        this.checkAdjacent();
        this.cdr.markForCheck();
      });
  }

  // indents 中的 true 和 false 表示当前节点左侧是否应该有竖线，因为如果不存在 nextSibling，就不存在竖线
  private getIndents(): boolean[] {
    if (this.tree.treeControl) {
      return this.getIndentsForFlatData(
        this.tree.treeControl.dataNodes,
        this.treeNode.data,
        this.tree.treeControl.getLevel
      );
    } else if (this.tree.levelAccessor) {
      return this.getIndentsForFlatData(this.tree.dataNodes, this.treeNode.data, this.tree.levelAccessor);
    } else if (this.tree.childrenAccessor) {
      return this.getIndentsForNestedData(this.tree.dataNodes, this.treeNode.data, this.tree.childrenAccessor);
    }
    return [];
  }

  private getIndentsForFlatData(nodes: T[], node: T, getLevel: (dataNode: T) => number): boolean[] {
    const indents: boolean[] = [];
    let parent = getParent(nodes, node, getLevel);
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

  private getIndentsForNestedData(nodes: T[], node: T, getChildren: (dataNode: T) => T[]): boolean[] {
    const indents: boolean[] = [];
    let parent = getParentForNestedData(nodes, node, getChildren);
    while (parent) {
      const parentNextSibling = getNextSiblingForNestedData(nodes, parent, getChildren);
      if (parentNextSibling) {
        indents.unshift(true);
      } else {
        indents.unshift(false);
      }
      parent = getParentForNestedData(nodes, parent, getChildren);
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
   * We need to add a class name for the last child node,
   * this result can also be affected when the adjacent nodes are changed.
   */
  private checkAdjacent(): void {
    let nodes: T[] = [];
    if (this.tree.treeControl) {
      nodes = this.tree.treeControl.dataNodes || [];
    } else if (this.tree.levelAccessor) {
      nodes = this.tree.dataNodes || [];
    } else if (this.tree.childrenAccessor) {
      nodes = flattenNestedNodes(this.tree.dataNodes, this.tree.childrenAccessor) || [];
    }
    this.checkAdjacentNodeChanged(nodes);
  }

  private checkAdjacentNodeChanged(nodes: T[]): void {
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
    this.isLeaf = this.treeNode.isLeaf;
    if (this.tree.treeControl) {
      this.isLast = !getNextSibling(
        this.tree.treeControl.dataNodes || [],
        this.treeNode.data,
        this.tree.treeControl.getLevel,
        index
      );
    } else if (this.tree.levelAccessor) {
      this.isLast = !getNextSibling(this.tree.dataNodes || [], this.treeNode.data, this.tree.levelAccessor, index);
    } else if (this.tree.childrenAccessor) {
      this.isLast = !getNextSiblingForNestedData(
        this.tree.dataNodes || [],
        this.treeNode.data,
        this.tree.childrenAccessor
      );
    }
  }

  ngOnDestroy(): void {
    this.preNodeRef = null;
    this.nextNodeRef = null;
    this.changeSubscription.unsubscribe();
  }
}
