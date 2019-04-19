/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzAddOnModule } from '../core/addon/addon.module';
import { NzIconModule } from '../icon/nz-icon.module';

import { NzStepComponent } from './nz-step.component';
import { NzStepsComponent } from './nz-steps.component';

@NgModule({
  imports: [CommonModule, NzIconModule, NzAddOnModule],
  exports: [NzStepsComponent, NzStepComponent],
  declarations: [NzStepsComponent, NzStepComponent]
})
export class NzStepsModule {}
