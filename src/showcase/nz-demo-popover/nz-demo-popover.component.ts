import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector     : 'nz-demo-popover',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl  : './nz-demo-popover.html'
})

export class NzDemoPopoverComponent {
  NzDemoPopoverBasicCode = require('!!raw-loader!./nz-demo-popover-basic.component');
  NzDemoPonoverLocationCode = require('!!raw-loader!./nz-demo-popover-location.component');
  NzDemoPopoverTriggerCode = require('!!raw-loader!./nz-demo-popover-trigger.component');
  NzDemoPopoverClickHide = require('!!raw-loader!./nz-demo-popover-clickhide.component');
}
