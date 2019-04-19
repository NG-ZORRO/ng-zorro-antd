import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzNoAnimationModule, NzOverlayModule } from 'ng-zorro-antd/core';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTreeModule } from 'ng-zorro-antd/tree';

import { NzTreeSelectComponent } from './nz-tree-select.component';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    FormsModule,
    NzTreeModule,
    NzIconModule,
    NzEmptyModule,
    NzOverlayModule,
    NzNoAnimationModule
  ],
  declarations: [NzTreeSelectComponent],
  exports: [NzTreeSelectComponent]
})
export class NzTreeSelectModule {}
