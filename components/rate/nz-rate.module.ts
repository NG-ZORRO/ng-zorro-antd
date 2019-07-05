/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { NzRateItemComponent } from './nz-rate-item.component';
import { NzRateComponent } from './nz-rate.component';

@NgModule({
  exports: [NzRateComponent],
  declarations: [NzRateComponent, NzRateItemComponent],
  imports: [CommonModule, NzIconModule, NzToolTipModule]
})
export class NzRateModule {}
