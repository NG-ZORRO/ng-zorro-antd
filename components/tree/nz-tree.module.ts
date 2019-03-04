import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAddOnModule } from '../core/addon/addon.module';
import { NzNoAnimationModule } from '../core/no-animation/nz-no-animation.module';
import { NzIconModule } from '../icon/nz-icon.module';
import { NzTreeNodeComponent } from './nz-tree-node.component';
import { NzTreeComponent } from './nz-tree.component';

@NgModule({
  imports: [
    CommonModule,
    NzIconModule,
    NzNoAnimationModule,
    NzAddOnModule
  ],
  declarations: [
    NzTreeComponent,
    NzTreeNodeComponent
  ],
  exports: [
    NzTreeComponent,
    NzTreeNodeComponent
  ]
})

export class NzTreeModule {

}
