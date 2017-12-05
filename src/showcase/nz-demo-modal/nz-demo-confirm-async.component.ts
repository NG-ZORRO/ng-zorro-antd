import { Component } from '@angular/core';
import { NzModalService } from '../../../index.showcase';


@Component({
  selector: 'nz-demo-confirm-async',
  template: `
    <button nz-button [nzType]="'info'" (click)="showConfirm()">
      <span>确认对话框</span>
    </button>
  `,
  styles  : []
})
export class NzDemoConfirmAsyncComponent {
  showConfirm = () => {
    this.confirmServ.confirm({
      title  : '您是否确认要删除这项内容',
      content: '点确认 1 秒后关闭',
      showConfirmLoading: true,
      onOk() {
        return new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
      },
      onCancel() {
      }
    });
  };

  constructor(private confirmServ: NzModalService) {
  }
}
