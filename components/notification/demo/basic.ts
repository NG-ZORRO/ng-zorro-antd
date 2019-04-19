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
  selector: 'nz-demo-notification-basic',
  template: `
    <button nz-button [nzType]="'primary'" (click)="createBasicNotification()">Open the notification box</button>
  `,
  styles: []
})
export class NzDemoNotificationBasicComponent {
  constructor(private notification: NzNotificationService) {}

  createBasicNotification(): void {
    this.notification.blank(
      'Notification Title',
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
    );
  }
}
