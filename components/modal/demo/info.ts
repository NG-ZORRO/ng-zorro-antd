import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'nz-demo-modal-info',
  template: `
    <button nz-button (click)="info()">Info</button>
    <button nz-button (click)="success()">Success</button>
    <button nz-button (click)="error()">Error</button>
    <button nz-button (click)="warning()">Warning</button>
  `,
  styles: [
    `
      button {
        margin-right: 8px;
      }
    `
  ]
})
export class NzDemoModalInfoComponent {
  constructor(private modal: NzModalService) {}

  info(): void {
    this.modal.info({
      nzTitle: 'This is a notification message',
      nzContent: '<p>some messages...some messages...</p><p>some messages...some messages...</p>',
      nzOnOk: () => console.log('Info OK')
    });
  }

  success(): void {
    this.modal.success({
      nzTitle: 'This is a success message',
      nzContent: 'some messages...some messages...'
    });
  }

  error(): void {
    this.modal.error({
      nzTitle: 'This is an error message',
      nzContent: 'some messages...some messages...'
    });
  }

  warning(): void {
    this.modal.warning({
      nzTitle: 'This is an warning message',
      nzContent: 'some messages...some messages...'
    });
  }
}
