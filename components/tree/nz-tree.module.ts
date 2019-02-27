import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzNoAnimationModule } from '../core/no-animation/nz-no-animation.module';
import { NzIconModule } from '../icon/nz-icon.module';
import { NzTreeNodeComponent } from './nz-tree-node.component';
import { NzTreeComponent } from './nz-tree.component';

@NgModule({
  imports: [
    CommonModule,
    NzIconModule,
    NzNoAnimationModule
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
