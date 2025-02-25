import { Component } from '@angular/core';

import { NzTimelineModule } from 'ng-zorro-antd/timeline';

@Component({
  selector: 'nz-demo-timeline-color',
  imports: [NzTimelineModule],
  template: `
    <nz-timeline>
      <nz-timeline-item nzColor="green">Create a services site 2015-09-01</nz-timeline-item>
      <nz-timeline-item nzColor="green">Solve initial network problems 2015-09-01</nz-timeline-item>
      <nz-timeline-item nzColor="red">
        <p>Solve initial network problems 1</p>
        <p>Solve initial network problems 2</p>
        <p>Solve initial network problems 3 2015-09-01</p>
      </nz-timeline-item>
      <nz-timeline-item>
        <p>Technical testing 1</p>
        <p>Technical testing 2</p>
        <p>Technical testing 3 2015-09-01</p>
      </nz-timeline-item>
      <nz-timeline-item nzColor="gray">
        <p>Technical testing 1</p>
        <p>Technical testing 2</p>
        <p>Technical testing 3 2015-09-01</p>
      </nz-timeline-item>
      <nz-timeline-item nzColor="gray">
        <p>Technical testing 1</p>
        <p>Technical testing 2</p>
        <p>Technical testing 3 2015-09-01</p>
      </nz-timeline-item>
    </nz-timeline>
  `
})
export class NzDemoTimelineColorComponent {}
