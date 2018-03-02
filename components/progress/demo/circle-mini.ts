import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-progress-circle-mini',
  template: `
    <nz-progress [nzPercent]="75" nzType="circle" [nzWidth]="80"></nz-progress>
    <nz-progress [nzPercent]="70" nzType="circle" [nzWidth]="80" nzStatus="exception"></nz-progress>
    <nz-progress [nzPercent]="100" nzType="circle" [nzWidth]="80"></nz-progress>
  `
})
export class NzDemoProgressCircleMiniComponent { }
