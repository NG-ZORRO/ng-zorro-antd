import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-popconfirm-basic',
  template: `
    <nz-popconfirm [nzTitle]="'Are you sure delete this task？'" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()">
      <a nz-popconfirm>Delete</a>
    </nz-popconfirm>
  `
})
export class NzDemoPopconfirmBasicComponent {

  cancel(): void {
    // this.message.info('click cancel');
  }

  confirm(): void {
    // this.message.info('click confirm');
  }

}
