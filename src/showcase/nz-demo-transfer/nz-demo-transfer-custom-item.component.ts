import { Component, OnInit } from '@angular/core';
import { NzMessageService } from '../../../index.showcase';

@Component({
  selector: 'nz-demo-transfer-custom-item',
  template: `
  <nz-transfer
      [nzDataSource]="list"
      [nzListStyle]="{'width.px': 300, 'height.px': 300}"
      (nzSelectChange)="select($event)"
      (nzChange)="change($event)">
      <ng-template #render let-item>
        <i class="anticon anticon-{{item.icon}}"></i> {{item.title}}
      </ng-template>
  </nz-transfer>
  `
})
export class NzDemoTransferCustomItemComponent implements OnInit {
  list: any[] = [];
  ngOnInit() {
    this.getData();
  }

  getData() {
    const ret = [];
    for (let i = 0; i < 20; i++) {
      ret.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        direction: Math.random() * 2 > 1 ? 'right' : '',
        icon: `frown-o`
      });
    }
    this.list = ret;
  }

  select(ret: any) {
    console.log('nzSelectChange', ret);
  }

  change(ret: any) {
    console.log('nzChange', ret);
  }

  constructor(public msg: NzMessageService) {}
}
