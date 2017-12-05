import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-switch',
  encapsulation: ViewEncapsulation.None,
  templateUrl  : './nz-demo-switch.html',
  styleUrls    : [
    './nz-demo-switch.less',
  ]
})
export class NzDemoSwitchComponent {
  NzDemoSwitchBasicCode = require('!!raw-loader!./nz-demo-switch-basic.component');
  NzDemoSwitchDisabledCode = require('!!raw-loader!./nz-demo-switch-disabled.component');
  NzDemoSwitchSizeCode = require('!!raw-loader!./nz-demo-switch-size.component');
  NzDemoSwitchTextCode = require('!!raw-loader!./nz-demo-switch-text.component');
}
