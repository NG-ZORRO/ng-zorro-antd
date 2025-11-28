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
export class NzTreeNodeIndentLineDirective<T> {
  private readonly treeNode = inject(NzNodeBase<T>);
  private readonly tree = inject(NzTreeView<T>);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  private preNodeRef: T | null = null;
  private nextNodeRef: T | null = null;
  private currentIndents: string = '';

  isLast: boolean | 'unset' = 'unset';

  get isLeaf(): boolean {
    return this.treeNode.isLeaf;
  }

  get dataNodes(): T[] {
    return this.tree.dataNodes;
  }

  get currentDataNode(): T {
    return this.treeNode.data;
  }

  constructor() {
    this.buildIndents();
    this.checkLast();

    /**
     * setting the indents can cause frame rate loss if it is set too often.
     */
    merge(this.treeNode._dataChanges, this.tree.dataSourceChanged$)
      .pipe(auditTime(0, BUILD_INDENTS_SCHEDULER), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.buildIndents();
        this.checkAdjacent();
        this.cdr.markForCheck();
      });
  }

  /**
   * The true and false in indents indicate whether there should be a vertical line to the left of the current node.
   * if there is no nextSibling, there is no vertical line.
   */
  private getIndents(): boolean[] {
    if (this.tree.levelAccessor) {
      return this.getIndentsForFlatData(this.dataNodes, this.currentDataNode, this.tree.levelAccessor);
    } else if (this.tree.childrenAccessor) {
      return this.getIndentsForNestedData(this.dataNodes, this.currentDataNode, this.tree.childrenAccessor);
    } else {
      return [];
    }
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
    if (this.currentDataNode) {
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
    let nodes = [] as T[];
    if (this.tree.levelAccessor) {
      nodes = this.dataNodes;
    } else if (this.tree.childrenAccessor) {
      nodes = flattenNestedNodes(this.dataNodes, this.tree.childrenAccessor);
    }
    this.checkAdjacentNodeChanged(nodes);
  }

  private checkAdjacentNodeChanged(nodes: T[]): void {
    const index = nodes.indexOf(this.currentDataNode);
    const preNode = nodes[index - 1] || null;
    const nextNode = nodes[index + 1] || null;
    if (this.nextNodeRef !== nextNode || this.preNodeRef !== preNode) {
      this.checkLast(index);
    }
    this.preNodeRef = preNode;
    this.nextNodeRef = nextNode;
  }

  private checkLast(index?: number): void {
    if (this.tree.levelAccessor) {
      this.isLast = !getNextSibling(this.dataNodes, this.currentDataNode, this.tree.levelAccessor, index);
    } else if (this.tree.childrenAccessor) {
      this.isLast = !getNextSiblingForNestedData(this.dataNodes, this.currentDataNode, this.tree.childrenAccessor);
    } else {
      return;
    }
  }
}
