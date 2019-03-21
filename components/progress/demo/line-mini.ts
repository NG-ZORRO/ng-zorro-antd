import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-progress-line-mini',
  template: `
    <div style="width: 170px;">
      <nz-progress [nzPercent]="30" nzSize="small"></nz-progress>
      <nz-progress [nzPercent]="50" nzSize="small" nzStatus="active"></nz-progress>
      <nz-progress [nzPercent]="70" nzSize="small" nzStatus="exception"></nz-progress>
      <nz-progress [nzPercent]="100" nzSize="small"></nz-progress>
      <nz-progress [nzPercent]="50" nzSize="small" [nzShowInfo]="false"></nz-progress>
    </div>
  `
})
export class NzDemoProgressLineMiniComponent {}
