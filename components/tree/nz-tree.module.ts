import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzAddOnModule, NzNoAnimationModule } from 'ng-zorro-antd/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzTreeNodeComponent } from './nz-tree-node.component';
import { NzTreeComponent } from './nz-tree.component';

@NgModule({
  imports: [CommonModule, NzAddOnModule, NzIconModule, NzNoAnimationModule],
  declarations: [NzTreeComponent, NzTreeNodeComponent],
  exports: [NzTreeComponent, NzTreeNodeComponent]
})
export class NzTreeModule {}
