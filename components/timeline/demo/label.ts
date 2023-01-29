import { Component } from '@angular/core';

import { NzTimelineMode } from 'ng-zorro-antd/timeline';

@Component({
  selector: 'nz-demo-timeline-label',
  template: `
    <nz-radio-group [(ngModel)]="mode" [ngStyle]="{ 'margin-bottom': '20px' }">
      <label nz-radio nzValue="left">Left</label>
      <label nz-radio nzValue="right">Right</label>
      <label nz-radio nzValue="alternate">Alternative</label>
    </nz-radio-group>
    <nz-timeline [nzMode]="mode">
      <nz-timeline-item nzLabel="2015-09-01">Create a services</nz-timeline-item>
      <nz-timeline-item nzLabel="2015-09-01 09:12:11">Solve initial network problems</nz-timeline-item>
      <nz-timeline-item>Technical testing</nz-timeline-item>
      <nz-timeline-item nzLabel="2015-09-01 09:12:11">Network problems being solved</nz-timeline-item>
    </nz-timeline>
  `
})
export class NzDemoTimelineLabelComponent {
  mode: NzTimelineMode = 'left';
}
