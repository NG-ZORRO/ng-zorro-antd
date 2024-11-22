import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';

import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';

@Component({
  selector: 'nz-demo-statistic-unit',
  standalone: true,
  imports: [DecimalPipe, NzGridModule, NzIconModule, NzStatisticModule],
  template: `
    <nz-row [nzGutter]="16">
      <nz-col [nzSpan]="12">
        <nz-statistic [nzValue]="(1128 | number)!" nzTitle="Feedback" [nzPrefix]="prefixTpl"></nz-statistic>
        <ng-template #prefixTpl><span nz-icon nzType="like"></span></ng-template>
      </nz-col>
      <nz-col [nzSpan]="12">
        <nz-statistic [nzValue]="93" nzTitle="Unmerged" nzSuffix="/ 100"></nz-statistic>
      </nz-col>
    </nz-row>
  `
})
export class NzDemoStatisticUnitComponent {}
