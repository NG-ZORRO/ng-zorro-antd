/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { CalendarFooterComponent } from './calendar-footer.component';
import { NzDatePickerComponent } from './date-picker.component';
import { DateRangePopupComponent } from './date-range-popup.component';
import { InnerPopupComponent } from './inner-popup.component';
import { NzMonthPickerComponent } from './month-picker.component';
import { NzQuarterPickerComponent } from './quarter-picker.component';
import { NzRangePickerComponent } from './range-picker.component';
import { NzWeekPickerComponent } from './week-picker.component';
import { NzYearPickerComponent } from './year-picker.component';

@NgModule({
  imports: [
    NzDatePickerComponent,
    NzMonthPickerComponent,
    NzYearPickerComponent,
    NzWeekPickerComponent,
    NzRangePickerComponent,
    CalendarFooterComponent,
    InnerPopupComponent,
    DateRangePopupComponent,
    NzQuarterPickerComponent
  ],
  exports: [
    NzDatePickerComponent,
    NzRangePickerComponent,
    NzMonthPickerComponent,
    NzYearPickerComponent,
    NzWeekPickerComponent,
    NzQuarterPickerComponent
  ]
})
export class NzDatePickerModule {}
