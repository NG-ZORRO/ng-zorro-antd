import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-timepicker',
  encapsulation: ViewEncapsulation.None,
  templateUrl  : './nz-demo-timepicker.html',
  styleUrls    : [
    './nz-demo-timepicker.less',
  ]
})
export class NzDemoTimePickerComponent {
  NzDemoTimePickerBasicCode = require('!!raw-loader!./nz-demo-timepicker-basic.component');
  NzDemoTimePickerChangeCode = require('!!raw-loader!./nz-demo-timepicker-change.component');
  NzDemoTimePickerSizeCode = require('!!raw-loader!./nz-demo-timepicker-size.component');
  NzDemoTimePickerWithoutSecondsCode = require('!!raw-loader!./nz-demo-timepicker-without-seconds.component');
  NzDemoTimePickerDisabledCode = require('!!raw-loader!./nz-demo-timepicker-disabled.component');
  NzDemoTimePickerDisabledOptionsCode = require('!!raw-loader!./nz-demo-timepicker-disabled-options.component');
  NzDemoTimePickerHideOptionsCode = require('!!raw-loader!./nz-demo-timepicker-hide-options.component');
}
