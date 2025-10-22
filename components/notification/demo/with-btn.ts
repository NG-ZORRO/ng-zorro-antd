import { Component, TemplateRef, ViewChild } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationComponent, NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'nz-demo-notification-with-btn',
  imports: [NzButtonModule],
  template: `
    <ng-template #notificationBtnTpl let-notification>
      <button nz-button nzType="primary" nzSize="small" (click)="notification.close()">Confirm</button>
    </ng-template>

    <button nz-button nzType="primary" (click)="createNotification()">Open the notification box</button>
  `
})
export class NzDemoNotificationWithBtnComponent {
  @ViewChild('notificationBtnTpl', { static: true }) btnTemplate!: TemplateRef<{ $implicit: NzNotificationComponent }>;
  constructor(private notification: NzNotificationService) {}

  createNotification(): void {
    this.notification.blank(
      'Notification Title',
      'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
      {
        nzButton: this.btnTemplate
      }
    );
  }
}
