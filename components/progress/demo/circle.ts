import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-progress-circle',
  template: `
    <nz-progress [nzPercent]="75" nzType="circle"></nz-progress>
    <nz-progress [nzPercent]="70" nzType="circle" nzStatus="exception"></nz-progress>
    <nz-progress [nzPercent]="100" nzType="circle"></nz-progress>
  `,
  styles: [
    `
      nz-progress {
        margin-right: 8px;
        margin-bottom: 8px;
        display: inline-block;
      }
    `
  ]
})
export class NzDemoProgressCircleComponent {}
