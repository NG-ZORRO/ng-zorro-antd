import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-progress-segment',
  template: `
    <nz-progress
      nz-tooltip
      nzTitle="3 done / 3 in progress / 4 to do"
      [nzPercent]="60"
      [nzSuccessPercent]="30"
    ></nz-progress>
  `
})
export class NzDemoProgressSegmentComponent {}
