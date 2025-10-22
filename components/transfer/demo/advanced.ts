import { Component, OnInit } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTransferModule, TransferItem } from 'ng-zorro-antd/transfer';

@Component({
  selector: 'nz-demo-transfer-advanced',
  imports: [NzButtonModule, NzTransferModule],
  template: `
    <nz-transfer
      [nzDataSource]="list"
      nzShowSearch
      [nzOperations]="['to right', 'to left']"
      [nzListStyle]="{ 'width.px': 250, 'height.px': 300 }"
      [nzRender]="render"
      [nzFooter]="footer"
      (nzSelectChange)="select($event)"
      (nzChange)="change($event)"
    >
      <ng-template #render let-item>{{ item.title }}-{{ item.description }}</ng-template>
      <ng-template #footer let-direction>
        <button nz-button (click)="reload(direction)" nzSize="small" style="float: right; margin: 5px;">
          reload
        </button>
      </ng-template>
    </nz-transfer>
  `
})
export class NzDemoTransferAdvancedComponent implements OnInit {
  list: TransferItem[] = [];

  constructor(private messageService: NzMessageService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    const ret: TransferItem[] = [];
    for (let i = 0; i < 20; i++) {
      ret.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        direction: Math.random() * 2 > 1 ? 'right' : undefined
      });
    }
    this.list = ret;
  }

  reload(direction: string): void {
    this.getData();
    this.messageService.success(`your clicked ${direction}!`);
  }

  select(ret: {}): void {
    console.log('nzSelectChange', ret);
  }

  change(ret: {}): void {
    console.log('nzChange', ret);
  }
}
