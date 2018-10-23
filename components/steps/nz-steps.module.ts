import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzIconModule } from '../icon/nz-icon.module';
import { NzStepComponent } from './nz-step.component';
import { NzStepsComponent } from './nz-steps.component';

@NgModule({
  imports     : [ CommonModule, NzIconModule ],
  exports     : [ NzStepsComponent, NzStepComponent ],
  declarations: [ NzStepsComponent, NzStepComponent ]
})
export class NzStepsModule {
}
