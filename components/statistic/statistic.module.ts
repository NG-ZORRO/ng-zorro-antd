/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzPipesModule } from 'ng-zorro-antd/core/pipe';

import { NzCountdownComponent } from './countdown.component';
import { NzStatisticNumberComponent } from './statistic-number.component';
import { NzStatisticComponent } from './statistic.component';

@NgModule({
  imports: [CommonModule, PlatformModule, NzOutletModule, NzPipesModule],
  declarations: [NzStatisticComponent, NzCountdownComponent, NzStatisticNumberComponent],
  exports: [NzStatisticComponent, NzCountdownComponent, NzStatisticNumberComponent]
})
export class NzStatisticModule {}
