import { NgModule } from '@angular/core';
import { NzRateComponent } from './nz-rate.component';
import { CommonModule } from '@angular/common';

@NgModule({
  exports     : [ NzRateComponent ],
  declarations: [ NzRateComponent ],
  imports     : [ CommonModule ]
})
export class NzRateModule {
}
