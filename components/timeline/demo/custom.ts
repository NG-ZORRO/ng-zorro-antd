import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-timeline-custom',
  template: `
    <nz-timeline>
      <nz-timeline-item>Create a services site 2015-09-01</nz-timeline-item>
      <nz-timeline-item>Solve initial network problems 2015-09-01</nz-timeline-item>
      <nz-timeline-item nzColor="red" [nzDot]="dotTemplate">Technical testing 2015-09-01</nz-timeline-item>
      <nz-timeline-item>Network problems being solved 2015-09-01</nz-timeline-item>
    </nz-timeline>
    <ng-template #dotTemplate>
      <i nz-icon type="clock-circle-o" style="font-size: 16px;"></i>
    </ng-template>
  `
})
export class NzDemoTimelineCustomComponent {}
