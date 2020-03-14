/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * A collection module of standard output for all lib components
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateHeaderComponent } from './date-header.component';
import { DateTableComponent } from './date-table.component';
import { DecadeHeaderComponent } from './decade-header.component';
import { DecadeTableComponent } from './decade-table.component';
import { MonthHeaderComponent } from './month-header.component';
import { MonthTableComponent } from './month-table.component';
import { YearHeaderComponent } from './year-header.component';
import { YearTableComponent } from './year-table.component';

import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@NgModule({
  imports: [CommonModule, FormsModule, NzI18nModule, NzTimePickerModule],
  exports: [
    DateHeaderComponent,
    DateTableComponent,
    DecadeHeaderComponent,
    DecadeTableComponent,
    MonthHeaderComponent,
    MonthTableComponent,
    YearHeaderComponent,
    YearTableComponent
  ],
  declarations: [
    DateHeaderComponent,
    DateTableComponent,
    DecadeHeaderComponent,
    DecadeTableComponent,
    MonthHeaderComponent,
    MonthTableComponent,
    YearHeaderComponent,
    YearTableComponent
  ]
})
export class LibPackerModule {}
