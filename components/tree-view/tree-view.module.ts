/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';

import { NzTreeNodeCheckboxComponent } from './checkbox.component';
import { NzTreeNodeIndentLineDirective, NzTreeNodeIndentsComponent } from './indent.component';
import { NzTreeNodeComponent, NzTreeNodeDefDirective, NzTreeVirtualScrollNodeOutletDirective } from './node.component';
import { NzTreeNodeOptionComponent } from './option.component';
import { NzTreeNodeOutletDirective } from './outlet.directive';
import { NzTreeNodePaddingDirective } from './padding.directive';
import {
  NzTreeNodeNoopToggleDirective,
  NzTreeNodeToggleActiveIconDirective,
  NzTreeNodeToggleDirective,
  NzTreeNodeToggleRotateIconDirective
} from './toggle.component';
import { NzTreeViewComponent } from './tree-view.component';
import { NzTreeVirtualScrollViewComponent } from './tree-virtual-scroll-view.component';
import { NzTreeView } from './tree.component';

const treeWithControlComponents = [
  NzTreeView,
  NzTreeNodeOutletDirective,
  NzTreeViewComponent,
  NzTreeNodeDefDirective,
  NzTreeNodeComponent,
  NzTreeNodeToggleDirective,
  NzTreeNodePaddingDirective,
  NzTreeNodeToggleRotateIconDirective,
  NzTreeNodeToggleActiveIconDirective,
  NzTreeNodeOptionComponent,
  NzTreeNodeNoopToggleDirective,
  NzTreeNodeCheckboxComponent,
  NzTreeNodeIndentsComponent,
  NzTreeVirtualScrollViewComponent,
  NzTreeVirtualScrollNodeOutletDirective,
  NzTreeNodeIndentLineDirective
];

@NgModule({
  imports: [BidiModule, CommonModule, NzNoAnimationModule, ScrollingModule],
  declarations: [treeWithControlComponents],
  exports: [treeWithControlComponents]
})
export class NzTreeViewModule {}
