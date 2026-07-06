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

const cells = [NzDateCellDirective, NzDateFullCellDirective, NzMonthCellDirective, NzMonthFullCellDirective];

@NgModule({
  imports: [NzCalendarHeaderComponent, NzCalendarComponent, ...cells],
  exports: [NzCalendarComponent, ...cells]
})
export class NzCalendarModule {}
