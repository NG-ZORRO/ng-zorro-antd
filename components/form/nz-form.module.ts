import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzFormControlComponent } from './nz-form-control.component';
import { NzFormExplainComponent } from './nz-form-explain.component';
import { NzFormExtraDirective } from './nz-form-extra.directive';
import { NzFormItemRequiredDirective } from './nz-form-item-required.directive';
import { NzFormItemDirective } from './nz-form-item.directive';
import { NzFormLabelDirective } from './nz-form-label.directive';
import { NzFormSplitDirective } from './nz-form-split.directive';
import { NzFormTextDirective } from './nz-form-text.directive';
import { NzFormDirective } from './nz-form.directive';

@NgModule({
  declarations: [ NzFormExtraDirective, NzFormLabelDirective, NzFormDirective, NzFormItemDirective, NzFormControlComponent, NzFormExplainComponent, NzFormTextDirective, NzFormSplitDirective, NzFormItemRequiredDirective ],
  exports     : [ NzFormExtraDirective, NzFormLabelDirective, NzFormDirective, NzFormItemDirective, NzFormControlComponent, NzFormExplainComponent, NzFormTextDirective, NzFormSplitDirective, NzFormItemRequiredDirective ],
  imports     : [ CommonModule ]
})
export class NzFormModule {
}
