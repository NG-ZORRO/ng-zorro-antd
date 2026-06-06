import { Component, inject } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'nz-demo-notification-update',
  imports: [NzButtonModule],
  template: `<button nz-button nzType="primary" (click)="createNotification()"> Open the notification box </button>`
})
export class NzDemoNotificationUpdateComponent {
  private readonly notification = inject(NzNotificationService);

  createNotification(): void {
    this.notification.blank('Notification Title', 'Description.', {
      nzKey: 'key'
    });

    setTimeout(() => {
      this.notification.blank('New Title', 'New description', {
        nzKey: 'key'
      });
    }, 1000);
  }
}
