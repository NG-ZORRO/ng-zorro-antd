/**
 * A collection module of standard output for all lib components
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzI18nModule } from '../../i18n/nz-i18n.module';
import { NzTimePickerModule } from '../../time-picker/nz-time-picker.module';

import { CalendarFooterComponent } from './calendar/calendar-footer.component';
import { CalendarHeaderComponent } from './calendar/calendar-header.component';
import { CalendarInputComponent } from './calendar/calendar-input.component';
import { OkButtonComponent } from './calendar/ok-button.component';
import { TimePickerButtonComponent } from './calendar/time-picker-button.component';
import { TodayButtonComponent } from './calendar/today-button.component';

import { DateTableComponent } from './date/date-table.component';
import { DecadePanelComponent } from './decade/decade-panel.component';
import { MonthPanelComponent } from './month/month-panel.component';
import { MonthTableComponent } from './month/month-table.component';
import { DateRangePopupComponent } from './popups/date-range-popup.component';
import { InnerPopupComponent } from './popups/inner-popup.component';
import { YearPanelComponent } from './year/year-panel.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    NzI18nModule,
    NzTimePickerModule
  ],
  exports: [
    CalendarHeaderComponent,
    CalendarInputComponent,
    CalendarFooterComponent,
    OkButtonComponent,
    TimePickerButtonComponent,
    TodayButtonComponent,

    DateTableComponent,
    YearPanelComponent,
    MonthPanelComponent,
    MonthTableComponent,
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

    DateTableComponent,
    YearPanelComponent,
    MonthPanelComponent,
    MonthTableComponent,
    DecadePanelComponent,
    InnerPopupComponent,
    DateRangePopupComponent
  ]
})
export class LibPackerModule { }
