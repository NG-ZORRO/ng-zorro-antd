import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'nz-demo-notification-custom-style',
  template: `
    <button nz-button [nzType]="'primary'" (click)="createBasicNotification()">Open the notification box</button>
  `
})
export class NzDemoNotificationCustomStyleComponent {
  constructor(private notification: NzNotificationService) {}

  createBasicNotification(): void {
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
