import { NgModule } from '@angular/core';
import { NzDatePickerComponent } from './nz-datepicker.component';
import { CommonModule } from '@angular/common';
import { NzInputModule } from '../input/nz-input.module';
import { NzTimePickerModule } from '../time-picker/nz-timepicker.module';
import { NzUtilModule } from '../util/nz-util.module';
import { NzCalendarModule } from '../calendar/nz-calendar.module';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { NzLocaleModule } from '../locale/index';

@NgModule({
  imports     : [ CommonModule, NzTimePickerModule, NzUtilModule, NzInputModule, NzCalendarModule, FormsModule, OverlayModule, NzLocaleModule ],
  declarations: [ NzDatePickerComponent ],
  exports     : [ NzDatePickerComponent ]
})

export class NzDatePickerModule {
}
