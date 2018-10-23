import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzIconModule } from '../icon/nz-icon.module';
import { NzRateComponent } from './nz-rate.component';

@NgModule({
  exports     : [ NzRateComponent ],
  declarations: [ NzRateComponent ],
  imports     : [ CommonModule, NzIconModule ]
})
export class NzRateModule {
}
