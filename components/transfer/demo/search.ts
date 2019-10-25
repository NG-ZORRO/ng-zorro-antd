import { Component, OnInit } from '@angular/core';
import { TransferItem } from 'ng-zorro-antd/transfer';

@Component({
  selector: 'nz-demo-transfer-search',
  template: `
    <nz-transfer
      [nzDataSource]="list"
      [nzDisabled]="disabled"
      nzShowSearch
      [nzFilterOption]="filterOption"
      (nzSearchChange)="search($event)"
      (nzSelectChange)="select($event)"
      (nzChange)="change($event)"
    >
    </nz-transfer>
    <div style="margin-top: 8px;">
      <nz-switch [(ngModel)]="disabled" nzCheckedChildren="disabled" nzUnCheckedChildren="disabled"></nz-switch>
      <div></div>
    </div>
  `
})
export class NzDemoTransferSearchComponent implements OnInit {
  list: TransferItem[] = [];
  disabled = false;

  ngOnInit(): void {
    for (let i = 0; i < 20; i++) {
      this.list.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        direction: Math.random() * 2 > 1 ? 'right' : undefined
      });
    }
  }

  // tslint:disable-next-line:no-any
  filterOption(inputValue: string, item: any): boolean {
    return item.description.indexOf(inputValue) > -1;
  }

  search(ret: {}): void {
    console.log('nzSearchChange', ret);
  }

  select(ret: {}): void {
    console.log('nzSelectChange', ret);
  }

  change(ret: {}): void {
    console.log('nzChange', ret);
  }
}
