import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-progress-segment',
  template: `
    <nz-tooltip nzTitle="3 done / 3 in progress / 4 to do">
      <nz-progress nz-tooltip [nzPercent]="60" [nzSuccessPercent]="30"></nz-progress>
    </nz-tooltip>
  `
})
export class NzDemoProgressSegmentComponent { }
