import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzAddOnModule } from '../core/addon/addon.module';
import { NzCountdownComponent } from './nz-countdown.component';
import { NzStatisticNumberComponent } from './nz-statistic-number.component';
import { NzStatisticComponent } from './nz-statistic.component';
import { NzTimeRangePipe } from './nz-time-range.pipe';

@NgModule({
  imports: [CommonModule, NzAddOnModule],
  declarations: [NzStatisticComponent, NzCountdownComponent, NzStatisticNumberComponent, NzTimeRangePipe],
  exports: [NzStatisticComponent, NzCountdownComponent, NzStatisticNumberComponent, NzTimeRangePipe]
})
export class NzStatisticModule {}
