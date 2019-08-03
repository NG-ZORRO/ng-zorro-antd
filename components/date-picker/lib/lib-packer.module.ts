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

import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

import { CalendarFooterComponent } from './calendar/calendar-footer.component';
import { CalendarHeaderComponent } from './calendar/calendar-header.component';
import { CalendarInputComponent } from './calendar/calendar-input.component';
import { OkButtonComponent } from './calendar/ok-button.component';
import { TimePickerButtonComponent } from './calendar/time-picker-button.component';
import { TodayButtonComponent } from './calendar/today-button.component';

import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { DecadePanelComponent } from './decade/decade-panel.component';
import { MonthPanelComponent } from './month/month-panel.component';
import { DateRangePopupComponent } from './popups/date-range-popup.component';
import { InnerPopupComponent } from './popups/inner-popup.component';
import { YearPanelComponent } from './year/year-panel.component';

@NgModule({
  imports: [CommonModule, FormsModule, NzI18nModule, NzTimePickerModule, NzCalendarModule],
  exports: [
    CalendarHeaderComponent,
    CalendarInputComponent,
    CalendarFooterComponent,
    OkButtonComponent,
    TimePickerButtonComponent,
    TodayButtonComponent,

    YearPanelComponent,
    MonthPanelComponent,
    DecadePanelComponent,
    InnerPopupComponent,
    DateRangePopupComponent

  ],
  declarations: [
    CalendarHeaderComponent,
    CalendarInputComponent,
    CalendarFooterComponent,
    OkButtonComponent,
    TimePickerButtonComponent,
    TodayButtonComponent,

    YearPanelComponent,
    MonthPanelComponent,
    DecadePanelComponent,
    InnerPopupComponent,
    DateRangePopupComponent
  ]
})
export class LibPackerModule {}
