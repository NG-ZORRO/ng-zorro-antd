import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-dropdown',
  templateUrl  : './nz-demo-dropdown.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls    : [
    './nz-demo-dropdown.less'
  ]
})
export class NzDemoDropDownComponent {
  NzDemoDropDownBasicCode = require('!!raw-loader!./nz-demo-dropdown-basic.component');
  NzDemoDropDownOtherCode = require('!!raw-loader!./nz-demo-dropdown-other.component');
  NzDemoDropDownTriggerCode = require('!!raw-loader!./nz-demo-dropdown-trigger.component');
  NzDemoDropDownCascadingCode = require('!!raw-loader!./nz-demo-dropdown-cascading.component');
  NzDemoDropDownPositionCode = require('!!raw-loader!./nz-demo-dropdown-position.component');
  NzDemoDropDownClickCode = require('!!raw-loader!./nz-demo-dropdown-click.component');
  NzDemoDropDownHideCode = require('!!raw-loader!./nz-demo-dropdown-hide.component');
  NzDemoDropDownButtonCode = require('!!raw-loader!./nz-demo-dropdown-button.component');
}

