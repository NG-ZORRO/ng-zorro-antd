import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-progress-line-mini',
  template: `
    <div style="width: 170px;">
      <nz-progress [nzPercent]="30" [nzStrokeWidth]="6"></nz-progress>
      <nz-progress [nzPercent]="50" [nzStrokeWidth]="6" nzStatus="active"></nz-progress>
      <nz-progress [nzPercent]="70" [nzStrokeWidth]="6" nzStatus="exception"></nz-progress>
      <nz-progress [nzPercent]="100" [nzStrokeWidth]="6"></nz-progress>
      <nz-progress [nzPercent]="50" [nzStrokeWidth]="6" [nzShowInfo]="false"></nz-progress>
    </div>
  `
})
export class NzDemoProgressLineMiniComponent {
}
