import { Component } from '@angular/core';
import { NzMessageService } from '../../../index.showcase';


@Component({
  selector: 'nz-demo-popconfirm-location',
  template: `
    <div style="margin-left: 60px">
      <nz-popconfirm [nzTitle]="'确定要删除这个任务吗？'" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" [nzPlacement]="'topLeft'">
        <button nz-popconfirm nz-button class="ant-btn">上左</button>
      </nz-popconfirm>
      <nz-popconfirm [nzTitle]="'确定要删除这个任务吗？'" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" [nzPlacement]="'top'">
        <button nz-popconfirm nz-button class="ant-btn">上边</button>
      </nz-popconfirm>
      <nz-popconfirm [nzTitle]="'确定要删除这个任务吗？'" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" [nzPlacement]="'topRight'">
        <button nz-popconfirm nz-button class="ant-btn">上右</button>
      </nz-popconfirm>
    </div>
    <div style="width: 60px; float: left;">
      <nz-popconfirm [nzTitle]="'确定要删除这个任务吗？'" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" [nzPlacement]="'leftTop'">
        <button nz-popconfirm nz-button class="ant-btn">左上</button>
      </nz-popconfirm>
      <nz-popconfirm [nzTitle]="'确定要删除这个任务吗？'" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" [nzPlacement]="'left'">
        <button nz-popconfirm nz-button class="ant-btn">左边</button>
      </nz-popconfirm>
      <nz-popconfirm [nzTitle]="'确定要删除这个任务吗？'" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" [nzPlacement]="'leftBottom'">
        <button nz-popconfirm nz-button class="ant-btn">左下</button>
      </nz-popconfirm>
    </div>
    <div style="width: 60px; margin-left: 252px;">
      <nz-popconfirm [nzTitle]="'确定要删除这个任务吗？'" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" [nzPlacement]="'rightTop'">
        <button nz-popconfirm nz-button class="ant-btn">右上</button>
      </nz-popconfirm>
      <nz-popconfirm [nzTitle]="'确定要删除这个任务吗？'" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" [nzPlacement]="'right'">
        <button nz-popconfirm nz-button class="ant-btn">右边</button>
      </nz-popconfirm>
      <nz-popconfirm [nzTitle]="'确定要删除这个任务吗？'" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" [nzPlacement]="'rightBottom'">
        <button nz-popconfirm nz-button class="ant-btn">右下</button>
      </nz-popconfirm>
    </div>
    <div style="margin-left: 60px; clear: both;">
      <nz-popconfirm [nzTitle]="'确定要删除这个任务吗？'" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" [nzPlacement]="'bottomLeft'">
        <button nz-popconfirm nz-button class="ant-btn">下左</button>
      </nz-popconfirm>
      <nz-popconfirm [nzTitle]="'确定要删除这个任务吗？'" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" [nzPlacement]="'bottom'">
        <button nz-popconfirm nz-button class="ant-btn">下边</button>
      </nz-popconfirm>
      <nz-popconfirm [nzTitle]="'确定要删除这个任务吗？'" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" [nzPlacement]="'bottomRight'">
        <button nz-popconfirm nz-button class="ant-btn">下右</button>
      </nz-popconfirm>
    </div>
  `,
  styles  : [ `
    .ant-popover-wrap > a {
      margin-right: 1em;
    }

    .ant-btn {
      margin-right: 1em;
      margin-bottom: 1em;
    }
  ` ]
})

export class NzDemoPopconfirmLocationComponent {
  constructor(private message: NzMessageService) {
  }

  cancel = function () {
    this.message.info('click cancel')
  };

  confirm = () => {
    this.message.info('click confirm')
  };
}
