import { Component } from '@angular/core';
import { NzModalService } from '../../../index.showcase';


@Component({
  selector: 'nz-demo-confirm-async',
  template: `
    <button nz-button [nzType]="'info'" (click)="showConfirm()">
      <span>Confirm the dialog box</span>
    </button>
  `,
  styles  : []
})
export class NzDemoConfirmAsyncComponent {
  showConfirm = () => {
    this.confirmServ.confirm({
      title  : 'Are you sure you want to delete this item?',
      content: 'Close the point after confirming for 1 second',
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
