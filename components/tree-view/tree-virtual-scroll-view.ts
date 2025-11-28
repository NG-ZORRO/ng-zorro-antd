/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { CdkTree, CdkTreeNodeOutletContext } from '@angular/cdk/tree';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  OnChanges,
  SimpleChanges,
  TrackByFunction,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzTreeVirtualNodeData, NzTreeVirtualScrollNodeOutletDirective } from './node';
import { NzTreeNodeOutletDirective } from './outlet';
import { NzTreeView } from './tree';

const DEFAULT_SIZE = 28;

@Component({
  selector: 'nz-tree-virtual-scroll-view',
  exportAs: 'nzTreeVirtualScrollView',
  template: `
    <div class="ant-tree-list">
      <cdk-virtual-scroll-viewport
        class="ant-tree-list-holder"
        [itemSize]="nzItemSize"
        [minBufferPx]="nzMinBufferPx"
        [maxBufferPx]="nzMaxBufferPx"
      >
        <ng-container *cdkVirtualFor="let item of nodes; let i = index; trackBy: innerTrackBy">
          <ng-template nzTreeVirtualScrollNodeOutlet [data]="item" [compareBy]="compareBy(i)"></ng-template>
        </ng-container>
      </cdk-virtual-scroll-viewport>
    </div>
    <ng-container nzTreeNodeOutlet></ng-container>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NzTreeView, useExisting: forwardRef(() => NzTreeVirtualScrollViewComponent) },
    { provide: CdkTree, useExisting: forwardRef(() => NzTreeVirtualScrollViewComponent) }
  ],
  host: {
    class: 'ant-tree',
    '[class.ant-tree-block-node]': 'nzDirectoryTree || nzBlockNode',
    '[class.ant-tree-directory]': 'nzDirectoryTree',
    '[class.ant-tree-rtl]': `dir() === 'rtl'`
  },
  imports: [
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
    CdkVirtualScrollViewport,
    NzTreeNodeOutletDirective,
    NzTreeVirtualScrollNodeOutletDirective
  ]
})
export class NzTreeVirtualScrollViewComponent<T> extends NzTreeView<T> implements OnChanges {
  @ViewChild(NzTreeNodeOutletDirective, { static: true }) override readonly _nodeOutlet: NzTreeNodeOutletDirective =
    undefined!;
  @ViewChild(CdkVirtualScrollViewport, { static: true }) readonly virtualScrollViewport!: CdkVirtualScrollViewport;

  @Input() nzItemSize = DEFAULT_SIZE;
  @Input() nzMinBufferPx = DEFAULT_SIZE * 5;
  @Input() nzMaxBufferPx = DEFAULT_SIZE * 10;

  nodes: Array<NzTreeVirtualNodeData<T>> = [];

  innerTrackBy: TrackByFunction<NzTreeVirtualNodeData<T>> = i => i;

  ngOnChanges({ trackBy }: SimpleChanges): void {
    if (trackBy) {
      if (typeof trackBy.currentValue === 'function') {
        this.innerTrackBy = (index: number, n) => this.trackBy(index, n.data);
      } else {
        this.innerTrackBy = i => i;
      }
    }
  }

  compareBy(index: number): (value: T) => NzSafeAny {
    return (value: T) => (this.trackBy ? this.trackBy(index, value) : value);
  }

  override renderNodeChanges(data: T[]): void {
    /* https://github.com/angular/components/blob/21cc21ea3b280c3f82a19f5ec1b679eb1eee1358/src/cdk/tree/tree.ts#L1103
     * If levelAccessor is used, renderNodes needs to be recalculated, because flattenData (i.e., dataNodes) is used as renderNodes by default in the @angular/components library
     * If childrenAccessor is used, @angular/components library inner will calculate renderNodes.
     */
    const renderNodes = this.levelAccessor ? this.getRenderNodes(data) : [...data];
    this.nodes = renderNodes.map((n, i) => this.createNode(n, i));
    this.dataSourceChanged$.next();
    this.cdr.markForCheck();
  }

  private createNode(nodeData: T, index: number): NzTreeVirtualNodeData<T> {
    const node = this._getNodeDef(nodeData, index);
    const context = new CdkTreeNodeOutletContext<T>(nodeData);
    return {
      data: nodeData,
      context,
      nodeDef: node
    };
  }
}
