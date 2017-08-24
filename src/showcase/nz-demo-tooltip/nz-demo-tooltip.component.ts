import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector     : 'nz-demo-tooltip',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl  : './nz-demo-tooltip.html',
  styleUrls    : [
    './nz-demo-tooltip.less',
  ]
})
export class NzDemoTooltipComponent implements OnInit {
  NzDemoTooltipBasicCode = require('!!raw-loader!./nz-demo-tooltip-basic.component');
  NzDemoTooltipPositionCode = require('!!raw-loader!./nz-demo-tooltip-position.component');
  NzDemoTooltipTemplateCode = require('!!raw-loader!./nz-demo-tooltip-template.component');

  constructor() {
  }

  ngOnInit() {
  }
}

