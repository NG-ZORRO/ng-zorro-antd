import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'nz-demo-notification-placement',
  template: `
    <nz-select
      [(ngModel)]="placement"
      style="width: 120px; margin-right: 10px;"
      (ngModelChange)="clearBeforeNotifications()"
    >
      <nz-option nzValue="topLeft" nzLabel="topLeft"></nz-option>
      <nz-option nzValue="topRight" nzLabel="topRight"></nz-option>
      <nz-option nzValue="bottomLeft" nzLabel="bottomLeft"></nz-option>
      <nz-option nzValue="bottomRight" nzLabel="bottomRight"></nz-option>
    </nz-select>
    <button nz-button [nzType]="'primary'" (click)="createBasicNotification()">Open the notification box</button>
  `
})
export class NzDemoNotificationPlacementComponent {
  placement = 'topRight';

  clearBeforeNotifications(): void {
    this.notification.remove();
  }

  createBasicNotification(): void {
    this.notification.config({
      nzPlacement: this.placement
    });
    this.notification.blank(
      'Notification Title',
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
    );
  }

  constructor(private notification: NzNotificationService) {}
}
