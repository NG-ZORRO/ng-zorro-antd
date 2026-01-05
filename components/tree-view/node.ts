/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkTreeNode, CdkTreeNodeDef, CdkTreeNodeOutletContext } from '@angular/cdk/tree';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  Directive,
  effect,
  EmbeddedViewRef,
  forwardRef,
  inject,
  input,
  Input,
  OnDestroy,
  OnInit,
  signal,
  ViewContainerRef
} from '@angular/core';

import { NzAnimationTreeCollapseDirective } from 'ng-zorro-antd/core/animation';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzTreeNodeIndentsComponent } from './indent';
import { NzNodeBase } from './node-base';
import { NzTreeNodeNoopToggleDirective } from './toggle';

export interface NzTreeVirtualNodeData<T> {
  data: T;
  context: CdkTreeNodeOutletContext<T>;
  nodeDef: CdkTreeNodeDef<T>;
}

@Component({
  selector: 'nz-tree-node:not([builtin])',
  exportAs: 'nzTreeNode',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CdkTreeNode,
      useExisting: forwardRef(() => NzTreeNodeComponent)
    },
    {
      provide: NzNodeBase,
      useExisting: forwardRef(() => NzTreeNodeComponent)
    }
  ],
  template: `
    @if (indents().length) {
      <nz-tree-node-indents [indents]="indents()"></nz-tree-node-indents>
    }
    <ng-content select="nz-tree-node-toggle, [nz-tree-node-toggle]"></ng-content>
    @if (indents().length && isLeaf) {
      <nz-tree-node-toggle class="nz-tree-leaf-line-icon" nzTreeNodeNoopToggle>
        <span class="ant-tree-switcher-leaf-line"></span>
      </nz-tree-node-toggle>
    }
    <ng-content select="nz-tree-node-checkbox"></ng-content>
    <ng-content select="nz-tree-node-option"></ng-content>
    <ng-content></ng-content>
  `,
  hostDirectives: [NzAnimationTreeCollapseDirective],
  host: {
    class: 'ant-tree-treenode',
    '[class.ant-tree-treenode-switcher-open]': 'isExpanded',
    '[class.ant-tree-treenode-switcher-close]': '!isExpanded',
    '[class.ant-tree-treenode-selected]': 'selected()',
    '[class.ant-tree-treenode-disabled]': 'disabled()'
  },
  imports: [NzTreeNodeIndentsComponent, NzTreeNodeNoopToggleDirective]
})
export class NzTreeNodeComponent<T> extends NzNodeBase<T> implements OnDestroy, OnInit {
  // Used to determine whether it is a leaf node
  @Input({ alias: 'nzExpandable', transform: booleanAttribute })
  override get isExpandable(): boolean {
    return super.isExpandable;
  }
  override set isExpandable(value: boolean) {
    super.isExpandable = value;
  }

  indents = signal<boolean[]>([]);
  disabled = signal(false);
  selected = signal(false);

  get isLeaf(): boolean {
    return !this.isExpandable;
  }

  disable(): void {
    this.disabled.set(true);
  }

  enable(): void {
    this.disabled.set(false);
  }

  select(): void {
    this.selected.set(true);
  }

  deselect(): void {
    this.selected.set(false);
  }

  setIndents(indents: boolean[]): void {
    this.indents.set(indents);
  }
}

@Directive({
  selector: '[nzTreeNodeDef]',
  providers: [
    {
      provide: CdkTreeNodeDef,
      useExisting: forwardRef(() => NzTreeNodeDefDirective)
    }
  ]
})
export class NzTreeNodeDefDirective<T> extends CdkTreeNodeDef<T> {
  @Input({ alias: 'nzTreeNodeDefWhen' }) override when: (index: number, nodeData: T) => boolean = null!;
}

@Directive({
  selector: '[nzTreeVirtualScrollNodeOutlet]'
})
export class NzTreeVirtualScrollNodeOutletDirective<T> {
  readonly data = input.required<NzTreeVirtualNodeData<T>>();
  readonly compareBy = input.required<(value: T) => NzSafeAny>();

  private readonly _viewContainerRef = inject(ViewContainerRef);
  private _viewRef: EmbeddedViewRef<NzSafeAny> | null = null;
  private _previousData: NzTreeVirtualNodeData<T> | null = null;

  constructor() {
    effect(() => {
      const currentData = this.data();

      const recreateView = this.shouldRecreateView(this._previousData, currentData, this.compareBy());
      if (recreateView) {
        const viewContainerRef = this._viewContainerRef;

        if (this._viewRef) {
          viewContainerRef.remove(viewContainerRef.indexOf(this._viewRef));
        }

        this._viewRef = currentData
          ? viewContainerRef.createEmbeddedView(currentData.nodeDef.template, currentData.context)
          : null;

        if (CdkTreeNode.mostRecentTreeNode && this._viewRef) {
          CdkTreeNode.mostRecentTreeNode.data = currentData.data;
        }
      } else if (this._viewRef && currentData.context) {
        this.updateExistingContext(currentData.context);
      }

      // Save the current value as the previous value for the next iteration
      this._previousData = currentData;
    });
  }

  private shouldRecreateView(
    previousData: NzTreeVirtualNodeData<T> | null,
    currentData: NzTreeVirtualNodeData<T>,
    compareByFn: (value: T) => NzSafeAny
  ): boolean {
    const prevCtxKeys = Object.keys(previousData || {});
    const currCtxKeys = Object.keys(currentData || {});

    if (prevCtxKeys.length === currCtxKeys.length) {
      for (const propName of currCtxKeys) {
        if (prevCtxKeys.indexOf(propName) === -1) {
          return true;
        }
      }
      return compareByFn((previousData?.data ?? null) as T) !== compareByFn((currentData?.data ?? null) as T);
    }
    return true;
  }

  private updateExistingContext(ctx: CdkTreeNodeOutletContext<T>): void {
    for (const [key, value] of Object.entries(ctx)) {
      this._viewRef!.context[key] = value;
    }
  }
}
