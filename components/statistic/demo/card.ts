import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';

@Component({
  selector: 'nz-demo-statistic-card',
  standalone: true,
  imports: [DecimalPipe, NzCardModule, NzGridModule, NzIconModule, NzStatisticModule],
  template: `
    <div style="background: #ECECEC; padding: 30px;">
      <nz-row [nzGutter]="16">
        <nz-col [nzSpan]="12">
          <nz-card>
            <nz-statistic
              [nzValue]="(11.28 | number: '1.0-2')!"
              nzTitle="Active"
              [nzPrefix]="prefixTplOne"
              nzSuffix="%"
              [nzValueStyle]="{ color: '#3F8600' }"
            ></nz-statistic>
            <ng-template #prefixTplOne><span nz-icon nzType="arrow-up"></span></ng-template>
          </nz-card>
        </nz-col>
        <nz-col [nzSpan]="12">
          <nz-card>
            <nz-statistic
              [nzValue]="(9.3 | number: '1.0-2')!"
              nzTitle="Idle"
              [nzPrefix]="prefixTplTwo"
              nzSuffix="%"
              [nzValueStyle]="{ color: '#CF1322' }"
            ></nz-statistic>
            <ng-template #prefixTplTwo><span nz-icon nzType="arrow-down"></span></ng-template>
          </nz-card>
        </nz-col>
      </nz-row>
    </div>
  `
})
export class NzDemoStatisticCardComponent {}
