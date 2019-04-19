/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, TemplateRef } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-notification-with-btn',
  template: `
    <ng-template #template let-notification>
      <div class="ant-notification-notice-content">
        <div>
          <div class="ant-notification-notice-message">Notification Title</div>
          <div class="ant-notification-notice-description">
            A function will be be called after the notification is closed (automatically after the "duration" time of
            manually).
          </div>
          <span class="ant-notification-notice-btn">
            <button nz-button nzType="primary" nzSize="small" (click)="notification.close()">
              <span>Confirm</span>
            </button>
          </span>
        </div>
      </div>
    </ng-template>
    <button nz-button [nzType]="'primary'" (click)="createBasicNotification(template)">
      Open the notification box
    </button>
  `,
  styles: []
})
export class NzDemoNotificationWithBtnComponent {
  constructor(private notification: NzNotificationService) {}

  createBasicNotification(template: TemplateRef<{}>): void {
    this.notification.template(template);
  }
}
