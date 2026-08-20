/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { CalendarFooterComponent } from './calendar-footer.component';
import { NzDatePickerComponent } from './date-picker.component';
import { DateRangePopupComponent } from './date-range-popup.component';
import { HijriCalendarFooterComponent } from './hijri/hijri-calendar-footer.component';
import { NzHijriDatePickerComponent } from './hijri/hijri-date-picker.component';
import { HijriDateRangePopupComponent } from './hijri/hijri-date-range-popup.component';
import { HijriInnerPopupComponent } from './hijri/hijri-inner-popup.component';
import { NzHijriMonthPickerComponent } from './hijri/hijri-month-picker.component';
import { NzHijriQuarterPickerComponent } from './hijri/hijri-quarter-picker.component';
import { NzHijriRangePickerComponent } from './hijri/hijri-range-picker.component';
import { NzHijriWeekPickerComponent } from './hijri/hijri-week-picker.component';
import { NzHijriYearPickerComponent } from './hijri/hijri-year-picker.component';
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
    NzQuarterPickerComponent,
    NzHijriDatePickerComponent,
    NzHijriMonthPickerComponent,
    NzHijriYearPickerComponent,
    NzHijriWeekPickerComponent,
    NzHijriRangePickerComponent,
    NzHijriQuarterPickerComponent,
    HijriCalendarFooterComponent,
    HijriInnerPopupComponent,
    HijriDateRangePopupComponent
  ],
  exports: [
    NzDatePickerComponent,
    NzRangePickerComponent,
    NzMonthPickerComponent,
    NzYearPickerComponent,
    NzWeekPickerComponent,
    NzQuarterPickerComponent,
    NzHijriDatePickerComponent,
    NzHijriRangePickerComponent,
    NzHijriMonthPickerComponent,
    NzHijriYearPickerComponent,
    NzHijriWeekPickerComponent,
    NzHijriQuarterPickerComponent
  ]
})
export class NzDatePickerModule {}
