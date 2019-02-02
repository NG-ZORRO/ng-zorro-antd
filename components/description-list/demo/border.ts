import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-description-list-border',
  template: `
    <nz-description-list nzTitle="User Info" nzBorder>
      <nz-description-list-item nzTitle="Product">Cloud Database</nz-description-list-item>
      <nz-description-list-item nzTitle="Billing Mode">Prepaid</nz-description-list-item>
      <nz-description-list-item nzTitle="Automatic Renewal">YES</nz-description-list-item>
      <nz-description-list-item nzTitle="Order Time">
        2018-04-24 18:00:00
      </nz-description-list-item>
      <nz-description-list-item nzTitle="Usage Time" [nzSpan]="3">
        2018-04-24 18:00:00 To 2019-04-24 18:00:00
      </nz-description-list-item>
      <nz-description-list-item nzTitle="Status" [nzSpan]="3">
        <nz-badge nzStatus="processing" nzText="Running"></nz-badge>
      </nz-description-list-item>
      <nz-description-list-item nzTitle="Negotiated Amount">$80.00</nz-description-list-item>
      <nz-description-list-item nzTitle="Discount">$20.00</nz-description-list-item>
      <nz-description-list-item nzTitle="Official Receipts">$60.00</nz-description-list-item>
      <nz-description-list-item nzTitle="Config Info">
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
      </nz-description-list-item>
    </nz-description-list>
  `
})
export class NzDemoDescriptionListBorderComponent {
}
