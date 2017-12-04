import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector     : 'nz-demo-tabs',
  encapsulation: ViewEncapsulation.None,
  templateUrl  : './nz-demo-tabs.html',
  styleUrls       : [
    './nz-demo-tabs.less',
  ]
})
export class NzDemoTabsComponent {
  NzDemoTabsBasicCode = require('!!raw-loader!./nz-demo-tabs-basic.component');
  NzDemoTabsPositionCode = require('!!raw-loader!./nz-demo-tabs-position.component');
  NzDemoTabsCardCode = require('!!raw-loader!./nz-demo-tabs-card.component');
  NzDemoTabsDisabledCode = require('!!raw-loader!./nz-demo-tabs-disabled.component');
  NzDemoTabsIconCode = require('!!raw-loader!./nz-demo-tabs-icon.component');
  NzDemoTabsMoveCode = require('!!raw-loader!./nz-demo-tabs-move.component');
  NzDemoTabsMiniCode = require('!!raw-loader!./nz-demo-tabs-mini.component');
  NzDemoTabsExtraCode = require('!!raw-loader!./nz-demo-tabs-extra.component');
  NzDemoTabsOperationCode = require('!!raw-loader!./nz-demo-tabs-operation.component');
}
