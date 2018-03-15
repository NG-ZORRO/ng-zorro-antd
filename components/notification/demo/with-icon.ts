import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-notification-with-icon',
  template: `
    <button nz-button (click)="createNotification('success')">Success</button>
    <button nz-button (click)="createNotification('info')">Info</button>
    <button nz-button (click)="createNotification('warning')">Warning</button>
    <button nz-button (click)="createNotification('error')">Error</button>
  `,
  styles  : [
    `
      :host ::ng-deep .ant-btn {
        margin-right: 1em;
      }
    `
  ]
})
export class NzDemoNotificationWithIconComponent {
  createNotification(type: string): void {
    this._notification.create(type, 'Notification Title',
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.');
  }

  constructor(private _notification: NzNotificationService) {
  }
}
