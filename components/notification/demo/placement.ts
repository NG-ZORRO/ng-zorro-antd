import { Component } from '@angular/core';
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'nz-demo-notification-placement',
  template: `
    <button nz-button (click)="createBasicNotification('topLeft')" nzType="primary"><i nz-icon nzType="radius-upleft"></i> topLeft</button>
    <button nz-button (click)="createBasicNotification('topRight')" nzType="primary">
      <i nz-icon nzType="radius-upright"></i> topRight
    </button>
    <nz-divider></nz-divider>
    <button nz-button (click)="createBasicNotification('bottomLeft')" nzType="primary">
      <i nz-icon nzType="radius-bottomleft"></i> bottomLeft
    </button>
    <button nz-button (click)="createBasicNotification('bottomRight')" nzType="primary">
      <i nz-icon nzType="radius-bottomright"></i> bottomRight
    </button>
  `,
  styles: [
    `
      button {
        margin-right: 1em;
      }
    `
  ]
})
export class NzDemoNotificationPlacementComponent {
  placement = 'topRight';

  createBasicNotification(position: NzNotificationPlacement): void {
    this.notification.blank(
      'Notification Title',
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      { nzPlacement: position }
    );
  }

  constructor(private notification: NzNotificationService) {}
}
