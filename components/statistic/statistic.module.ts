/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzCountdownComponent } from './countdown.component';
import { NzStatisticNumberComponent } from './statistic-number.component';
import { NzStatisticComponent } from './statistic.component';

@NgModule({
  imports: [NzStatisticComponent, NzCountdownComponent, NzStatisticNumberComponent],
  exports: [NzStatisticComponent, NzCountdownComponent, NzStatisticNumberComponent]
})
export class NzStatisticModule {}
