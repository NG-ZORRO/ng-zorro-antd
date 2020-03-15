/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzHighlightModule, NzNoAnimationModule, NzOutletModule } from 'ng-zorro-antd/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTreeIndentComponent } from './nz-tree-indent.component';

import { NzTreeNodeComponent } from './nz-tree-node.component';
import { NzTreeComponent } from './nz-tree.component';

@NgModule({
  imports: [CommonModule, NzOutletModule, NzIconModule, NzNoAnimationModule, NzHighlightModule],
  declarations: [NzTreeComponent, NzTreeNodeComponent, NzTreeIndentComponent],
  exports: [NzTreeComponent, NzTreeNodeComponent, NzTreeIndentComponent]
})
export class NzTreeModule {}
