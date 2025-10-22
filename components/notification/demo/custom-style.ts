import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'nz-demo-notification-custom-style',
  imports: [NzButtonModule],
  template: `<button nz-button nzType="primary" (click)="createNotification()">Open the notification box</button>`
})
export class NzDemoNotificationCustomStyleComponent {
  constructor(private notification: NzNotificationService) {}

  createNotification(): void {
    this.notification.blank(
      'Notification Title',
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      {
        nzStyle: {
          width: '600px',
          marginLeft: '-265px'
        },
        nzClass: 'test-class'
      }
    );
  }
}
