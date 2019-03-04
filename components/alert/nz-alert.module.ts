import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAddOnModule } from '../core/addon/addon.module';
import { NzIconModule } from '../icon/nz-icon.module';

import { NzAlertComponent } from './nz-alert.component';

@NgModule({
  declarations: [ NzAlertComponent ],
  exports     : [ NzAlertComponent ],
  imports     : [ CommonModule, NzIconModule, NzAddOnModule ]
})
export class NzAlertModule {
}
