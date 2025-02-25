import { Component } from '@angular/core';

import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

@Component({
  selector: 'nz-demo-descriptions-vertical',
  imports: [NzDescriptionsModule],
  template: `
    <nz-descriptions nzTitle="User Info" nzLayout="vertical">
      <nz-descriptions-item nzTitle="UserName">Zhou Maomao</nz-descriptions-item>
      <nz-descriptions-item nzTitle="Telephone">1810000000</nz-descriptions-item>
      <nz-descriptions-item nzTitle="Live">Hangzhou, Zhejiang</nz-descriptions-item>
      <nz-descriptions-item nzTitle="Address" [nzSpan]="2">
        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
      </nz-descriptions-item>
      <nz-descriptions-item nzTitle="Remark">empty</nz-descriptions-item>
    </nz-descriptions>
  `
})
export class NzDemoDescriptionsVerticalComponent {}
