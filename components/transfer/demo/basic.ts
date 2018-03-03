import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-transfer-basic',
  template: `
    <nz-transfer
      [nzDataSource]="list"
      [nzTitles]="['Source', 'Target']"
      (nzSelectChange)="select($event)"
      (nzChange)="change($event)">
    </nz-transfer>
  `
})
export class NzDemoTransferBasicComponent implements OnInit {
  // tslint:disable-next-line:no-any
  list: any[] = [];

  ngOnInit(): void {
    for (let i = 0; i < 20; i++) {
      this.list.push({
        key     : i.toString(),
        title   : `content${i + 1}`,
        disabled: i % 3 < 1,
      });
    }

    [ 2, 3 ].forEach(idx => this.list[ idx ].direction = 'right');
  }

  select(ret: {}): void {
    console.log('nzSelectChange', ret);
  }

  change(ret: {}): void {
    console.log('nzChange', ret);
  }
}
