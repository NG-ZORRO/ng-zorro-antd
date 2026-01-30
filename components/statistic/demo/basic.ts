import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';

@Component({
  selector: 'nz-demo-statistic-basic',
  imports: [DecimalPipe, NzButtonModule, NzGridModule, NzStatisticModule],
  template: `
    <nz-row [nzGutter]="16">
      <nz-col [nzSpan]="12">
        <nz-statistic [nzValue]="(1949101 | number)!" nzTitle="Active Users" />
      </nz-col>
      <nz-col [nzSpan]="12">
        <nz-statistic [nzValue]="(2019.111 | number: '1.0-2')!" nzTitle="Account Balance (CNY)" />
        <button nz-button nzType="primary" [style.margin-top.px]="16">Recharge</button>
      </nz-col>
      <nz-col [nzSpan]="12">
        <nz-statistic [nzValue]="(112893 | number: '1.0-2')!" nzTitle="Active Users" nzLoading />
      </nz-col>
    </nz-row>
  `
})
export class NzDemoStatisticBasicComponent {}
