import { Component, OnInit } from '@angular/core';
import { TransferItem } from 'ng-zorro-antd/transfer';

@Component({
  selector: 'nz-demo-transfer-virtual-scroll',
  template: `
    <nz-transfer
      nzVirtual
      [nzDataSource]="list"
      [nzDisabled]="disabled"
      [nzTitles]="['Source', 'Target']"
      (nzSelectChange)="select($event)"
      [nzSelectedKeys]="['0', '2']"
      (nzChange)="change($event)"
    ></nz-transfer>
    <div style="margin-top: 8px;">
      <nz-switch [(ngModel)]="disabled" nzCheckedChildren="disabled" nzUnCheckedChildren="disabled"></nz-switch>
      <div></div>
    </div>
  `
})
export class NzDemoTransferVirtualScrollComponent implements OnInit {
  list: TransferItem[] = [];
  disabled = false;

  ngOnInit(): void {
    for (let i = 0; i < 5000; i++) {
      this.list.push({
        key: i.toString(),
        title: `content${i + 1}`,
        disabled: i % 3 < 1
      });
    }

    [2, 3].forEach(idx => (this.list[idx].direction = 'right'));
  }

  select(ret: {}): void {
    console.log('nzSelectChange', ret);
  }

  change(ret: {}): void {
    console.log('nzChange', ret);
  }
}
