import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzStepsComponent } from './nz-steps.component';
import { NzStepComponent } from './nz-step.component';
import { NzStepConnectService } from './nz-step-connect.service';

@NgModule({
  imports     : [ CommonModule ],
  exports     : [ NzStepsComponent, NzStepComponent ],
  declarations: [ NzStepsComponent, NzStepComponent ],
  providers   : [ NzStepConnectService ]
})
export class NzStepsModule {
}
