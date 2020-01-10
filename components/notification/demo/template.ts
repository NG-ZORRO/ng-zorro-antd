import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

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
  @ViewChild(TemplateRef, { static: false }) template: TemplateRef<{}>;

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
