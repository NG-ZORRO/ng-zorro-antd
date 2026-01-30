import { Component } from '@angular/core';

import { NzProgressModule } from 'ng-zorro-antd/progress';

@Component({
  selector: 'nz-demo-progress-line-mini',
  imports: [NzProgressModule],
  template: `
    <div style="width: 170px;">
      <nz-progress [nzPercent]="30" nzSize="small" />
      <nz-progress [nzPercent]="50" nzSize="small" nzStatus="active" />
      <nz-progress [nzPercent]="70" nzSize="small" nzStatus="exception" />
      <nz-progress [nzPercent]="100" nzSize="small" />
      <nz-progress [nzPercent]="50" nzSize="small" [nzShowInfo]="false" />
    </div>
  `
})
export class NzDemoProgressLineMiniComponent {}
