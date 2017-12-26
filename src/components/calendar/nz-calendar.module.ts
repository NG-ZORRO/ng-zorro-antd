import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzLocaleModule } from '../locale/index';
import { NzRadioModule } from '../radio/nz-radio.module';
import { NzSelectModule } from '../select/nz-select.module';
import { NzCalendarComponent } from './nz-calendar.component';

@NgModule({
  imports     : [ CommonModule, NzSelectModule, NzRadioModule, FormsModule, NzLocaleModule ],
  declarations: [ NzCalendarComponent ],
  exports     : [ NzCalendarComponent ]
})
export class NzCalendarModule {
}
