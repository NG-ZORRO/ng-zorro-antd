import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzWaveModule } from '../core/wave/nz-wave.module';

import { NzSwitchComponent } from './nz-switch.component';

@NgModule({
  exports     : [ NzSwitchComponent ],
  declarations: [ NzSwitchComponent ],
  imports     : [ CommonModule, NzWaveModule ]
})
export class NzSwitchModule {
}
