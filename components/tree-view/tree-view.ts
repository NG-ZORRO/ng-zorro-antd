/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkTree } from '@angular/cdk/tree';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { treeCollapseMotion } from 'ng-zorro-antd/core/animation';

import { NzTreeNodeOutletDirective } from './outlet';
import { NzTreeView } from './tree';

@Component({
  selector: 'nz-tree-view',
  exportAs: 'nzTreeView',
  template: `
    <div class="ant-tree-list-holder">
      <div
        [@.disabled]="!_afterViewInit || !!noAnimation?.nzNoAnimation"
        [@treeCollapseMotion]="_nodeOutlet.viewContainer.length"
        class="ant-tree-list-holder-inner"
      >
        <ng-container nzTreeNodeOutlet></ng-container>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: CdkTree, useExisting: forwardRef(() => NzTreeViewComponent) },
    { provide: NzTreeView, useExisting: forwardRef(() => NzTreeViewComponent) }
  ],
  host: {
    class: 'ant-tree',
    '[class.ant-tree-block-node]': 'nzDirectoryTree || nzBlockNode',
    '[class.ant-tree-directory]': 'nzDirectoryTree',
    '[class.ant-tree-rtl]': `dir === 'rtl'`
  },
  animations: [treeCollapseMotion],
  imports: [NzTreeNodeOutletDirective]
})
export class NzTreeViewComponent<T> extends NzTreeView<T> implements AfterViewInit {
  @ViewChild(NzTreeNodeOutletDirective, { static: true }) nodeOutlet!: NzTreeNodeOutletDirective;
  _afterViewInit = false;

  override ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this._afterViewInit = true;
      this.cdr.markForCheck();
    });
  }
}
