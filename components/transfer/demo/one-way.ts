import { Component, OnInit } from '@angular/core';

import { TransferItem } from 'ng-zorro-antd/transfer';

@Component({
  selector: 'nz-demo-transfer-one-way',
  template: `
    <nz-transfer
      [nzDataSource]="list"
      (nzSelectChange)="select($event)"
      (nzChange)="change($event)"
      [nzOneWay]="oneWay"
    ></nz-transfer>
    <div style="margin-top: 8px;">
      <nz-switch [(ngModel)]="oneWay" nzCheckedChildren="oneWay" nzUnCheckedChildren="oneWay"></nz-switch>
    </div>
  `
})
export class NzDemoTransferOneWayComponent implements OnInit {
  list: TransferItem[] = [];
  oneWay = false;

  ngOnInit(): void {
    for (let i = 0; i < 20; i++) {
      this.list.push({
        key: i.toString(),
        title: `content${i + 1}`,
        disabled: i % 3 < 1
      });
    }

    [2, 3, 12, 13, 14].forEach(idx => (this.list[idx].direction = 'right'));
  }

  select(ret: {}): void {
    console.log('nzSelectChange', ret);
  }

  change(ret: {}): void {
    console.log('nzChange', ret);
  }
}
