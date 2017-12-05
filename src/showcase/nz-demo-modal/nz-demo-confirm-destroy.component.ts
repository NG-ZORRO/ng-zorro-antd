import { Component } from '@angular/core';
import { NzModalService } from '../../../index.showcase';


@Component({
  selector: 'nz-demo-confirm-destroy',
  template: `
    <button nz-button [nzType]="'info'" (click)="success()">
      <span>成功提示</span>
    </button>
  `,
  styles: []
})
export class NzDemoConfirmDestroyComponent {
  success = () => {
    const modal = this.confirmServ.success({
      title: '这是一条成功信息',
      content: '一秒后自动移除'
    });

    setTimeout(() => modal.destroy(), 1000);
  };

  constructor(private confirmServ: NzModalService) {}
}
