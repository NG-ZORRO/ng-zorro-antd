import { NgModule } from '@angular/core';
import { NzSwitchComponent } from './nz-switch.component';
import { CommonModule } from '@angular/common';

@NgModule({
  exports     : [ NzSwitchComponent ],
  declarations: [ NzSwitchComponent ],
  imports     : [ CommonModule ]
})
export class NzSwitchModule {
}
