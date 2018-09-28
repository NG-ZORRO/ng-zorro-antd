import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-popconfirm-placement',
  template: `
    <div style="margin-left: 60px">
      <button nz-popconfirm nzTitle="Are you sure delete this task?" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" nzPlacement="topLeft" nz-button>TL</button>
      <button nz-popconfirm nzTitle="Are you sure delete this task?" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" nzPlacement="top" nz-button>Top</button>
      <button nz-popconfirm nzTitle="Are you sure delete this task?" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" nzPlacement="topRight" nz-button>TR</button>
    </div>
    <div style="width: 60px; float: left;">
      <button nz-popconfirm nzTitle="Are you sure delete this task?" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" nzPlacement="leftTop" nz-button>LT</button>
      <button nz-popconfirm nzTitle="Are you sure delete this task?" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" nzPlacement="left" nz-button>Left</button>
      <button nz-popconfirm nzTitle="Are you sure delete this task?" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" nzPlacement="leftBottom" nz-button>LB</button>
    </div>
    <div style="width: 60px; margin-left: 252px;">
      <button nz-popconfirm nzTitle="Are you sure delete this task?" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" nzPlacement="rightTop" nz-button>RT</button>
      <button nz-popconfirm nzTitle="Are you sure delete this task?" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" nzPlacement="right" nz-button>Right</button>
      <button nz-popconfirm nzTitle="Are you sure delete this task?" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" nzPlacement="rightBottom" nz-button>RB</button>
    </div>
    <div style="margin-left: 60px; clear: both;">
      <button nz-popconfirm nzTitle="Are you sure delete this task?" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" nzPlacement="bottomLeft" nz-button>BL</button>
      <button nz-popconfirm nzTitle="Are you sure delete this task?" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" nzPlacement="bottom" nz-button>Bottom</button>
      <button nz-popconfirm nzTitle="Are you sure delete this task?" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" nzPlacement="bottomRight" nz-button>BR</button>
    </div>
  `,
  styles  : [ `
    :host ::ng-deep .demo {
      overflow: auto;
    }

    :host ::ng-deep .ant-popover-wrap > a {
      margin-right: 8px;
    }

    button {
      margin-right: 8px;
      margin-bottom: 8px;
      width: 70px;
      text-align: center;
      padding: 0;
    }
  ` ]
})

export class NzDemoPopconfirmPlacementComponent {
  cancel(): void {
    this.nzMessageService.info('click cancel');
  }

  confirm(): void {
    this.nzMessageService.info('click confirm');
  }

  constructor(private nzMessageService: NzMessageService) {

  }
}
