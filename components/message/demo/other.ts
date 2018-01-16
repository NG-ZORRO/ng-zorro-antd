import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-message-other',
  template: `
    <button nz-button (click)="createMessage('success')">Success</button>
    <button nz-button (click)="createMessage('error')">Error</button>
    <button nz-button (click)="createMessage('warning')">Warning</button>
  `,
  styles  : [
    `
      :host ::ng-deep .ant-btn {
        margin-right: 8px;
      }
    `
  ]
})
export class NzDemoMessageOtherComponent {
  createMessage(type: string): void {
    this._message.create(type, `This is a message of ${type}`);
  }

  constructor(private _message: NzMessageService) {
  }
}
