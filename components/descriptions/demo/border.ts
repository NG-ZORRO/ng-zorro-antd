import { Component } from '@angular/core';

import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

@Component({
  selector: 'nz-demo-descriptions-border',
  imports: [NzBadgeModule, NzDescriptionsModule],
  template: `
    <nz-descriptions nzTitle="User Info" nzBordered>
      <nz-descriptions-item nzTitle="Product" [nzTitleBold]="true">Cloud Database</nz-descriptions-item>
      <nz-descriptions-item nzTitle="Billing Mode" [nzTitleBold]="true">Prepaid</nz-descriptions-item>
      <nz-descriptions-item nzTitle="Automatic Renewal" [nzTitleBold]="true">YES</nz-descriptions-item>
      <nz-descriptions-item nzTitle="Order Time" [nzTitleBold]="true">2018-04-24 18:00:00</nz-descriptions-item>
      <nz-descriptions-item nzTitle="Usage Time" [nzTitleBold]="true" [nzSpan]="2">
        2018-04-24 18:00:00 To 2019-04-24 18:00:00
      </nz-descriptions-item>
      <nz-descriptions-item nzTitle="Status" [nzTitleBold]="true" [nzSpan]="3">
        <nz-badge nzStatus="processing" nzText="Running"></nz-badge>
      </nz-descriptions-item>
      <nz-descriptions-item nzTitle="Negotiated Amount" [nzTitleBold]="true">$80.00</nz-descriptions-item>
      <nz-descriptions-item nzTitle="Discount" [nzTitleBold]="true">$20.00</nz-descriptions-item>
      <nz-descriptions-item nzTitle="Official Receipts" [nzTitleBold]="true">$60.00</nz-descriptions-item>
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
export class NzDemoDescriptionsBorderComponent {}
