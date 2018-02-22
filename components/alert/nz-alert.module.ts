import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzAlertComponent } from './nz-alert.component';

@NgModule({
  declarations: [ NzAlertComponent ],
  exports     : [ NzAlertComponent ],
  imports     : [ CommonModule ]
})
export class NzAlertModule {
}
