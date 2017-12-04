import {Component} from '@angular/core';
import {NzNotificationService} from '../../../index.showcase';

@Component({
  selector  : 'nz-demo-notification-icon',
  template  : `
    <button nz-button (click)="createNotification('success')">成 功</button>
    <button nz-button (click)="createNotification('info')">消 息</button>
    <button nz-button (click)="createNotification('warning')">警 告</button>
    <button nz-button (click)="createNotification('error')">错 误</button>
`,
  styles    : []
})
export class NzDemoNotificationIconComponent {
  createNotification = (type) => {
    this._notification.create(type, '这是标题', '这是提示框的文案这是提示框示框的文案这是提示是提示框的文案这是提示框的文案');
  };
  constructor(private _notification: NzNotificationService) {
  }
}

