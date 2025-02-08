import { Component, TemplateRef } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { type NzNotificationComponent, NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'nz-demo-notification-custom-icon',
  imports: [NzIconModule, NzButtonModule],
  template: `
    <ng-template #template>
      <div class="ant-notification-notice-content">
        <div class="ant-notification-notice-with-icon">
          <span class="ant-notification-notice-icon">
            <nz-icon nzType="smile" style="color: rgb(16, 142, 233);" />
          </span>
          <div class="ant-notification-notice-message">Notification Title</div>
          <div class="ant-notification-notice-description">
            This is the content of the notification. This is the content of the notification. This is the content of the
            notification.
          </div>
        </div>
      </div>
    </ng-template>
    <button nz-button nzType="primary" (click)="createNotification(template)">Open the notification box</button>
  `
})
export class NzDemoNotificationCustomIconComponent {
  constructor(private notification: NzNotificationService) {}

  createNotification(template: TemplateRef<{ $implicit: NzNotificationComponent; data: undefined }>): void {
    this.notification.template(template);
  }
}
