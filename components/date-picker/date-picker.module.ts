import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LibPackerModule } from './lib/lib-packer.module';

import { NzDatePickerComponent } from './date-picker.component';
import { DateRangePickerComponent } from './date-range-picker.component';
import { NzMonthPickerComponent } from './month-picker.component';
import { NzPickerComponent } from './picker.component';
import { NzRangePickerComponent } from './range-picker.component';
import { NzWeekPickerComponent } from './week-picker.component';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,

    LibPackerModule
  ],
  exports: [
    NzDatePickerComponent,
    NzRangePickerComponent,
    NzMonthPickerComponent,
    NzWeekPickerComponent
  ],
  declarations: [
    DateRangePickerComponent,
    NzDatePickerComponent,
    NzMonthPickerComponent,
    NzWeekPickerComponent,
    NzRangePickerComponent,
    NzPickerComponent
  ],
  providers: []
})
export class NzDatePickerModule { }
