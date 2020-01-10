import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-rate-clear',
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
