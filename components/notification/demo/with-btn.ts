import { Component, TemplateRef, ViewChild } from '@angular/core';

import { NzNotificationComponent, NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'nz-demo-notification-with-btn',
  template: `
    <ng-template #notificationBtnTpl let-notification>
      <button nz-button nzType="primary" nzSize="small" (click)="notification.close()">Confirm</button>
    </ng-template>

    <button nz-button [nzType]="'primary'" (click)="openNotification()"> Open the notification box </button>
  `
})
export class NzDemoNotificationWithBtnComponent {
  @ViewChild('notificationBtnTpl', { static: true }) btnTemplate!: TemplateRef<{ $implicit: NzNotificationComponent }>;
  constructor(private notification: NzNotificationService) {}

  openNotification(): void {
    this.notification.blank(
      'Notification Title',
      'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
      {
        nzButton: this.btnTemplate
      }
    );
  }
}
