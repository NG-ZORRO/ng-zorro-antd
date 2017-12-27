import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-datepicker',
  encapsulation: ViewEncapsulation.None,
  templateUrl  : './nz-demo-datepicker.html',
  styleUrls    : [
    './nz-demo-datepicker.less',
  ]
})
export class NzDemoDatePickerComponent {
  NzDemoDatePickerBasicCode = require('!!raw-loader!./nz-demo-datepicker-basic.component');
  NzDemoDatePickerFormatterCode = require('!!raw-loader!./nz-demo-datepicker-formatter.component');
  NzDemoDatePickerSizeCode = require('!!raw-loader!./nz-demo-datepicker-size.component');
  NzDemoDatePickerDisabledCode = require('!!raw-loader!./nz-demo-datepicker-disabled.component');
  NzDemoDatePickerTimeCode = require('!!raw-loader!./nz-demo-datepicker-time.component');
  NzDemoDatePickerDisableDateCode = require('!!raw-loader!./nz-demo-datepicker-disable-date.component');
  NzDemoDatePickerStartEndCode = require('!!raw-loader!./nz-demo-datepicker-start-end.component');
}
