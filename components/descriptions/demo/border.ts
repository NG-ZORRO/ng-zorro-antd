import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-descriptions-border',
  template: `
    <nz-descriptions nzTitle="User Info" nzBordered>
      <nz-descriptions-item nzTitle="Product">Cloud Database</nz-descriptions-item>
      <nz-descriptions-item nzTitle="Billing Mode">Prepaid</nz-descriptions-item>
      <nz-descriptions-item nzTitle="Automatic Renewal">YES</nz-descriptions-item>
      <nz-descriptions-item nzTitle="Order Time">
        2018-04-24 18:00:00
      </nz-descriptions-item>
      <nz-descriptions-item nzTitle="Usage Time" [nzSpan]="2">
        2018-04-24 18:00:00 To 2019-04-24 18:00:00
      </nz-descriptions-item>
      <nz-descriptions-item nzTitle="Status" [nzSpan]="3">
        <nz-badge nzStatus="processing" nzText="Running"></nz-badge>
      </nz-descriptions-item>
      <nz-descriptions-item nzTitle="Negotiated Amount">$80.00</nz-descriptions-item>
      <nz-descriptions-item nzTitle="Discount">$20.00</nz-descriptions-item>
      <nz-descriptions-item nzTitle="Official Receipts">$60.00</nz-descriptions-item>
      <nz-descriptions-item nzTitle="Config Info">
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
        Region: East China 1<br />
      </nz-descriptions-item>
    </nz-descriptions>
  `
})
export class NzDemoDescriptionsBorderComponent {}
