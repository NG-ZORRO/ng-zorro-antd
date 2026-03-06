/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzAlertMarqueeComponent } from './alert-marquee.component';
import { NzAlertComponent } from './alert.component';

@NgModule({
  exports: [NzAlertComponent, NzAlertMarqueeComponent],
  imports: [NzAlertComponent, NzAlertMarqueeComponent]
})
export class NzAlertModule {}
