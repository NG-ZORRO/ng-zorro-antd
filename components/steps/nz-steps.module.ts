import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzStepComponent } from './nz-step.component';
import { NzStepsComponent } from './nz-steps.component';

@NgModule({
  imports     : [ CommonModule ],
  exports     : [ NzStepsComponent, NzStepComponent ],
  declarations: [ NzStepsComponent, NzStepComponent ],
})
export class NzStepsModule {
}
