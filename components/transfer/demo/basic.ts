import { Component, OnInit } from '@angular/core';

import { TransferItem } from 'ng-zorro-antd/transfer';

@Component({
  selector: 'nz-demo-transfer-basic',
  template: `
    <nz-transfer
      #transfer
      [nzDataSource]="list"
      [nzDisabled]="disabled"
      [nzTitles]="['Source', titleTpl]"
      (nzSelectChange)="select($event)"
      [nzSelectedKeys]="['0', '2']"
      (nzChange)="change($event)"
    ></nz-transfer>
    <ng-template #titleTpl let-dir>
      <a (click)="selectAll()">全选所有</a>
    </ng-template>
    <div style="margin-top: 8px;">
      <nz-switch [(ngModel)]="disabled" nzCheckedChildren="disabled" nzUnCheckedChildren="disabled"></nz-switch>
      <div></div>
    </div>
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

    [2, 3, 12, 13, 14].forEach(idx => (this.list[idx].direction = 'right'));
  }

  select(ret: {}): void {
    console.log('nzSelectChange', ret);
  }

  change(ret: {}): void {
    console.log('nzChange', ret);
  }

  selectAll(): void {
    this.list = [...this.list].map(i => {
      if (i.direction === 'right') i.checked = true;
      return i;
    });
  }
}
