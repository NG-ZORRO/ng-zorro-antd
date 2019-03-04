import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzIconModule } from '../icon/nz-icon.module';
import { NzToolTipModule } from '../tooltip/nz-tooltip.module';

import { NzRateItemComponent } from './nz-rate-item.component';
import { NzRateComponent } from './nz-rate.component';

@NgModule({
  exports     : [ NzRateComponent ],
  declarations: [ NzRateComponent, NzRateItemComponent ],
  imports     : [ CommonModule, NzIconModule, NzToolTipModule ]
})
export class NzRateModule {
}
