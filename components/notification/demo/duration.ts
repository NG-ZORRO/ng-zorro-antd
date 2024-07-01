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
      'I will never close automatically. This is a purposely very very long description that has many many characters and words.',
      { nzDuration: 0 }
    );
  }

  constructor(private notification: NzNotificationService) {}
}
