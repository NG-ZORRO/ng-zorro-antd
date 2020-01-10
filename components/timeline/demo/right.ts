import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-timeline-right',
  template: `
    <nz-timeline nzMode="right">
      <nz-timeline-item>Create a services site 2015-09-01</nz-timeline-item>
      <nz-timeline-item>Solve initial network problems 2015-09-01</nz-timeline-item>
      <nz-timeline-item [nzDot]="dotTemplate" nzColor="red">Technical testing 2015-09-01</nz-timeline-item>
      <nz-timeline-item>Network problems being solved 2015-09-01</nz-timeline-item>
    </nz-timeline>
    <ng-template #dotTemplate>
      <i nz-icon nzType="clock-circle-o" style="font-size: 16px;"></i>
    </ng-template>
  `
})
export class NzDemoTimelineRightComponent {}
