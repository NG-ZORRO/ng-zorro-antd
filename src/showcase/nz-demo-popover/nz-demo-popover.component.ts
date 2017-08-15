import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-popover',
  encapsulation: ViewEncapsulation.None,
  templateUrl  : './nz-demo-popover.html'
})

export class NzDemoPopoverComponent implements OnInit {
  NzDemoPopoverBasicCode = require('!!raw-loader!./nz-demo-popover-basic.component');
  NzDemoPonoverLocationCode = require('!!raw-loader!./nz-demo-popover-location.component');
  NzDemoPopoverTriggerCode = require('!!raw-loader!./nz-demo-popover-trigger.component');
  NzDemoPopoverClickHide = require('!!raw-loader!./nz-demo-popover-clickhide.component');

  constructor() {
  }

  ngOnInit() {
  }
}
