import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzStepsComponent } from './nz-steps.component';
import { NzStepComponent } from './nz-step.component';

@NgModule({
  imports     : [ CommonModule ],
  exports     : [ NzStepsComponent, NzStepComponent ],
  declarations: [ NzStepsComponent, NzStepComponent ],
})
export class NzStepsModule {
}
