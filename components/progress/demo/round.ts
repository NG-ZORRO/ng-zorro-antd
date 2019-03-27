import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-progress-round',
  template: `
    <nz-progress nzStrokeLinecap="square" nzPercent="75"></nz-progress>
    <nz-progress nzStrokeLinecap="square" nzType="circle" nzPercent="75"></nz-progress>
    <nz-progress nzStrokeLinecap="square" nzType="dashboard" nzPercent="75"></nz-progress>
  `
})
export class NzDemoProgressRoundComponent {}
