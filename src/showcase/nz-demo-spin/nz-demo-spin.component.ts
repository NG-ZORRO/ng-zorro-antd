import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-spin',
  encapsulation: ViewEncapsulation.None,
  templateUrl  : './nz-demo-spin.html',
  styleUrls    : [
    './nz-demo-spin.less',
  ]
})
export class NzDemoSpinComponent implements OnInit {
  NzDemoSpinBasicCode = require('!!raw-loader!./nz-demo-spin-basic.component');
  NzDemoSpinInsideCode = require('!!raw-loader!./nz-demo-spin-inside.component');
  NzDemoSpinSizeCode = require('!!raw-loader!./nz-demo-spin-size.component');
  NzDemoSpinTipCode = require('!!raw-loader!./nz-demo-spin-tip.component');
  NzDemoSpinNestedCode = require('!!raw-loader!./nz-demo-spin-nested.component');

  constructor() {
  }

  ngOnInit() {
  }
}
