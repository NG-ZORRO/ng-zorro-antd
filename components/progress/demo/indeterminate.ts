import { Component } from '@angular/core';

import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzProgressModule } from 'ng-zorro-antd/progress';

@Component({
  selector: 'nz-demo-progress-indeterminate',
  imports: [NzFlexModule, NzProgressModule],
  template: `
    <div nz-flex nzVertical nzGap="small">
      <nz-progress [nzIndeterminate]="true"></nz-progress>
      <nz-progress [nzIndeterminate]="true" nzStatus="exception"></nz-progress>
      <nz-progress [nzIndeterminate]="true" nzStatus="success"></nz-progress>
      <nz-progress [nzIndeterminate]="true" [nzShowInfo]="false"></nz-progress>
    </div>
  `
})
export class NzDemoProgressIndeterminateComponent {}
