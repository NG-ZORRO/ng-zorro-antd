/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { NzRateItemComponent } from './rate-item.component';
import { NzRateComponent } from './rate.component';

@NgModule({
  exports: [NzRateComponent],
  declarations: [NzRateComponent, NzRateItemComponent],
  imports: [BidiModule, CommonModule, NzIconModule, NzToolTipModule]
})
export class NzRateModule {}
