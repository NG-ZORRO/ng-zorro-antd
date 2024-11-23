import { Component } from '@angular/core';

import { NzProgressModule } from 'ng-zorro-antd/progress';

@Component({
  selector: 'nz-demo-progress-step',
  standalone: true,
  imports: [NzProgressModule],
  template: `
    <nz-progress [nzPercent]="50" [nzSteps]="3" nzStrokeColor="#1890ff"></nz-progress>
    <nz-progress [nzPercent]="30" [nzSteps]="5" nzStrokeColor="#1890ff"></nz-progress>
    <nz-progress [nzPercent]="100" [nzSteps]="5" nzStrokeColor="#1890ff" nzSize="small"></nz-progress>
  `
})
export class NzDemoProgressStepComponent {}
