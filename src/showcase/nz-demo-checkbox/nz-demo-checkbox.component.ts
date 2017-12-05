import { Component, ViewEncapsulation } from '@angular/core';


@Component({
  selector     : 'nz-demo-checkbox',
  encapsulation: ViewEncapsulation.None,
  templateUrl  : './nz-demo-checkbox.html',
  styleUrls    : [
    './nz-demo-checkbox.less',
  ]
})
export class NzDemoCheckboxComponent {
  NzDemoCheckboxBasicCode = require('!!raw-loader!./nz-demo-checkbox-basic.component');
  NzDemoCheckboxDisabledCode = require('!!raw-loader!./nz-demo-checkbox-disabled.component');
  NzDemoCheckboxControllerCode = require('!!raw-loader!./nz-demo-checkbox-controller.component');
  NzDemoCheckboxGroupCode = require('!!raw-loader!./nz-demo-checkbox-group.component');
  NzDemoCheckboxIndeterminateCode = require('!!raw-loader!./nz-demo-checkbox-indeterminate.component');
}
