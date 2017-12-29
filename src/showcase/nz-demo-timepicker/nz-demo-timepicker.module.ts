import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzDemoTimePickerBasicComponent } from './nz-demo-timepicker-basic.component';
import { NzDemoTimePickerChangeComponent } from './nz-demo-timepicker-change.component';
import { NzDemoTimePickerSizeComponent } from './nz-demo-timepicker-size.component';
import { NzDemoTimePickerWithoutSecondsComponent } from './nz-demo-timepicker-without-seconds.component';
import { NzDemoTimePickerDisabledComponent } from './nz-demo-timepicker-disabled.component';
import { NzDemoTimePickerDisabledOptionsComponent } from './nz-demo-timepicker-disabled-options.component';
import { NzDemoTimePickerHideOptionsComponent } from './nz-demo-timepicker-hide-options.component';
import { NzDemoTimePickerComponent } from './nz-demo-timepicker.component';
import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';
import { NgZorroAntdModule } from '../../../index.showcase';
import { NzDemoTimePickerRoutingModule } from './nz-demo-timepicker.routing.module';

@NgModule({
  imports     : [ NzDemoTimePickerRoutingModule, CommonModule, NzCodeBoxModule, NgZorroAntdModule, FormsModule ],
  declarations: [ NzDemoTimePickerComponent, NzDemoTimePickerBasicComponent, NzDemoTimePickerChangeComponent, NzDemoTimePickerSizeComponent, NzDemoTimePickerWithoutSecondsComponent, NzDemoTimePickerDisabledComponent, NzDemoTimePickerDisabledOptionsComponent, NzDemoTimePickerHideOptionsComponent ],
})
export class NzDemoTimePickerModule {

}
