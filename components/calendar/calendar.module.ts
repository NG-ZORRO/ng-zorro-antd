/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import {
  NzDateCellDirective,
  NzDateFullCellDirective,
  NzMonthCellDirective,
  NzMonthFullCellDirective
} from './calendar-cells';
import { NzCalendarHeaderComponent } from './calendar-header.component';
import { NzCalendarComponent } from './calendar.component';

const CELL_DIRECTIVES = [NzDateCellDirective, NzDateFullCellDirective, NzMonthCellDirective, NzMonthFullCellDirective];

@NgModule({
  imports: [NzCalendarHeaderComponent, NzCalendarComponent, ...CELL_DIRECTIVES],
  exports: [NzCalendarComponent, ...CELL_DIRECTIVES]
})
export class NzCalendarModule {}
