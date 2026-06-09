import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTransferModule, TransferItem } from 'ng-zorro-antd/transfer';

@Component({
  selector: 'nz-demo-transfer-one-way',
  imports: [NzTransferModule, NzSwitchModule, FormsModule],
  template: `
    <nz-transfer
      [nzDataSource]="list"
      [nzDisabled]="disabled()"
      [nzTitles]="['Source', 'Target']"
      (nzSelectChange)="select($event)"
      [nzSelectedKeys]="['0', '2', '3']"
      nzOneWay
      (nzChange)="change($event)"
    />
    <div style="margin-top: 8px;">
      <nz-switch
        [ngModel]="disabled()"
        (ngModelChange)="disabled.set($event)"
        nzCheckedChildren="disabled"
        nzUnCheckedChildren="disabled"
      />
      <div></div>
    </div>
  `
})
export class NzDemoTransferOneWayComponent {
  readonly list: TransferItem[] = Array.from({ length: 20 }).map((_, i) => ({
    key: i.toString(),
    title: `content${i + 1}`,
    disabled: i % 3 < 1,
    direction: [2, 3].includes(i) ? 'right' : undefined
  }));
  readonly disabled = signal(false);

  select(ret: {}): void {
    console.log('nzSelectChange', ret);
  }

  change(ret: {}): void {
    console.log('nzChange', ret);
  }
}
