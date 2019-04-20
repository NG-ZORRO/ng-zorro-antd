import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzAddOnModule } from 'ng-zorro-antd/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzStepComponent } from './nz-step.component';
import { NzStepsComponent } from './nz-steps.component';

@NgModule({
  imports: [CommonModule, NzIconModule, NzAddOnModule],
  exports: [NzStepsComponent, NzStepComponent],
  declarations: [NzStepsComponent, NzStepComponent]
})
export class NzStepsModule {}
