import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector     : 'nz-demo-popconfirm',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl  : './nz-demo-popconfirm.html'
})

export class NzDemoPopconfirmComponent implements OnInit {
  NzDemoPopconfirmBasicCode = require('!!raw-loader!./nz-demo-popconfirm-basic.component');
  NzDemoPopconfirmLocalCode = require('!!raw-loader!./nz-demo-popconfirm-locale.component');
  NzDemoPopconfirmLocationCode = require('!!raw-loader!./nz-demo-popconfirm-location.component');
  NzDemoPopconfirmKickCode = require('!!raw-loader!./nz-demo-popconfirm-kick.component');

  constructor() {
  }

  ngOnInit() {
  }
}
