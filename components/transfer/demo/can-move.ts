import { Component } from '@angular/core';
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
    />
  `
})
export class NzDemoTransferCanMoveComponent {
  readonly list: TransferItem[] = Array.from({ length: 20 }).map((_, i) => ({
    key: i.toString(),
    title: `content${i + 1}`,
    disabled: i % 3 < 1,
    direction: [2, 3].includes(i) ? 'right' : undefined
  }));

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
