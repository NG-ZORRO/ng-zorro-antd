/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzHighlightModule } from 'ng-zorro-antd/core/highlight';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTreeIndentComponent } from './tree-indent.component';
import { NzTreeNodeCheckboxComponent } from './tree-node-checkbox.component';
import { NzTreeNodeSwitcherComponent } from './tree-node-switcher.component';
import { NzTreeNodeTitleComponent } from './tree-node-title.component';
import { NzTreeNodeComponent } from './tree-node.component';
import { NzTreeComponent } from './tree.component';

@NgModule({
  imports: [CommonModule, NzOutletModule, NzIconModule, NzNoAnimationModule, NzHighlightModule, ScrollingModule],
  declarations: [
    NzTreeComponent,
    NzTreeNodeComponent,
    NzTreeIndentComponent,
    NzTreeNodeSwitcherComponent,
    NzTreeNodeCheckboxComponent,
    NzTreeNodeTitleComponent
  ],
  exports: [NzTreeComponent, NzTreeNodeComponent, NzTreeIndentComponent]
})
export class NzTreeModule {}
