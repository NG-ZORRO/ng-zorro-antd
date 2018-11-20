import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzStringTemplateOutletDirective } from './string_template_outlet';

@NgModule({
  imports     : [ CommonModule ],
  exports     : [ NzStringTemplateOutletDirective ],
  declarations: [ NzStringTemplateOutletDirective ]
})
export class NzAddOnModule {
}
