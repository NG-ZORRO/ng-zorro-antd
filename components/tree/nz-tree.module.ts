import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAddOnModule } from '../core/addon/addon.module';
import { NzIconModule } from '../icon/nz-icon.module';
import { NzTreeNodeComponent } from './nz-tree-node.component';
import { NzTreeComponent } from './nz-tree.component';

@NgModule({
  imports     : [
    CommonModule,
    NzAddOnModule,
    NzIconModule
  ],
  declarations: [
    NzTreeComponent,
    NzTreeNodeComponent
  ],
  exports     : [
    NzTreeComponent,
    NzTreeNodeComponent
  ]
})

export class NzTreeModule {

}
