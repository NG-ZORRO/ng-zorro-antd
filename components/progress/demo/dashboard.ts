import { Component } from '@angular/core';

import { NzProgressModule } from 'ng-zorro-antd/progress';

@Component({
  selector: 'nz-demo-progress-dashboard',
  imports: [NzProgressModule],
  template: `<nz-progress [nzPercent]="75" nzType="dashboard"></nz-progress>`
})
export class NzDemoProgressDashboardComponent {}
