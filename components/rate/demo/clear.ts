import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzRateModule } from 'ng-zorro-antd/rate';

@Component({
  selector: 'nz-demo-rate-clear',
  imports: [FormsModule, NzRateModule],
  template: `
    <nz-rate [(ngModel)]="value" nzAllowHalf></nz-rate>
    <span class="ant-rate-text">allowClear: true</span>
    <br />
    <nz-rate [(ngModel)]="value" nzAllowHalf [nzAllowClear]="false"></nz-rate>
    <span class="ant-rate-text">allowClear: false</span>
  `
})
export class NzDemoRateClearComponent {
  value = 0;
}
