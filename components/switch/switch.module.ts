/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzOutletModule, NzWaveModule } from 'ng-zorro-antd/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzSwitchComponent } from './switch.component';

@NgModule({
  exports: [NzSwitchComponent],
  declarations: [NzSwitchComponent],
  imports: [CommonModule, NzWaveModule, NzIconModule, NzOutletModule]
})
export class NzSwitchModule {}
