/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkTreeNode, CdkTreeNodeDef, CdkTreeNodeOutletContext } from '@angular/cdk/tree';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChange,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';
import { animationFrameScheduler, asapScheduler, merge, Subscription } from 'rxjs';
import { auditTime } from 'rxjs/operators';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzTreeView } from './tree';
import { getNextSibling, getParent } from './utils';

/**
 * [true, false, false, true] => 1001
 */
function booleanArrayToString(arr: boolean[]): string {
  return arr.map(i => (i ? 1 : 0)).join('');
}

const BUILD_INDENTS_SCHEDULER = typeof requestAnimationFrame !== 'undefined' ? animationFrameScheduler : asapScheduler;

export interface NzTreeVirtualNodeData<T> {
  data: T;
  context: CdkTreeNodeOutletContext<T>;
  nodeDef: CdkTreeNodeDef<T>;
}

@Component({
  selector: 'nz-tree-node:not([builtin])',
  exportAs: 'nzTreeNode',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: CdkTreeNode, useExisting: NzTreeNodeComponent }],
  template: `
    <nz-tree-node-indents [indents]="indents" *ngIf="indents.length"></nz-tree-node-indents>
    <ng-content select="nz-tree-node-toggle, [nz-tree-node-toggle]"></ng-content>
    <nz-tree-node-toggle class="nz-tree-leaf-line-icon" *ngIf="indents.length && isLeaf" nzTreeNodeNoopToggle>
      <span class="ant-tree-switcher-leaf-line"></span>
    </nz-tree-node-toggle>
    <ng-content select="nz-tree-node-checkbox"></ng-content>
    <ng-content select="nz-tree-node-option"></ng-content>
    <ng-content></ng-content>
  `,
  host: {
    '[class.ant-tree-treenode-switcher-open]': 'isExpanded',
    '[class.ant-tree-treenode-switcher-close]': '!isExpanded'
  }
})
export class NzTreeNodeComponent<T> extends CdkTreeNode<T> implements OnDestroy, OnInit {
  indents: boolean[] = [];
  disabled = false;
  selected = false;
  isLeaf = false;

  constructor(
    protected elementRef: ElementRef<HTMLElement>,
    protected tree: NzTreeView<T>,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {
    super(elementRef, tree);
    this._elementRef.nativeElement.classList.add('ant-tree-treenode');
  }

  ngOnInit(): void {
    this.isLeaf = !this.tree.treeControl.isExpandable(this.data);
  }

  disable(): void {
    this.disabled = true;
    this.updateDisabledClass();
  }

  enable(): void {
    this.disabled = false;
    this.updateDisabledClass();
  }

  select(): void {
    this.selected = true;
    this.updateSelectedClass();
  }

  deselect(): void {
    this.selected = false;
    this.updateSelectedClass();
  }

  setIndents(indents: boolean[]): void {
    this.indents = indents;
    this.cdr.markForCheck();
  }

  private updateSelectedClass(): void {
    if (this.selected) {
      this.renderer.addClass(this.elementRef.nativeElement, 'ant-tree-treenode-selected');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'ant-tree-treenode-selected');
    }
  }

  private updateDisabledClass(): void {
    if (this.disabled) {
      this.renderer.addClass(this.elementRef.nativeElement, 'ant-tree-treenode-disabled');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'ant-tree-treenode-disabled');
    }
  }
}

@Directive({
  selector: '[nzTreeNodeDef]',
  providers: [{ provide: CdkTreeNodeDef, useExisting: NzTreeNodeDefDirective }]
})
export class NzTreeNodeDefDirective<T> extends CdkTreeNodeDef<T> {
  @Input('nzTreeNodeDefWhen') when!: (index: number, nodeData: T) => boolean;
}

@Directive({
  selector: '[nzTreeVirtualScrollNodeOutlet]'
})
export class NzTreeVirtualScrollNodeOutletDirective<T> implements OnChanges {
  private _viewRef: EmbeddedViewRef<NzSafeAny> | null = null;
  @Input() data!: NzTreeVirtualNodeData<T>;

  constructor(private _viewContainerRef: ViewContainerRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const recreateView = this.shouldRecreateView(changes);
    if (recreateView) {
      const viewContainerRef = this._viewContainerRef;

      if (this._viewRef) {
        viewContainerRef.remove(viewContainerRef.indexOf(this._viewRef));
      }

      this._viewRef = this.data
        ? viewContainerRef.createEmbeddedView(this.data.nodeDef.template, this.data.context)
        : null;

      if (CdkTreeNode.mostRecentTreeNode && this._viewRef) {
        CdkTreeNode.mostRecentTreeNode.data = this.data.data;
      }
    } else if (this._viewRef && this.data.context) {
      this.updateExistingContext(this.data.context);
    }
  }

  private shouldRecreateView(changes: SimpleChanges): boolean {
    const ctxChange = changes.data;
    return ctxChange && this.hasContextShapeChanged(ctxChange);
  }

  private hasContextShapeChanged(ctxChange: SimpleChange): boolean {
    const prevCtxKeys = Object.keys(ctxChange.previousValue || {});
    const currCtxKeys = Object.keys(ctxChange.currentValue || {});

    if (prevCtxKeys.length === currCtxKeys.length) {
      for (const propName of currCtxKeys) {
        if (prevCtxKeys.indexOf(propName) === -1) {
          return true;
        }
      }
      return false;
    }
    return true;
  }

  private updateExistingContext(ctx: NzSafeAny): void {
    for (const propName of Object.keys(ctx)) {
      this._viewRef!.context[propName] = (this.data.context as NzSafeAny)[propName];
    }
  }
}

@Component({
  selector: 'nz-tree-node-indents',
  template: `
    <span class="ant-tree-indent-unit" [class.ant-tree-indent-unit-end]="!isEnd" *ngFor="let isEnd of indents"></span>
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

  constructor(private treeNode: NzTreeNodeComponent<T>, private tree: NzTreeView<T>, private cdr: ChangeDetectorRef) {
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

  private getIndents(): boolean[] {
    const indents = [];
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
    const nodes = this.tree.treeControl.dataNodes;
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
    const nodes = this.tree.treeControl.dataNodes;
    this.isLeaf = this.treeNode.isLeaf;
    this.isLast = !getNextSibling(nodes, this.treeNode.data, this.tree.treeControl.getLevel, index);
  }

  ngOnDestroy(): void {
    this.preNodeRef = null;
    this.nextNodeRef = null;
    this.changeSubscription.unsubscribe();
  }
}
