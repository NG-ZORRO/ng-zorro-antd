import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-collapse',
  templateUrl  : './nz-demo-collapse.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls    : [
    './nz-demo-collapse.less'
  ]
})
export class NzDemoCollapseComponent {
  NzDemoCollapseBasicCode = require('!!raw-loader!./nz-demo-collapse-basic.component');
  NzDemoCollapseNestCode = require('!!raw-loader!./nz-demo-collapse-nest.component');
  NzDemoCollapseAccordionCode = require('!!raw-loader!./nz-demo-collapse-accordion.component');
  NzDemoCollapseBorderCode = require('!!raw-loader!./nz-demo-collapse-border.component');
  NzDemoCollapseCustomCode = require('!!raw-loader!./nz-demo-collapse-custom.component');
}
