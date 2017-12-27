import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-card',
  templateUrl  : './nz-demo-card.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls    : [
    './nz-demo-card.less'
  ]
})
export class NzDemoCardComponent {
  NzDemoCardBasicCode = require('!!raw-loader!./nz-demo-card-basic.component');
  NzDemoCardBorderCode = require('!!raw-loader!./nz-demo-card-border.component');
  NzDemoCardSimpleCode = require('!!raw-loader!./nz-demo-card-simple.component');
  NzDemoCardFlexCode = require('!!raw-loader!./nz-demo-card-flex.component');
  NzDemoCardGridCode = require('!!raw-loader!./nz-demo-card-grid.component');
  NzDemoCardLoadingCode = require('!!raw-loader!./nz-demo-card-loading.component');
  NzDemoCardInnerCode = require('!!raw-loader!./nz-demo-card-inner.component');
}
