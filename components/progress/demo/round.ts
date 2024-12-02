import { Component } from '@angular/core';

import { NzProgressModule } from 'ng-zorro-antd/progress';

@Component({
  selector: 'nz-demo-progress-round',
  imports: [NzProgressModule],
  template: `
    <nz-progress nzStrokeLinecap="round" nzPercent="75"></nz-progress>
    <nz-progress nzStrokeLinecap="round" nzType="circle" nzPercent="75"></nz-progress>
    <nz-progress nzStrokeLinecap="square" nzType="dashboard" nzPercent="75"></nz-progress>
  `
})
export class NzDemoProgressRoundComponent {}
