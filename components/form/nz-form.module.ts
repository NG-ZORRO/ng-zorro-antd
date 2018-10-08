import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzGridModule } from '../grid/nz-grid.module';
import { NzIconModule } from '../icon/nz-icon.module';
import { NzFormControlComponent } from './nz-form-control.component';
import { NzFormExplainComponent } from './nz-form-explain.component';
import { NzFormExtraComponent } from './nz-form-extra.component';
import { NzFormItemComponent } from './nz-form-item.component';
import { NzFormLabelComponent } from './nz-form-label.component';
import { NzFormSplitComponent } from './nz-form-split.component';
import { NzFormTextComponent } from './nz-form-text.component';
import { NzFormDirective } from './nz-form.directive';

@NgModule({
  declarations: [
    NzFormExtraComponent,
    NzFormLabelComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormControlComponent,
    NzFormExplainComponent,
    NzFormTextComponent,
    NzFormSplitComponent ],
  exports     : [
    NzFormExtraComponent,
    NzFormLabelComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormControlComponent,
    NzFormExplainComponent,
    NzFormTextComponent,
    NzFormSplitComponent
  ],
  imports     : [ CommonModule, NzGridModule, NzIconModule ]
})
export class NzFormModule {
}
