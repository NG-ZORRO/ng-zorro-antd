import { NgModule } from '@angular/core';
import { NzAlertComponent } from './nz-alert.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ NzAlertComponent ],
  exports     : [ NzAlertComponent ],
  imports     : [ CommonModule ]
})
export class NzAlertModule {
}
