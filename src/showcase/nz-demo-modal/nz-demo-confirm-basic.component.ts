import { Component } from '@angular/core';
import { NzModalService } from '../../../index.showcase';


@Component({
  selector: 'nz-demo-confirm-basic',
  template: `
    <button nz-button [nzType]="'info'" (click)="showConfirm()">
      <span>Confirm dialog box</span>
    </button>
  `,
  styles  : []
})
export class NzDemoConfirmBasicComponent {
  showConfirm = () => {
    this.confirmServ.confirm({
      title  : 'Are you sure you want to delete this item?',
      content: '<b>Some explanation</b>',
      onOk() {
        console.log('determine');
      },
      onCancel() {
      }
    });
  };

  constructor(private confirmServ: NzModalService) {
  }
}
