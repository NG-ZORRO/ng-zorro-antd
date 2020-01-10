/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAddOnModule, NzPipesModule } from 'ng-zorro-antd/core';

import { NzCountdownComponent } from './nz-countdown.component';
import { NzStatisticNumberComponent } from './nz-statistic-number.component';
import { NzStatisticComponent } from './nz-statistic.component';

@NgModule({
  imports: [CommonModule, PlatformModule, NzAddOnModule, NzPipesModule],
  declarations: [NzStatisticComponent, NzCountdownComponent, NzStatisticNumberComponent],
  exports: [NzStatisticComponent, NzCountdownComponent, NzStatisticNumberComponent]
})
export class NzStatisticModule {}
