/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * A collection module of standard output for all Hijri lib components
 */

import { NgModule } from '@angular/core';

import { HijriDateHeaderComponent } from './hijri-date-header.component';
import { HijriDateTableComponent } from './hijri-date-table.component';
import { HijriDecadeHeaderComponent } from './hijri-decade-header.component';
import { HijriDecadeTableComponent } from './hijri-decade-table.component';
import { HijriMonthHeaderComponent } from './hijri-month-header.component';
import { HijriMonthTableComponent } from './hijri-month-table.component';
import { HijriQuarterHeaderComponent } from './hijri-quarter-header.component';
import { HijriQuarterTableComponent } from './hijri-quarter-table.component';
import { HijriYearHeaderComponent } from './hijri-year-header.component';
import { HijriYearTableComponent } from './hijri-year-table.component';

const COMPONENTS = [
  HijriDateHeaderComponent,
  HijriDateTableComponent,
  HijriDecadeHeaderComponent,
  HijriDecadeTableComponent,
  HijriMonthHeaderComponent,
  HijriMonthTableComponent,
  HijriQuarterHeaderComponent,
  HijriQuarterTableComponent,
  HijriYearHeaderComponent,
  HijriYearTableComponent
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS
})
export class HijriLibPackerModule {}
