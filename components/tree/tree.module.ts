/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzHighlightModule } from 'ng-zorro-antd/core/highlight';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzTreeDropIndicatorComponent } from './tree-drop-indicator.component';
import { NzTreeIndentComponent } from './tree-indent.component';
import { NzTreeNodeBuiltinCheckboxComponent } from './tree-node-checkbox.component';
import { NzTreeNodeSwitcherComponent } from './tree-node-switcher.component';
import { NzTreeNodeTitleComponent } from './tree-node-title.component';
import { NzTreeNodeBuiltinComponent } from './tree-node.component';
import { NzTreeComponent } from './tree.component';

@NgModule({
  imports: [BidiModule, CommonModule, NzOutletModule, NzIconModule, NzNoAnimationModule, NzHighlightModule, ScrollingModule],
  declarations: [
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
