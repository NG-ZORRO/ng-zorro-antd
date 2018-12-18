import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzI18nModule } from '../i18n/nz-i18n.module';
import { NzIconModule } from '../icon/nz-icon.module';
import { NzInputModule } from '../input/nz-input.module';
import { NzCascaderOptionComponent } from './nz-cascader-li.component';
import { NzCascaderComponent } from './nz-cascader.component';

@NgModule({
  imports     : [ CommonModule, FormsModule, OverlayModule, NzInputModule, NzIconModule, NzI18nModule ],
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
