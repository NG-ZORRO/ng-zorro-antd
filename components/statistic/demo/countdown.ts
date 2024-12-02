import { Component } from '@angular/core';

import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';

@Component({
  selector: 'nz-demo-statistic-countdown',
  imports: [NzGridModule, NzStatisticModule],
  template: `
    <nz-row [nzGutter]="16">
      <nz-col [nzSpan]="12">
        <nz-countdown [nzValue]="deadline" nzTitle="Countdown"></nz-countdown>
      </nz-col>
      <nz-col [nzSpan]="12">
        <nz-countdown [nzValue]="deadline" nzTitle="Million Seconds" nzFormat="HH:mm:ss:SSS"></nz-countdown>
      </nz-col>
      <nz-col [nzSpan]="24" style="margin-top: 32px;">
        <nz-countdown [nzValue]="deadline" nzTitle="Day Level" nzFormat="D 天 H 时 m 分 s 秒"></nz-countdown>
      </nz-col>
    </nz-row>
  `
})
export class NzDemoStatisticCountdownComponent {
  deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
}
