import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzSwitchComponent } from './nz-switch.component';

@NgModule({
  exports     : [ NzSwitchComponent ],
  declarations: [ NzSwitchComponent ],
  imports     : [ CommonModule ]
})
export class NzSwitchModule {
}
