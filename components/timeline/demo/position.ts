import { Component } from '@angular/core';

import { NzTimelineModule } from 'ng-zorro-antd/timeline';

@Component({
  selector: 'nz-demo-timeline-position',
  imports: [NzTimelineModule],
  template: `
    <nz-timeline nzMode="custom">
      <nz-timeline-item nzPosition="left" [nzDot]="soccerTemplate">Alice 20'</nz-timeline-item>
      <nz-timeline-item nzPosition="left" [nzDot]="soccerTemplate">Susan 28'</nz-timeline-item>
      <nz-timeline-item nzPosition="right" nzColor="red" [nzDot]="soccerTemplate">Tim 45'</nz-timeline-item>
      <nz-timeline-item nzPosition="left" [nzDot]="soccerTemplate">Bob 79'</nz-timeline-item>
    </nz-timeline>
    <ng-template #soccerTemplate>⚽</ng-template>
  `
})
export class NzDemoTimelinePositionComponent {}
