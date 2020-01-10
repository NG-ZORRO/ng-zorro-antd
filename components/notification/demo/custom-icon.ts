import { Component, TemplateRef } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'nz-demo-notification-custom-icon',
  template: `
    <ng-template #template>
      <div class="ant-notification-notice-content">
        <div class="ant-notification-notice-with-icon">
          <span class="ant-notification-notice-icon"><i nz-icon nzType="smile" style="color: rgb(16, 142, 233);"></i></span>
          <div class="ant-notification-notice-message">Notification Title</div>
          <div class="ant-notification-notice-description">
            This is the content of the notification. This is the content of the notification. This is the content of the notification.
          </div>
        </div>
      </div>
    </ng-template>
    <button nz-button [nzType]="'primary'" (click)="createBasicNotification(template)">
      Open the notification box
    </button>
  `
})
export class NzDemoNotificationCustomIconComponent {
  constructor(private notification: NzNotificationService) {}

  createBasicNotification(template: TemplateRef<{}>): void {
    this.notification.template(template);
  }
}
