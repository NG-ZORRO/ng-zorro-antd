import { Component } from '@angular/core';

import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'nz-demo-progress-segment',
  imports: [NzProgressModule, NzTooltipModule],
  template: `
    <nz-progress
      nz-tooltip
      nzTooltipTitle="3 done / 3 in progress / 4 to do"
      [nzPercent]="60"
      [nzSuccessPercent]="30"
    />
    <nz-progress
      nz-tooltip
      nzTooltipTitle="3 done / 3 in progress / 4 to do"
      nzType="circle"
      [nzPercent]="60"
      [nzSuccessPercent]="30"
    />
    <nz-progress
      nz-tooltip
      nzTooltipTitle="3 done / 3 in progress / 4 to do"
      nzType="dashboard"
      [nzPercent]="60"
      [nzSuccessPercent]="30"
    />
  `
})
export class NzDemoProgressSegmentComponent {}
