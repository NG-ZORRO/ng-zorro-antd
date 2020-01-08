import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-progress-step',
  template: `
    <nz-progress [nzPercent]="50" [nzSteps]="3" nzStrokeColor="#1890ff"></nz-progress>
    <nz-progress [nzPercent]="30" [nzSteps]="5" nzStrokeColor="#1890ff"></nz-progress>
    <nz-progress [nzPercent]="100" [nzSteps]="5" nzStrokeColor="#1890ff" nzSize="small"></nz-progress>
  `
})
export class NzDemoProgressStepComponent {}
