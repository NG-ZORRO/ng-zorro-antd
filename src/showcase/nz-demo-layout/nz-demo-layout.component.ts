import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-layout',
  templateUrl  : './nz-demo-layout.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls    : [
    './nz-demo-layout.less'
  ]
})
export class NzDemoLayoutComponent {
  NzDemoLayoutBasicCode = require('!!raw-loader!./nz-demo-layout-basic.component');
  NzDemoLayoutTopCode = require('!!raw-loader!./nz-demo-layout-top.component');
  NzDemoLayoutTopSide2Code = require('!!raw-loader!./nz-demo-layout-top-side-2.component');
  NzDemoLayoutTopSideCode = require('!!raw-loader!./nz-demo-layout-top-side.component');
  NzDemoLayoutSideCode = require('!!raw-loader!./nz-demo-layout-side.component');
  NzDemoLayoutTriggerCode = require('!!raw-loader!./nz-demo-layout-trigger.component');
  NzDemoLayoutResponsiveCode = require('!!raw-loader!./nz-demo-layout-responsive.component');
}
