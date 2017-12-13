import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCalendarModule } from '../calendar/nz-calendar.module';
import { NzInputModule } from '../input/nz-input.module';
import { NzLocaleModule } from '../locale/index';
import { NzTimePickerModule } from '../time-picker/nz-timepicker.module';
import { NzUtilModule } from '../util/nz-util.module';
import { NzDatePickerComponent } from './nz-datepicker.component';

@NgModule({
  imports     : [ CommonModule, NzTimePickerModule, NzUtilModule, NzInputModule, NzCalendarModule, FormsModule, OverlayModule, NzLocaleModule ],
  declarations: [ NzDatePickerComponent ],
  exports     : [ NzDatePickerComponent ]
})
export class NzDatePickerModule {
}
