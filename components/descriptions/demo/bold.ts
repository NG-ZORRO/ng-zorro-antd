import { Component } from '@angular/core';

import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

@Component({
  selector: 'nz-demo-descriptions-bold',
  imports: [NzDescriptionsModule],
  template: `
    <nz-descriptions nzTitle="User Info">
      <nz-descriptions-item nzTitle="UserName" [nzTitleBold]="true">Zhou Maomao</nz-descriptions-item>
      <nz-descriptions-item nzTitle="Telephone" [nzTitleBold]="true">18100000000</nz-descriptions-item>
      <nz-descriptions-item nzTitle="Live" [nzTitleBold]="true">Hangzhou, Zhejiang</nz-descriptions-item>
      <nz-descriptions-item nzTitle="Remark" [nzTitleBold]="true">Empty</nz-descriptions-item>
      <nz-descriptions-item nzTitle="Address" [nzTitleBold]="true">
        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
      </nz-descriptions-item>
    </nz-descriptions>
  `
})
export class NzDemoDescriptionsBoldComponent {}
