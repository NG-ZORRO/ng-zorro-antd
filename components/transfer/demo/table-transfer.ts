import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTransferModule, TransferChange, TransferItem, TransferSelectChange } from 'ng-zorro-antd/transfer';

@Component({
  selector: 'nz-demo-transfer-table-transfer',
  imports: [FormsModule, NzSwitchModule, NzTableModule, NzTagModule, NzTransferModule],
  template: `
    <nz-transfer
      [nzDataSource]="list"
      [nzDisabled]="disabled"
      [nzShowSearch]="showSearch"
      [nzShowSelectAll]="false"
      [nzRenderList]="[renderList, renderList]"
      (nzSelectChange)="select($event)"
      (nzChange)="change($event)"
    >
      <ng-template
        #renderList
        let-items
        let-direction="direction"
        let-stat="stat"
        let-disabled="disabled"
        let-onItemSelectAll="onItemSelectAll"
        let-onItemSelect="onItemSelect"
      >
        <nz-table #t [nzData]="$asTransferItems(items)" nzSize="small">
          <thead>
            <tr>
              <th
                [nzDisabled]="disabled"
                [nzChecked]="stat.checkAll"
                [nzIndeterminate]="stat.checkHalf"
                (nzCheckedChange)="onItemSelectAll($event)"
              ></th>
              <th>Name</th>
              @if (direction === 'left') {
                <th>Tag</th>
              }
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            @for (data of t.data; track data) {
              <tr (click)="onItemSelect(data)">
                <td
                  [nzChecked]="!!data.checked"
                  [nzDisabled]="disabled || data.disabled"
                  (nzCheckedChange)="onItemSelect(data)"
                ></td>
                <td>{{ data.title }}</td>
                @if (direction === 'left') {
                  <td>
                    <nz-tag>{{ data.tag }}</nz-tag>
                  </td>
                }
                <td>{{ data.description }}</td>
              </tr>
            }
          </tbody>
        </nz-table>
      </ng-template>
    </nz-transfer>
    <div style="margin-top: 8px;">
      <nz-switch [(ngModel)]="disabled" nzCheckedChildren="disabled" nzUnCheckedChildren="disabled"></nz-switch>
      <nz-switch [(ngModel)]="showSearch" nzCheckedChildren="showSearch" nzUnCheckedChildren="showSearch"></nz-switch>
    </div>
  `
})
export class NzDemoTransferTableTransferComponent implements OnInit {
  list: TransferItem[] = [];
  $asTransferItems = (data: unknown): TransferItem[] => data as TransferItem[];
  disabled = false;
  showSearch = false;

  ngOnInit(): void {
    for (let i = 0; i < 20; i++) {
      this.list.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        disabled: i % 4 === 0,
        tag: ['cat', 'dog', 'bird'][i % 3],
        checked: false
      });
    }

    [2, 3].forEach(idx => (this.list[idx].direction = 'right'));
  }

  select(ret: TransferSelectChange): void {
    console.log('nzSelectChange', ret);
  }

  change(ret: TransferChange): void {
    console.log('nzChange', ret);
    const listKeys = ret.list.map(l => l.key);
    const hasOwnKey = (e: TransferItem): boolean => e.hasOwnProperty('key');
    this.list = this.list.map(e => {
      if (listKeys.includes(e.key) && hasOwnKey(e)) {
        if (ret.to === 'left') {
          delete e.hide;
        } else if (ret.to === 'right') {
          e.hide = false;
        }
      }
      return e;
    });
  }
}
