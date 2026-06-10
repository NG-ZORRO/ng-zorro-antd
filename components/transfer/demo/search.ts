import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTransferModule, TransferItem } from 'ng-zorro-antd/transfer';

@Component({
  selector: 'nz-demo-transfer-search',
  imports: [FormsModule, NzSwitchModule, NzTransferModule],
  template: `
    <nz-transfer
      [nzDataSource]="list"
      [nzDisabled]="disabled()"
      nzShowSearch
      [nzFilterOption]="filterOption"
      (nzSearchChange)="search($event)"
      (nzSelectChange)="select($event)"
      (nzChange)="change($event)"
    />
    <br />
    <nz-switch [(ngModel)]="disabled" nzCheckedChildren="disabled" nzUnCheckedChildren="disabled" />
  `
})
export class NzDemoTransferSearchComponent {
  readonly list: TransferItem[] = Array.from({ length: 20 }).map((_, i) => ({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    direction: Math.random() * 2 > 1 ? 'right' : undefined
  }));
  readonly disabled = signal(false);

  filterOption(inputValue: string, item: TransferItem): boolean {
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
