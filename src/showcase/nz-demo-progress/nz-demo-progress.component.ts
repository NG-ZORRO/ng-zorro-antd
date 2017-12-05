import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-progress',
  encapsulation: ViewEncapsulation.None,
  templateUrl  : './nz-demo-progress.html',
  styleUrls    : [
    './nz-demo-progress.less',
  ]
})
export class NzDemoProgressComponent {
  NzDemoProgressBasicCode = require('!!raw-loader!./nz-demo-progress-basic.component');
  NzDemoProgressCircleCode = require('!!raw-loader!./nz-demo-progress-circle.component');
  NzDemoProgressLineMiniCode = require('!!raw-loader!./nz-demo-progress-line-mini.component');
  NzDemoProgressCircleMiniCode = require('!!raw-loader!./nz-demo-progress-circle-mini.component');
  NzDemoProgressCircleDynamicCode = require('!!raw-loader!./nz-demo-progress-circle-dynamic.component');
  NzDemoProgressLineDynamicCode = require('!!raw-loader!./nz-demo-progress-line-dynamic.component');
  NzDemoProgressFormatCode = require('!!raw-loader!./nz-demo-progress-format.component');
}
