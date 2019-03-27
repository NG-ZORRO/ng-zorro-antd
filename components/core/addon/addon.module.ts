import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzClassListAddDirective } from './classlist_add';
import { NzStringTemplateOutletDirective } from './string_template_outlet';

@NgModule({
  imports     : [ CommonModule ],
  exports     : [ NzStringTemplateOutletDirective, NzClassListAddDirective ],
  declarations: [ NzStringTemplateOutletDirective, NzClassListAddDirective ]
})
export class NzAddOnModule {
}
