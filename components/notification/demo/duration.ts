import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'nz-demo-notification-duration',
  imports: [NzButtonModule],
  template: `<button nz-button nzType="primary" (click)="createNotification()">Open the notification box</button>`
})
export class NzDemoNotificationDurationComponent {
  constructor(private notification: NzNotificationService) {}

  createNotification(): void {
    this.notification.blank(
      'Notification Title',
      'I will never close automatically. This is a purposely very very long description that has many many characters and words.',
      { nzDuration: 0 }
    );
  }
}
