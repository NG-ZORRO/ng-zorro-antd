import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzSpinComponent } from './nz-spin.component';

@NgModule({
  exports     : [ NzSpinComponent ],
  declarations: [ NzSpinComponent ],
  imports     : [ CommonModule ]
})
export class NzSpinModule {
}
