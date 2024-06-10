/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * A collection module of standard output for all lib components
 */

import { NgModule } from '@angular/core';

import { DateHeaderComponent } from './date-header.component';
import { DateTableComponent } from './date-table.component';
import { DecadeHeaderComponent } from './decade-header.component';
import { DecadeTableComponent } from './decade-table.component';
import { MonthHeaderComponent } from './month-header.component';
import { MonthTableComponent } from './month-table.component';
import { QuarterHeaderComponent } from './quarter-header.component';
import { QuarterTableComponent } from './quarter-table.component';
import { YearHeaderComponent } from './year-header.component';
import { YearTableComponent } from './year-table.component';

@NgModule({
  imports: [
    DateHeaderComponent,
    DateTableComponent,
    DecadeHeaderComponent,
    DecadeTableComponent,
    MonthHeaderComponent,
    MonthTableComponent,
    YearHeaderComponent,
    YearTableComponent,
    QuarterHeaderComponent,
    QuarterTableComponent
  ],
  exports: [
    DateHeaderComponent,
    DateTableComponent,
    DecadeHeaderComponent,
    DecadeTableComponent,
    MonthHeaderComponent,
    MonthTableComponent,
    YearHeaderComponent,
    YearTableComponent,
    QuarterHeaderComponent,
    QuarterTableComponent
  ]
})
export class LibPackerModule {}
