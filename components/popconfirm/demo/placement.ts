import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-popconfirm-placement',
  template: `
    <div style="margin-left: 60px">
      <nz-popconfirm [nzTitle]="'Are you sure delete this task?'" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" [nzPlacement]="'topLeft'">
        <button nz-popconfirm nz-button class="ant-btn">TL</button>
      </nz-popconfirm>
      <nz-popconfirm [nzTitle]="'Are you sure delete this task?'" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" [nzPlacement]="'top'">
        <button nz-popconfirm nz-button class="ant-btn">Top</button>
      </nz-popconfirm>
      <nz-popconfirm [nzTitle]="'Are you sure delete this task?'" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" [nzPlacement]="'topRight'">
        <button nz-popconfirm nz-button class="ant-btn">TR</button>
      </nz-popconfirm>
    </div>
    <div style="width: 60px; float: left;">
      <nz-popconfirm [nzTitle]="'Are you sure delete this task?'" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" [nzPlacement]="'leftTop'">
        <button nz-popconfirm nz-button class="ant-btn">LT</button>
      </nz-popconfirm>
      <nz-popconfirm [nzTitle]="'Are you sure delete this task?'" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" [nzPlacement]="'left'">
        <button nz-popconfirm nz-button class="ant-btn">Left</button>
      </nz-popconfirm>
      <nz-popconfirm [nzTitle]="'Are you sure delete this task?'" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" [nzPlacement]="'leftBottom'">
        <button nz-popconfirm nz-button class="ant-btn">LB</button>
      </nz-popconfirm>
    </div>
    <div style="width: 60px; margin-left: 252px;">
      <nz-popconfirm [nzTitle]="'Are you sure delete this task?'" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" [nzPlacement]="'rightTop'">
        <button nz-popconfirm nz-button class="ant-btn">RT</button>
      </nz-popconfirm>
      <nz-popconfirm [nzTitle]="'Are you sure delete this task?'" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" [nzPlacement]="'right'">
        <button nz-popconfirm nz-button class="ant-btn">Right</button>
      </nz-popconfirm>
      <nz-popconfirm [nzTitle]="'Are you sure delete this task?'" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" [nzPlacement]="'rightBottom'">
        <button nz-popconfirm nz-button class="ant-btn">RB</button>
      </nz-popconfirm>
    </div>
    <div style="margin-left: 60px; clear: both;">
      <nz-popconfirm [nzTitle]="'Are you sure delete this task?'" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" [nzPlacement]="'bottomLeft'">
        <button nz-popconfirm nz-button class="ant-btn">BL</button>
      </nz-popconfirm>
      <nz-popconfirm [nzTitle]="'Are you sure delete this task?'" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" [nzPlacement]="'bottom'">
        <button nz-popconfirm nz-button class="ant-btn">Bottom</button>
      </nz-popconfirm>
      <nz-popconfirm [nzTitle]="'Are you sure delete this task?'" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" [nzPlacement]="'bottomRight'">
        <button nz-popconfirm nz-button class="ant-btn">BR</button>
      </nz-popconfirm>
    </div>
  `,
  styles  : [ `
    :host ::ng-deep .demo {
      overflow: auto;
    }

    :host ::ng-deep .ant-popover-wrap > a {
      margin-right: 8px;
    }

    :host ::ng-deep .ant-btn {
      margin-right: 8px;
      margin-bottom: 8px;
    }

    :host ::ng-deep .ant-btn {
      width: 70px;
      text-align: center;
      padding: 0;
    }
  ` ]
})

export class NzDemoPopconfirmPlacementComponent {
  cancel(): void {
    // this.message.info('click cancel');
  }

  confirm(): void {
    // this.message.info('click confirm');
  }
}
