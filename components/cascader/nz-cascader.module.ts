import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from '../icon/nz-icon.module';

import { NzInputModule } from '../input/nz-input.module';

import { NzCascaderComponent } from './nz-cascader.component';

@NgModule({
  imports     : [ CommonModule, FormsModule, OverlayModule, NzInputModule, NzIconModule ],
  declarations: [
    NzCascaderComponent
  ],
  exports     : [
    NzCascaderComponent
  ]
})
export class NzCascaderModule {
}
