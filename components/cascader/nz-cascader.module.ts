import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzNoAnimationModule } from '../core/no-animation/nz-no-animation.module';
import { NzOverlayModule } from '../core/overlay/nz-overlay.module';
import { NzEmptyModule } from '../empty/nz-empty.module';
import { NzIconModule } from '../icon/nz-icon.module';
import { NzInputModule } from '../input/nz-input.module';
import { NzCascaderOptionComponent } from './nz-cascader-li.component';
import { NzCascaderComponent } from './nz-cascader.component';

@NgModule({
  imports     : [ CommonModule, FormsModule, OverlayModule, NzInputModule, NzIconModule, NzEmptyModule, NzOverlayModule, NzNoAnimationModule ],
  declarations: [
    NzCascaderComponent,
    NzCascaderOptionComponent
  ],
  exports     : [
    NzCascaderComponent
  ]
})
export class NzCascaderModule {
}
