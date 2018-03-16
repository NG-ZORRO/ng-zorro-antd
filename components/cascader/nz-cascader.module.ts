import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputModule } from '../input/nz-input.module';

import { NzCascaderComponent } from './nz-cascader.component';

@NgModule({
  imports     : [ CommonModule, FormsModule, OverlayModule, NzInputModule ],
  declarations: [
    NzCascaderComponent
  ],
  exports     : [
    NzCascaderComponent
  ]
})
export class NzCascaderModule {
}
