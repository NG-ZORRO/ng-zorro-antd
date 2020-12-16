/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzPipesModule as NzPipesModuleFromCore } from 'ng-zorro-antd/core/pipe';

import { NzCountdownComponent } from './countdown.component';
import { NzStatisticNumberComponent } from './statistic-number.component';
import { NzStatisticComponent } from './statistic.component';

@NgModule({
  imports: [BidiModule, CommonModule, PlatformModule, NzOutletModule, NzPipesModuleFromCore],
  declarations: [NzStatisticComponent, NzCountdownComponent, NzStatisticNumberComponent],
  exports: [NzStatisticComponent, NzCountdownComponent, NzStatisticNumberComponent]
})
export class NzStatisticModule {}
