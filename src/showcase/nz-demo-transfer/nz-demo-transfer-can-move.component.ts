import { Component, OnInit } from '@angular/core';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { delay } from 'rxjs/operators';
import { NzMessageService } from '../../../index.showcase';

@Component({
  selector: 'nz-demo-transfer-can-move',
  template: `
  <nz-transfer
      [nzDataSource]="list"
      [nzTitles]="['Source', 'Target']"
      [canMove]="canMove"
      (nzSelectChange)="select($event)"
      (nzChange)="change($event)">
  </nz-transfer>
  `
})
export class NzDemoTransferCanMoveComponent implements OnInit {
  list: any[] = [];
  ngOnInit() {
    for (let i = 0; i < 20; i++) {
      this.list.push({
        key: i.toString(),
        title: `content${i + 1}`,
        disabled: i % 3 < 1,
      });
    }

    [ 2, 3 ].forEach(idx => this.list[idx].direction = 'right');
  }

  canMove(arg: any) {
    if (arg.direction === 'right' && arg.list.length > 0) arg.list.splice(0, 1);
    // or
    // if (arg.direction === 'right' && arg.list.length > 0) delete arg.list[0];
    return ArrayObservable.of(arg.list).pipe(delay(1000));
  }

  select(ret: any) {
    console.log('nzSelectChange', ret);
  }

  change(ret: any) {
    console.log('nzChange', ret);
  }
}
