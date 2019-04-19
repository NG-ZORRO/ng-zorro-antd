/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-notification-update',
  template: `
    <button nz-button [nzType]="'primary'" (click)="createAutoUpdatingNotifications()">
      Open the notification box
    </button>
  `,
  styles: []
})
export class NzDemoNotificationUpdateComponent {
  constructor(private notification: NzNotificationService) {}

  createAutoUpdatingNotifications(): void {
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
