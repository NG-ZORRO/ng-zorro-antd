import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-pagination',
  encapsulation: ViewEncapsulation.None,
  templateUrl  : './nz-demo-pagination.html',
  styleUrls    : [
    './nz-demo-pagination.less',
  ]
})
export class NzDemoPaginationComponent {
  NzDemoPaginationBasicCode = require('!!raw-loader!./nz-demo-pagination-basic.component');
  NzDemoPaginationMoreCode = require('!!raw-loader!./nz-demo-pagination-more.component');
  NzDemoPaginationChangerCode = require('!!raw-loader!./nz-demo-pagination-changer.component');
  NzDemoPaginationJumpCode = require('!!raw-loader!./nz-demo-pagination-jump.component');
  NzDemoPaginationMiniCode = require('!!raw-loader!./nz-demo-pagination-mini.component');
  NzDemoPaginationSimpleCode = require('!!raw-loader!./nz-demo-pagination-simple.component');
  NzDemoPaginationTotalCode = require('!!raw-loader!./nz-demo-pagination-total.component');
}
