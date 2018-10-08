import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzIconModule } from '../icon/nz-icon.module';

import { LibPackerModule } from './lib/lib-packer.module';

import { NzDatePickerComponent } from './date-picker.component';
import { DateRangePickerComponent } from './date-range-picker.component';
import { HeaderPickerComponent } from './header-picker.component';
import { NzMonthPickerComponent } from './month-picker.component';
import { NzPickerComponent } from './picker.component';
import { NzRangePickerComponent } from './range-picker.component';
import { NzWeekPickerComponent } from './week-picker.component';
import { NzYearPickerComponent } from './year-picker.component';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,

    LibPackerModule,

    NzIconModule
  ],
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
  ],
  providers: []
})
export class NzDatePickerModule { }
