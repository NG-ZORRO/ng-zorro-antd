import { NgModule } from '@angular/core';
import { NzCascaderComponent } from './nz-cascader.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { NzInputModule } from '../input/nz-input.module';

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
