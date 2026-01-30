import { Component } from '@angular/core';

import { NzProgressModule } from 'ng-zorro-antd/progress';

@Component({
  selector: 'nz-demo-progress-line',
  imports: [NzProgressModule],
  template: `
    <nz-progress [nzPercent]="30" />
    <nz-progress [nzPercent]="50" nzStatus="active" />
    <nz-progress [nzPercent]="70" nzStatus="exception" />
    <nz-progress [nzPercent]="100" />
    <nz-progress [nzPercent]="50" [nzShowInfo]="false" />
  `
})
export class NzDemoProgressLineComponent {}
