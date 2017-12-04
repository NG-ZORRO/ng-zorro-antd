import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-breadcrumb',
  templateUrl  : './nz-demo-breadcrumb.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls    : [
    './nz-demo-breadcrumb.less'
  ]
})
export class NzDemoBreadCrumbComponent {
  NzDemoBreadCrumbBasicCode = require('!!raw-loader!./nz-demo-breadcrumb-basic.component');
  NzDemoBreadCrumbIconCode = require('!!raw-loader!./nz-demo-breadcrumb-icon.component');
  NzDemoBreadCrumbSeparatorCode = require('!!raw-loader!./nz-demo-breadcrumb-separator.component');
}
