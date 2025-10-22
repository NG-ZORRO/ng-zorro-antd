import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { NzTransferModule, TransferCanMove, TransferItem } from 'ng-zorro-antd/transfer';

@Component({
  selector: 'nz-demo-transfer-can-move',
  imports: [NzTransferModule],
  template: `
    <nz-transfer
      [nzDataSource]="list"
      [nzCanMove]="canMove"
      (nzSelectChange)="select($event)"
      (nzChange)="change($event)"
    ></nz-transfer>
  `
})
export class NzDemoTransferCanMoveComponent implements OnInit {
  list: TransferItem[] = [];

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

  canMove(arg: TransferCanMove): Observable<TransferItem[]> {
    if (arg.direction === 'right' && arg.list.length > 0) {
      arg.list.splice(0, 1);
    }
    // or
    // if (arg.direction === 'right' && arg.list.length > 0) delete arg.list[0];
    return of(arg.list).pipe(delay(1000));
  }

  select(ret: {}): void {
    console.log('nzSelectChange', ret);
  }

  change(ret: {}): void {
    console.log('nzChange', ret);
  }
}
