import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-statistic-card',
  template: `
    <div style="background: #ECECEC; padding: 30px;">
      <nz-row [nzGutter]="16">
        <nz-col [nzSpan]="12">
          <nz-card>
            <nz-statistic
              [nzValue]="11.28 | number: '1.0-2'"
              [nzTitle]="'Active'"
              [nzPrefix]="prefixTplOne"
              [nzSuffix]="'%'"
              [nzValueStyle]="{ color: '#3F8600' }"
            >
            </nz-statistic>
            <ng-template #prefixTplOne><i nz-icon nzType="arrow-up"></i></ng-template>
          </nz-card>
        </nz-col>
        <nz-col [nzSpan]="12">
          <nz-card>
            <nz-statistic
              [nzValue]="9.3 | number: '1.0-2'"
              [nzTitle]="'Idle'"
              [nzPrefix]="prefixTplTwo"
              [nzSuffix]="'%'"
              [nzValueStyle]="{ color: '#CF1322' }"
            >
            </nz-statistic>
            <ng-template #prefixTplTwo><i nz-icon nzType="arrow-down"></i></ng-template>
          </nz-card>
        </nz-col>
      </nz-row>
    </div>
  `
})
export class NzDemoStatisticCardComponent {}
