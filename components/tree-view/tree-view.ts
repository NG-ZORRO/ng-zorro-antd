/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkTree } from '@angular/cdk/tree';
import { ChangeDetectionStrategy, Component, forwardRef, ViewChild, ViewEncapsulation } from '@angular/core';

import { NzAnimationTreeCollapseService } from 'ng-zorro-antd/core/animation';

import { NzTreeNodeOutletDirective } from './outlet';
import { NzTreeView } from './tree';

@Component({
  selector: 'nz-tree-view',
  exportAs: 'nzTreeView',
  imports: [NzTreeNodeOutletDirective],
  template: `
    <div class="ant-tree-list-holder">
      <div class="ant-tree-list-holder-inner">
        <ng-container nzTreeNodeOutlet></ng-container>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    NzAnimationTreeCollapseService,
    { provide: CdkTree, useExisting: forwardRef(() => NzTreeViewComponent) },
    { provide: NzTreeView, useExisting: forwardRef(() => NzTreeViewComponent) }
  ],
  host: {
    class: 'ant-tree',
    '[class.ant-tree-block-node]': 'nzDirectoryTree || nzBlockNode',
    '[class.ant-tree-directory]': 'nzDirectoryTree',
    '[class.ant-tree-rtl]': `dir() === 'rtl'`
  }
})
export class NzTreeViewComponent<T> extends NzTreeView<T> {
  @ViewChild(NzTreeNodeOutletDirective, { static: true }) nodeOutlet!: NzTreeNodeOutletDirective;
}
