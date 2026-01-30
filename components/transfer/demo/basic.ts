import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTransferModule, TransferItem } from 'ng-zorro-antd/transfer';

@Component({
  selector: 'nz-demo-transfer-basic',
  imports: [FormsModule, NzSwitchModule, NzTransferModule],
  template: `
    <nz-transfer
      [nzDataSource]="list"
      [nzDisabled]="disabled"
      [nzTitles]="['Source', 'Target']"
      (nzSelectChange)="select($event)"
      [nzSelectedKeys]="['0', '2', '3']"
      (nzChange)="change($event)"
    />
    <br />
    <nz-switch [(ngModel)]="disabled" nzCheckedChildren="disabled" nzUnCheckedChildren="disabled" />
  `
})
export class NzDemoTransferBasicComponent implements OnInit {
  list: TransferItem[] = [];
  disabled = false;

  ngOnInit(): void {
    for (let i = 0; i < 20; i++) {
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
