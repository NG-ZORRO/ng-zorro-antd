import { Component } from '@angular/core';
import { NzDescriptionsSize } from 'ng-zorro-antd/descriptions';

@Component({
  selector: 'nz-demo-descriptions-custom-size',
  template: `
    <nz-radio-group [(ngModel)]="size">
      <label nz-radio nzValue="default">default</label>
      <label nz-radio nzValue="middle">middle</label>
      <label nz-radio nzValue="small">small</label>
    </nz-radio-group>
    <br />
    <br />
    <nz-descriptions nzTitle="Custom Size" [nzExtra]="extraTpl" nzBordered [nzSize]="size">
      <nz-descriptions-item nzTitle="Product">Cloud Database</nz-descriptions-item>
      <nz-descriptions-item nzTitle="Billing">Prepaid</nz-descriptions-item>
      <nz-descriptions-item nzTitle="time">18:00:00</nz-descriptions-item>
      <nz-descriptions-item nzTitle="Amount">$80.00</nz-descriptions-item>
      <nz-descriptions-item nzTitle="Discount">$20.00</nz-descriptions-item>
      <nz-descriptions-item nzTitle="Official">$60.00</nz-descriptions-item>
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
        Region: East China 1
        <br />
      </nz-descriptions-item>
    </nz-descriptions>
    <br />
    <br />
    <nz-descriptions nzTitle="Custom Size" [nzSize]="size" [nzExtra]="extraTpl">
      <nz-descriptions-item nzTitle="Product">Cloud Database</nz-descriptions-item>
      <nz-descriptions-item nzTitle="Billing">Prepaid</nz-descriptions-item>
      <nz-descriptions-item nzTitle="Time">18:00:00</nz-descriptions-item>
      <nz-descriptions-item nzTitle="Amount">$80.00</nz-descriptions-item>
      <nz-descriptions-item nzTitle="Discount">$20.00</nz-descriptions-item>
      <nz-descriptions-item nzTitle="Official">$60.00</nz-descriptions-item>
    </nz-descriptions>
    <ng-template #extraTpl>
      <button nz-button nzType="primary">Edit</button>
    </ng-template>
  `
})
export class NzDemoDescriptionsCustomSizeComponent {
  size: NzDescriptionsSize = 'default';
}
