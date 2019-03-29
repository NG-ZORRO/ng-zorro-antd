import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-statistic-basic',
  template: `
    <nz-row [nzGutter]="16">
      <nz-col [nzSpan]="12">
        <nz-statistic [nzValue]="1949101 | number" [nzTitle]="'Active Users'"></nz-statistic>
      </nz-col>
      <nz-col [nzSpan]="12">
        <nz-statistic [nzValue]="2019.111 | number: '1.0-2'" [nzTitle]="'Account Balance (CNY)'"></nz-statistic>
      </nz-col>
    </nz-row>
  `
})
export class NzDemoStatisticBasicComponent {}
