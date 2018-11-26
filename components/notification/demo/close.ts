import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-notification-close',
  template: `
    <button nz-button [nzType]="'primary'" (click)="createBasicNotification()">Open the notification with call back box</button>
  `,
  styles: []
})
export class NzDemoNotificationCloseComponent {

  constructor(private notification: NzNotificationService) {
  }

  createBasicNotification(): void {
    this.notification.blank('Notification Title',
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.', {
        nzOnClose: (notificationId) => {
         alert('Notification '+ notificationId + ' has been closed')
        }
      });
  }
}
