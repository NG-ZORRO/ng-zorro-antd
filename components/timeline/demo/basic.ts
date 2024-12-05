import { Component } from '@angular/core';

import { NzTimelineModule } from 'ng-zorro-antd/timeline';

@Component({
  selector: 'nz-demo-timeline-basic',
  imports: [NzTimelineModule],
  template: `
    <nz-timeline>
      <nz-timeline-item>Create a services site 2015-09-01</nz-timeline-item>
      <nz-timeline-item>Solve initial network problems 2015-09-01</nz-timeline-item>
      <nz-timeline-item>Technical testing 2015-09-01</nz-timeline-item>
      <nz-timeline-item>Network problems being solved 2015-09-01</nz-timeline-item>
    </nz-timeline>
  `
})
export class NzDemoTimelineBasicComponent {}
