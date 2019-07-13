/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzNoAnimationModule, NzOverlayModule } from 'ng-zorro-antd/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { LibPackerModule } from './lib/lib-packer.module';

import { DateRangePickerComponent } from './date-range-picker.component';
import { HeaderPickerComponent } from './header-picker.component';
import { NzDatePickerComponent } from './nz-date-picker.component';
import { NzMonthPickerComponent } from './nz-month-picker.component';
import { NzRangePickerComponent } from './nz-range-picker.component';
import { NzWeekPickerComponent } from './nz-week-picker.component';
import { NzYearPickerComponent } from './nz-year-picker.component';
import { NzPickerComponent } from './picker.component';

@NgModule({
  imports: [CommonModule, OverlayModule, LibPackerModule, NzIconModule, NzOverlayModule, NzNoAnimationModule],
  exports: [
    NzDatePickerComponent,
    NzRangePickerComponent,
    NzMonthPickerComponent,
    NzYearPickerComponent,
    NzWeekPickerComponent
  ],
  declarations: [
    HeaderPickerComponent,
    DateRangePickerComponent,
    NzPickerComponent,
    NzDatePickerComponent,
    NzMonthPickerComponent,
    NzYearPickerComponent,
    NzWeekPickerComponent,
    NzRangePickerComponent
  ]
})
export class NzDatePickerModule {}
