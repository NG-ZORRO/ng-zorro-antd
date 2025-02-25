import { Component } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';

@Component({
  selector: 'nz-demo-timeline-right',
  imports: [NzIconModule, NzTimelineModule],
  template: `
    <nz-timeline nzMode="right">
      <nz-timeline-item>Create a services site 2015-09-01</nz-timeline-item>
      <nz-timeline-item>Solve initial network problems 2015-09-01</nz-timeline-item>
      <nz-timeline-item [nzDot]="dotTemplate" nzColor="red">Technical testing 2015-09-01</nz-timeline-item>
      <nz-timeline-item>Network problems being solved 2015-09-01</nz-timeline-item>
    </nz-timeline>
    <ng-template #dotTemplate>
      <nz-icon nzType="clock-circle-o" style="font-size: 16px;" />
    </ng-template>
  `
})
export class NzDemoTimelineRightComponent {}
