import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzAddOnModule, NzWaveModule } from 'ng-zorro-antd/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzSwitchComponent } from './nz-switch.component';

@NgModule({
  exports: [NzSwitchComponent],
  declarations: [NzSwitchComponent],
  imports: [CommonModule, NzWaveModule, NzIconModule, NzAddOnModule]
})
export class NzSwitchModule {}
