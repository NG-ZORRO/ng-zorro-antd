import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from '../icon/nz-icon.module';

import { NzAlertComponent } from './nz-alert.component';

@NgModule({
  declarations: [ NzAlertComponent ],
  exports     : [ NzAlertComponent ],
  imports     : [ CommonModule, NzIconModule ]
})
export class NzAlertModule {
}
