import { Component } from '@angular/core';

import { NzProgressModule } from 'ng-zorro-antd/progress';

@Component({
  selector: 'nz-demo-progress-dashboard-layout',
  imports: [NzProgressModule],
  template: `
    <nz-progress [nzPercent]="1" nzType="dashboard" [nzGapDegree]="90"></nz-progress>
    <nz-progress [nzPercent]="75" nzType="dashboard" [nzGapDegree]="180"></nz-progress>
    <nz-progress [nzPercent]="75" nzType="dashboard" [nzGapDegree]="295"></nz-progress>
    <nz-progress [nzPercent]="1" nzType="dashboard" [nzGapDegree]="340"></nz-progress>
  `
})
export class NzDemoProgressDashboardLayoutComponent {}
