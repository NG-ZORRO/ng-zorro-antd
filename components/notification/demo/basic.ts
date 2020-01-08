import { Component } from '@angular/core';
import { NotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'nz-demo-notification-basic',
  template: `
    <button nz-button [nzType]="'primary'" (click)="createBasicNotification()">Open the notification box</button>
  `
})
export class NzDemoNotificationBasicComponent {
  constructor(private notification: NotificationService) {}

  createBasicNotification(): void {
    this.notification.blank(
      'Notification Title',
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
    );
  }
}
