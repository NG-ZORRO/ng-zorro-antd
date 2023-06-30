import { Component } from '@angular/core';

import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'nz-demo-notification-update',
  template: `
    <button nz-button [nzType]="'primary'" (click)="createAutoUpdatingNotifications()">
      Open the notification box
    </button>
  `
})
export class NzDemoNotificationUpdateComponent {
  constructor(private notification: NzNotificationService) {}

  createAutoUpdatingNotifications(): void {
    let notificationRef = this.notification.blank('Notification Title', 'Description.', {
      nzKey: 'key'
    });
    console.log(notificationRef);

    setTimeout(() => {
      notificationRef = this.notification.blank('New Title', 'New description', {
        nzKey: 'key'
      });
      console.log(notificationRef);
    }, 1000);
  }
}
