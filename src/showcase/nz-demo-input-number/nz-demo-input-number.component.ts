import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-input-number',
  encapsulation: ViewEncapsulation.None,
  templateUrl  : './nz-demo-input-number.html',
  styleUrls    : [
    './nz-demo-input-number.less',
  ]
})
export class NzDemoInputNumberComponent {
  NzDemoInputNumberBasicCode = require('!!raw-loader!./nz-demo-input-number-basic.component');
  NzDemoInputNumberFormatterCode = require('!!raw-loader!./nz-demo-input-number-formatter.component');
  NzDemoInputNumberDigitCode = require('!!raw-loader!./nz-demo-input-number-digit.component');
  NzDemoInputNumberSizeCode = require('!!raw-loader!./nz-demo-input-number-size.component');
  NzDemoInputNumberDisabledCode = require('!!raw-loader!./nz-demo-input-number-disabled.component');
}
