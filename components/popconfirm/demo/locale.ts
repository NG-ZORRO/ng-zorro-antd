import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-popconfirm-locale',
  template: `
    <nz-popconfirm [nzTitle]="'Are you sure？'" [nzOkText]="'ok'" [nzCancelText]="'cancel'" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()">
      <a nz-popconfirm>delete</a>
    </nz-popconfirm>
  `
})

export class NzDemoPopconfirmLocaleComponent {

  cancel(): void {
    // this.message.info('click cancel');
  }

  confirm(): void {
    // this.message.info('click confirm');
  }
}
