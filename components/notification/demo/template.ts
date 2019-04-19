/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-notification-template',
  template: `
    <button nz-button [nzType]="'primary'" (click)="ninja()">Open the notification box</button>
    <ng-template let-fruit="data">
      It's a <nz-tag [nzColor]="fruit.color">{{ fruit.name }}</nz-tag>
      <button nz-button nzType="small">Cut It!</button>
    </ng-template>
  `,
  styles: [
    `
      button {
        margin-top: 8px;
      }
    `
  ]
})
export class NzDemoNotificationTemplateComponent {
  @ViewChild(TemplateRef) template: TemplateRef<{}>;

  ninja(): void {
    const fruits = [
      { name: 'Apple', color: 'red' },
      { name: 'Orange', color: 'orange' },
      { name: 'Watermelon', color: 'green' }
    ];

    fruits.forEach(fruit => {
      this.notificationService.template(this.template, { nzData: fruit });
    });
  }

  constructor(private notificationService: NzNotificationService) {}
}
