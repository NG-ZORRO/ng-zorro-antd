import { NgModule } from '@angular/core';
import { NzSpinComponent } from './nz-spin.component';
import { CommonModule } from '@angular/common';

@NgModule({
  exports     : [ NzSpinComponent ],
  declarations: [ NzSpinComponent ],
  imports     : [ CommonModule ]
})

export class NzSpinModule {
}
