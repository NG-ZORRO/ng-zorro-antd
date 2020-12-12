import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-progress-segment',
  template: `
    <nz-progress nz-tooltip nzTitle="3 done / 3 in progress / 4 to do" [nzPercent]="60" [nzSuccess]="{ percent: 30 }"></nz-progress>
    <nz-progress
      nz-tooltip
      nzTitle="3 done / 3 in progress / 4 to do"
      nzType="circle"
      [nzPercent]="60"
      [nzSuccess]="{ percent: 30 }"
    ></nz-progress>
    <nz-progress
      nz-tooltip
      nzTitle="3 done / 3 in progress / 4 to do"
      nzType="dashboard"
      [nzPercent]="60"
      [nzSuccess]="{ percent: 30, strokeColor: '#ff4d4f' }"
    ></nz-progress>
  `
})
export class NzDemoProgressSegmentComponent {}
