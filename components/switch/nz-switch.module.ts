import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAddOnModule } from '../core/addon/addon.module';
import { NzWaveModule } from '../core/wave/nz-wave.module';
import { NzIconModule } from '../icon/nz-icon.module';

import { NzSwitchComponent } from './nz-switch.component';

@NgModule({
  exports     : [ NzSwitchComponent ],
  declarations: [ NzSwitchComponent ],
  imports     : [ CommonModule, NzWaveModule, NzIconModule, NzAddOnModule ]
})
export class NzSwitchModule {
}
