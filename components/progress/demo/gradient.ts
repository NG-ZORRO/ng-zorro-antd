import { Component } from '@angular/core';

import { NzProgressModule } from 'ng-zorro-antd/progress';

@Component({
  selector: 'nz-demo-progress-gradient',
  imports: [NzProgressModule],
  template: `
    <nz-progress [nzPercent]="99.9" [nzStrokeColor]="{ '0%': '#108ee9', '100%': '#87d068' }" />
    <nz-progress [nzPercent]="99.9" [nzStrokeColor]="{ '0%': '#108ee9', '100%': '#87d068' }" nzStatus="active" />
    <nz-progress
      nzType="circle"
      [nzPercent]="90"
      [nzStrokeColor]="{ '0%': '#108ee9', '50%': '#2db7f5', '100%': '#87d068' }"
    />
    <nz-progress nzType="dashboard" [nzPercent]="100" [nzStrokeColor]="{ '0%': '#108ee9', '100%': '#87d068' }" />
  `,
  styles: `
    .ant-progress {
      display: inline-block;
      margin-inline-end: 8px;
      margin-bottom: 8px;
    }
  `
})
export class NzDemoProgressGradientComponent {}
