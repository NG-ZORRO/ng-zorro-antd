import { Component } from '@angular/core';

import { NzProgressModule } from 'ng-zorro-antd/progress';

@Component({
  selector: 'nz-demo-progress-circle-mini',
  imports: [NzProgressModule],
  template: `
    <nz-progress [nzPercent]="75" nzType="circle" [nzWidth]="80"></nz-progress>
    <nz-progress [nzPercent]="70" nzType="circle" [nzWidth]="80" nzStatus="exception"></nz-progress>
    <nz-progress [nzPercent]="100" nzType="circle" [nzWidth]="80"></nz-progress>
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
export class NzDemoProgressCircleMiniComponent {}
