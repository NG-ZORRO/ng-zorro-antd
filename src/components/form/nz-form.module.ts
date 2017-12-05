import { NgModule } from '@angular/core';

import { NzFormComponent } from './nz-form.component';
import { NzFormItemDirective } from './nz-form-item.directive';
import { NzFormControlComponent } from './nz-form-control.component';
import { NzFormExplainComponent } from './nz-form-explain.directive';
import { NzFormTextDirective } from './nz-form-text.directive';
import { NzFormSplitDirective } from './nz-form-split.directive';
import { NzFormExtraDirective } from './nz-form-extra.directive';
import { NzFormLabelDirective } from './nz-form-label.directive';
import { NzFormItemRequiredDirective } from './nz-form-item-required.directive';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [ NzFormExtraDirective, NzFormLabelDirective, NzFormComponent, NzFormItemDirective, NzFormControlComponent, NzFormExplainComponent, NzFormTextDirective, NzFormSplitDirective, NzFormItemRequiredDirective ],
  exports     : [ NzFormExtraDirective, NzFormLabelDirective, NzFormComponent, NzFormItemDirective, NzFormControlComponent, NzFormExplainComponent, NzFormTextDirective, NzFormSplitDirective, NzFormItemRequiredDirective ],
  imports     : [ CommonModule ]
})
export class NzFormModule {
}
