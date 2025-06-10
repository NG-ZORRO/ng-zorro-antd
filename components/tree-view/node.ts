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
  EmbeddedViewRef,
  forwardRef,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';

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
    @if (indents.length) {
      <nz-tree-node-indents [indents]="indents"></nz-tree-node-indents>
    }
    <ng-content select="nz-tree-node-toggle, [nz-tree-node-toggle]"></ng-content>
    @if (indents.length && isLeaf) {
      <nz-tree-node-toggle class="nz-tree-leaf-line-icon" nzTreeNodeNoopToggle>
        <span class="ant-tree-switcher-leaf-line"></span>
      </nz-tree-node-toggle>
    }
    <ng-content select="nz-tree-node-checkbox"></ng-content>
    <ng-content select="nz-tree-node-option"></ng-content>
    <ng-content></ng-content>
  `,
  host: {
    class: 'ant-tree-treenode',
    '[class.ant-tree-treenode-switcher-open]': 'isExpanded',
    '[class.ant-tree-treenode-switcher-close]': '!isExpanded',
    '[class.ant-tree-treenode-selected]': 'selected',
    '[class.ant-tree-treenode-disabled]': 'disabled'
  },
  imports: [NzTreeNodeIndentsComponent, NzTreeNodeNoopToggleDirective]
})
export class NzTreeNodeComponent<T> extends NzNodeBase<T> implements OnInit {
  indents: boolean[] = [];
  disabled = false;
  selected = false;
  isLeaf = false;

  private cdr = inject(ChangeDetectorRef);

  override ngOnInit(): void {
    super.ngOnInit();
    this.isLeaf = !this._tree.treeControl?.isExpandable(this.data);
  }

  disable(): void {
    this.disabled = true;
  }

  enable(): void {
    this.disabled = false;
  }

  select(): void {
    this.selected = true;
  }

  deselect(): void {
    this.selected = false;
  }

  setIndents(indents: boolean[]): void {
    this.indents = indents;
    this.cdr.markForCheck();
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
  @Input('nzTreeNodeDefWhen') override when: (index: number, nodeData: T) => boolean = null!;
}

@Directive({
  selector: '[nzTreeVirtualScrollNodeOutlet]'
})
export class NzTreeVirtualScrollNodeOutletDirective<T> implements OnChanges {
  private _viewRef: EmbeddedViewRef<NzSafeAny> | null = null;
  private _viewContainerRef = inject(ViewContainerRef);
  @Input() data!: NzTreeVirtualNodeData<T>;
  @Input() compareBy?: ((value: T) => T | string | number) | null;

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
      return (
        this.innerCompareBy(ctxChange.previousValue?.data ?? null) !==
        this.innerCompareBy(ctxChange.currentValue?.data ?? null)
      );
    }
    return true;
  }

  get innerCompareBy(): (value: T | null) => T | string | number | null {
    return value => {
      if (value === null) return value;
      if (this.compareBy) return this.compareBy(value as T);
      return value;
    };
  }

  private updateExistingContext(ctx: NzSafeAny): void {
    for (const propName of Object.keys(ctx)) {
      this._viewRef!.context[propName] = (this.data.context as NzSafeAny)[propName];
    }
  }
}
