/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzTreeDropIndicatorComponent } from './tree-drop-indicator.component';
import { NzTreeIndentComponent } from './tree-indent.component';
import { NzTreeNodeBuiltinCheckboxComponent } from './tree-node-checkbox.component';
import { NzTreeNodeSwitcherComponent } from './tree-node-switcher.component';
import { NzTreeNodeTitleComponent } from './tree-node-title.component';
import { NzTreeNodeBuiltinComponent } from './tree-node.component';
import { NzTreeComponent } from './tree.component';

@NgModule({
  imports: [
    NzTreeComponent,
    NzTreeNodeBuiltinComponent,
    NzTreeIndentComponent,
    NzTreeNodeSwitcherComponent,
    NzTreeNodeBuiltinCheckboxComponent,
    NzTreeNodeTitleComponent,
    NzTreeDropIndicatorComponent
  ],

  exports: [NzTreeComponent, NzTreeNodeBuiltinComponent, NzTreeIndentComponent]
})
export class NzTreeModule {}
