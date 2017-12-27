import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzDemoDatePickerBasicComponent } from './nz-demo-datepicker-basic.component';
import { NzDemoDatePickerFormatterComponent } from './nz-demo-datepicker-formatter.component';
import { NzDemoDatePickerSizeComponent } from './nz-demo-datepicker-size.component';
import { NzDemoDatePickerDisabledComponent } from './nz-demo-datepicker-disabled.component';
import { NzDemoDatePickerTimeComponent } from './nz-demo-datepicker-time.component';
import { NzDemoDatePickerDisableDateComponent } from './nz-demo-datepicker-disable-date.component';
import { NzDemoDatePickerStartEndComponent } from './nz-demo-datepicker-start-end.component';
import { NzDemoDatePickerComponent } from './nz-demo-datepicker.component';

import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';
import { NgZorroAntdModule } from '../../../index.showcase';

import { NzDemoDatePickerRoutingModule } from './nz-demo-datepicker.routing.module';

@NgModule({
  imports     : [ NzDemoDatePickerRoutingModule, CommonModule, NzCodeBoxModule, NgZorroAntdModule, FormsModule ],
  declarations: [ NzDemoDatePickerComponent, NzDemoDatePickerBasicComponent, NzDemoDatePickerFormatterComponent, NzDemoDatePickerSizeComponent, NzDemoDatePickerDisabledComponent, NzDemoDatePickerTimeComponent, NzDemoDatePickerDisableDateComponent, NzDemoDatePickerStartEndComponent ]
})
export class NzDemoDatePickerModule {

}
