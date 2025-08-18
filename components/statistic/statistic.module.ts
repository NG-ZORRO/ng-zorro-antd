/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzCountdownComponent } from './countdown.component';
import { NzStatisticContentValueComponent } from './statistic-content-value.component';
import { NzStatisticComponent } from './statistic.component';

@NgModule({
  imports: [NzStatisticComponent, NzCountdownComponent, NzStatisticContentValueComponent],
  exports: [NzStatisticComponent, NzCountdownComponent, NzStatisticContentValueComponent]
})
export class NzStatisticModule {}
