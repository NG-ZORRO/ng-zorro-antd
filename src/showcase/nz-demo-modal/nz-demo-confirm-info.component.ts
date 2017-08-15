import { Component } from '@angular/core';
import { NzModalService } from '../../../index.showcase';


@Component({
  selector: 'nz-demo-confirm-info',
  template: `
    <button nz-button [nzType]="'info'" (click)="info(contentTpl)">
      <span>信息提示</span>
    </button>
    <ng-template #contentTpl>
      <div>
        <p>一些附加信息一些附加信息一些附加信息</p>
        <p>一些附加信息一些附加信息一些附加信息</p>
      </div>
    </ng-template>
    <button nz-button [nzType]="'info'" (click)="success()">
      <span>成功提示</span>
    </button>
    <button nz-button [nzType]="'info'" (click)="error()">
      <span>失败提示</span>
    </button>
    <button nz-button [nzType]="'info'" (click)="warning()">
      <span>警告提示</span>
    </button>
  `,
  styles: []
})
export class NzDemoConfirmInfoComponent {
  info(contentTpl) {
    this.confirmServ.info({
      title: '这是一条通知信息',
      content: contentTpl
    });
  }

  success() {
    this.confirmServ.success({
      title: '这是一条成功信息',
      content: '一些附加信息一些附加信息一些附加信息'
    });
  }

  error() {
    this.confirmServ.error({
      title: '这是一条失败信息',
      content: '一些附加信息一些附加信息一些附加信息'
    });
  }

  warning() {
    this.confirmServ.warning({
      title: '这是一条警告信息',
      content: '一些附加信息一些附加信息一些附加信息'
    });
  }

  constructor(private confirmServ: NzModalService) {}
}
