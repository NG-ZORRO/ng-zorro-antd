/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPipeModule } from 'ng-zorro-antd/core';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzRadioModule } from 'ng-zorro-antd/radio';

import { NzTimeRangeComponent } from './nz-time-range.component';

@NgModule({
  imports: [CommonModule, FormsModule, NzButtonModule, NzRadioModule, NzDatePickerModule, NzPipeModule],
  declarations: [NzTimeRangeComponent],
  exports: [NzTimeRangeComponent]
})
export class NzTimeRangeModule {}
