import { Component, TemplateRef, ViewChild } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'nz-demo-notification-template',
  standalone: true,
  imports: [NzButtonModule, NzTagModule],
  template: `
    <button nz-button nzType="primary" (click)="createNotification()">Open the notification box</button>
    <ng-template let-fruit="data">
      It's a
      <nz-tag [nzColor]="fruit.color">{{ fruit.name }}</nz-tag>
      <button nz-button nzSize="small">Cut It!</button>
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
  @ViewChild(TemplateRef, { static: false }) template?: TemplateRef<{}>;

  constructor(private notificationService: NzNotificationService) {}

  createNotification(): void {
    const fruits = [
      { name: 'Apple', color: 'red' },
      { name: 'Orange', color: 'orange' },
      { name: 'Watermelon', color: 'green' }
    ];

    fruits.forEach(fruit => {
      this.notificationService.template(this.template!, { nzData: fruit });
    });
  }
}
