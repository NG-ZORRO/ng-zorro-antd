import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-timeline',
  encapsulation: ViewEncapsulation.None,
  templateUrl  : './nz-demo-timeline.html',
  styleUrls    : []
})
export class NzDemoTimelineComponent {
  NzDemoTimelineBasicCode = require('!!raw-loader!./nz-demo-timeline-basic.component');
  NzDemoTimelineColorCode = require('!!raw-loader!./nz-demo-timeline-color.component');
  NzDemoTimelinePendingCode = require('!!raw-loader!./nz-demo-timeline-pending.component');
  NzDemoTimelineCustomCode = require('!!raw-loader!./nz-demo-timeline-custom.component');
}
