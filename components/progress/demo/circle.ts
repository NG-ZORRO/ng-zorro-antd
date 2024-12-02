import { Component } from '@angular/core';

import { NzProgressModule } from 'ng-zorro-antd/progress';

@Component({
  selector: 'nz-demo-progress-circle',
  imports: [NzProgressModule],
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
