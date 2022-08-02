/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { CdkTree, CdkTreeNodeOutletContext } from '@angular/cdk/tree';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  TrackByFunction,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { NzTreeVirtualNodeData } from './node';
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
          <ng-template nzTreeVirtualScrollNodeOutlet [data]="item"></ng-template>
        </ng-container>
      </cdk-virtual-scroll-viewport>
    </div>
    <ng-container nzTreeNodeOutlet></ng-container>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NzTreeView, useExisting: NzTreeVirtualScrollViewComponent },
    { provide: CdkTree, useExisting: NzTreeVirtualScrollViewComponent }
  ],
  host: {
    class: 'ant-tree',
    '[class.ant-tree-block-node]': 'nzDirectoryTree || nzBlockNode',
    '[class.ant-tree-directory]': 'nzDirectoryTree',
    '[class.ant-tree-rtl]': `dir === 'rtl'`
  }
})
export class NzTreeVirtualScrollViewComponent<T> extends NzTreeView<T> implements OnChanges {
  @ViewChild(NzTreeNodeOutletDirective, { static: true }) readonly nodeOutlet!: NzTreeNodeOutletDirective;
  @ViewChild(CdkVirtualScrollViewport, { static: true }) readonly virtualScrollViewport!: CdkVirtualScrollViewport;

  @Input() nzItemSize = DEFAULT_SIZE;
  @Input() nzMinBufferPx = DEFAULT_SIZE * 5;
  @Input() nzMaxBufferPx = DEFAULT_SIZE * 10;
  @Input() override trackBy!: TrackByFunction<T>;
  nodes: Array<NzTreeVirtualNodeData<T>> = [];
  innerTrackBy: TrackByFunction<NzTreeVirtualNodeData<T>> = i => i;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.trackBy) {
      if (typeof changes.trackBy.currentValue === 'function') {
        this.innerTrackBy = (index: number, n) => this.trackBy(index, n.data);
      } else {
        this.innerTrackBy = i => i;
      }
    }
  }

  override renderNodeChanges(data: T[] | readonly T[]): void {
    this.nodes = new Array(...data).map((n, i) => this.createNode(n, i));
    this._dataSourceChanged.next();
    this.changeDetectorRef.markForCheck();
  }

  private createNode(nodeData: T, index: number): NzTreeVirtualNodeData<T> {
    const node = this._getNodeDef(nodeData, index);
    const context = new CdkTreeNodeOutletContext<T>(nodeData);
    if (this.treeControl.getLevel) {
      context.level = this.treeControl.getLevel(nodeData);
    } else {
      context.level = 0;
    }
    return {
      data: nodeData,
      context,
      nodeDef: node
    };
  }
}
