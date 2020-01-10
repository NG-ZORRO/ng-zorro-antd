import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-progress-round',
  template: `
    <nz-progress nzStrokeLinecap="round" nzPercent="75"></nz-progress>
    <nz-progress nzStrokeLinecap="round" nzType="circle" nzPercent="75"></nz-progress>
    <nz-progress nzStrokeLinecap="square" nzType="dashboard" nzPercent="75"></nz-progress>
  `
})
export class NzDemoProgressRoundComponent {}
