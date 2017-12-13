import { Component } from '@angular/core';
import { NzModalService } from '../../../index.showcase';


@Component({
  selector: 'nz-demo-confirm-basic',
  template: `
    <button nz-button [nzType]="'info'" (click)="showConfirm()">
      <span>确认对话框</span>
    </button>
  `,
  styles  : []
})
export class NzDemoConfirmBasicComponent {
  showConfirm = () => {
    this.confirmServ.confirm({
      title  : '您是否确认要删除这项内容',
      content: '<b>一些解释</b>',
      onOk() {
        console.log('确定');
      },
      onCancel() {
      }
    });
  };

  constructor(private confirmServ: NzModalService) {
  }
}
