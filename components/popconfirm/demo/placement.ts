import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'nz-demo-popconfirm-placement',
  template: `
    <div style="margin-left: 60px">
      <button
        nz-popconfirm
        nzPopconfirmTitle="Are you sure delete this task?"
        (nzOnConfirm)="confirm()"
        (nzOnCancel)="cancel()"
        nzPopconfirmPlacement="topLeft"
        nz-button
      >
        TL
      </button>
      <button
        nz-popconfirm
        nzPopconfirmTitle="Are you sure delete this task?"
        (nzOnConfirm)="confirm()"
        (nzOnCancel)="cancel()"
        nzPopconfirmPlacement="top"
        nz-button
      >
        Top
      </button>
      <button
        nz-popconfirm
        nzPopconfirmTitle="Are you sure delete this task?"
        (nzOnConfirm)="confirm()"
        (nzOnCancel)="cancel()"
        nzPopconfirmPlacement="topRight"
        nz-button
      >
        TR
      </button>
    </div>
    <div style="width: 60px; float: left;">
      <button
        nz-popconfirm
        nzPopconfirmTitle="Are you sure delete this task?"
        (nzOnConfirm)="confirm()"
        (nzOnCancel)="cancel()"
        nzPopconfirmPlacement="leftTop"
        nz-button
      >
        LT
      </button>
      <button
        nz-popconfirm
        nzPopconfirmTitle="Are you sure delete this task?"
        (nzOnConfirm)="confirm()"
        (nzOnCancel)="cancel()"
        nzPopconfirmPlacement="left"
        nz-button
      >
        Left
      </button>
      <button
        nz-popconfirm
        nzPopconfirmTitle="Are you sure delete this task?"
        (nzOnConfirm)="confirm()"
        (nzOnCancel)="cancel()"
        nzPopconfirmPlacement="leftBottom"
        nz-button
      >
        LB
      </button>
    </div>
    <div style="width: 60px; margin-left: 252px;">
      <button
        nz-popconfirm
        nzPopconfirmTitle="Are you sure delete this task?"
        (nzOnConfirm)="confirm()"
        (nzOnCancel)="cancel()"
        nzPopconfirmPlacement="rightTop"
        nz-button
      >
        RT
      </button>
      <button
        nz-popconfirm
        nzPopconfirmTitle="Are you sure delete this task?"
        (nzOnConfirm)="confirm()"
        (nzOnCancel)="cancel()"
        nzPopconfirmPlacement="right"
        nz-button
      >
        Right
      </button>
      <button
        nz-popconfirm
        nzPopconfirmTitle="Are you sure delete this task?"
        (nzOnConfirm)="confirm()"
        (nzOnCancel)="cancel()"
        nzPopconfirmPlacement="rightBottom"
        nz-button
      >
        RB
      </button>
    </div>
    <div style="margin-left: 60px; clear: both;">
      <button
        nz-popconfirm
        nzPopconfirmTitle="Are you sure delete this task?"
        (nzOnConfirm)="confirm()"
        (nzOnCancel)="cancel()"
        nzPopconfirmPlacement="bottomLeft"
        nz-button
      >
        BL
      </button>
      <button
        nz-popconfirm
        nzPopconfirmTitle="Are you sure delete this task?"
        (nzOnConfirm)="confirm()"
        (nzOnCancel)="cancel()"
        nzPopconfirmPlacement="bottom"
        nz-button
      >
        Bottom
      </button>
      <button
        nz-popconfirm
        nzPopconfirmTitle="Are you sure delete this task?"
        (nzOnConfirm)="confirm()"
        (nzOnCancel)="cancel()"
        nzPopconfirmPlacement="bottomRight"
        nz-button
      >
        BR
      </button>
    </div>
  `,
  styles: [
    `
      button {
        margin-right: 8px;
        margin-bottom: 8px;
        width: 70px;
        text-align: center;
        padding: 0;
      }
    `
  ]
})
export class NzDemoPopconfirmPlacementComponent {
  cancel(): void {
    this.nzMessageService.info('click cancel');
  }

  confirm(): void {
    this.nzMessageService.info('click confirm');
  }

  constructor(private nzMessageService: NzMessageService) {}
}
