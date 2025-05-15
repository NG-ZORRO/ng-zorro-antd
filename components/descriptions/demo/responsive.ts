import { Component } from '@angular/core';

import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

@Component({
  selector: 'nz-demo-descriptions-responsive',
  imports: [NzDescriptionsModule],
  template: `
    <nz-descriptions
      nzTitle="Responsive Descriptions"
      nzBordered
      [nzColumn]="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
    >
      <nz-descriptions-item nzTitle="Product" [nzTitleBold]="true">Cloud Database</nz-descriptions-item>
      <nz-descriptions-item nzTitle="Billing" [nzTitleBold]="true">Prepaid</nz-descriptions-item>
      <nz-descriptions-item nzTitle="time" [nzTitleBold]="true">18:00:00</nz-descriptions-item>
      <nz-descriptions-item nzTitle="Amount" [nzTitleBold]="true">$80.00</nz-descriptions-item>
      <nz-descriptions-item nzTitle="Discount" [nzTitleBold]="true">$20.00</nz-descriptions-item>
      <nz-descriptions-item nzTitle="Official" [nzTitleBold]="true">$60.00</nz-descriptions-item>
      <nz-descriptions-item nzTitle="Config Info" [nzTitleBold]="true">
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
        <br />
        Storage space: 10 GB
        <br />
        Replication_factor:3
        <br />
        Region: East China 1
        <br />
      </nz-descriptions-item>
    </nz-descriptions>
  `
})
export class NzDemoDescriptionsResponsiveComponent {}
