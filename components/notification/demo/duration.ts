import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'nz-demo-notification-duration',
  template: `
    <button nz-button [nzType]="'primary'" (click)="createBasicNotification()">Open the notification box</button>
  `
})
export class NzDemoNotificationDurationComponent {
  createBasicNotification(): void {
    this.notification.blank(
      'Notification Title',
      'I will never close automatically. I will be close automatically. I will never close automatically.',
      { nzDuration: 0 }
    );
  }

  constructor(private notification: NzNotificationService) {}
}
