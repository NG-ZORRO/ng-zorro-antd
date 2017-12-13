import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-grid',
  encapsulation: ViewEncapsulation.None,
  templateUrl  : './nz-demo-grid.html',
  styleUrls    : [
    './nz-demo-grid.less',
  ]
})
export class NzDemoGridComponent {
  NzDemoGridBasicCode = require('!!raw-loader!./nz-demo-grid-basic.component');
  NzDemoGridGutterCode = require('!!raw-loader!./nz-demo-grid-gutter.component');
  NzDemoGridGutterConfigCode = require('!!raw-loader!./nz-demo-grid-gutter-config.component');
  NzDemoGridOffsetCode = require('!!raw-loader!./nz-demo-grid-offset.component');
  NzDemoGridSortCode = require('!!raw-loader!./nz-demo-grid-sort.component');
  NzDemoGridFlexCode = require('!!raw-loader!./nz-demo-grid-flex.component');
  NzDemoGridFlexAlignCode = require('!!raw-loader!./nz-demo-grid-flex-align.component');
  NzDemoGridFlexOrderCode = require('!!raw-loader!./nz-demo-grid-flex-order.component');
  NzDemoGridResponsiveCode = require('!!raw-loader!./nz-demo-grid-responsive.component');
  NzDemoGridResponsiveMoreCode = require('!!raw-loader!./nz-demo-grid-responsive-more.component');
}
