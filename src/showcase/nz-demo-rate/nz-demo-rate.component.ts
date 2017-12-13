import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-rate',
  encapsulation: ViewEncapsulation.None,
  templateUrl  : './nz-demo-rate.html'
})
export class NzDemoRateComponent {
  NzDemoRateBasicCode = require('!!raw-loader!./nz-demo-rate-basic.component');
  NzDemoRateHalfCode = require('!!raw-loader!./nz-demo-rate-half.component');
  NzDemoRateTextCode = require('!!raw-loader!./nz-demo-rate-text.component');
  NzDemoRateDisabledCode = require('!!raw-loader!./nz-demo-rate-disabled.component');
}
