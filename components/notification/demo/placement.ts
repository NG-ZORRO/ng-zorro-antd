import { Component } from '@angular/core';

import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'nz-demo-notification-placement',
  template: `
    <button nz-button (click)="createBasicNotification('top')" nzType="primary">
      <span nz-icon nzType="border-top" nzTheme="outline"></span>
      top
    </button>
    <button nz-button (click)="createBasicNotification('bottom')" nzType="primary">
      <span nz-icon nzType="border-bottom" nzTheme="outline"></span>
      bottom
    </button>
    <nz-divider></nz-divider>
    <button nz-button (click)="createBasicNotification('topLeft')" nzType="primary">
      <span nz-icon nzType="radius-upleft"></span>
      topLeft
    </button>
    <button nz-button (click)="createBasicNotification('topRight')" nzType="primary">
      <span nz-icon nzType="radius-upright"></span>
      topRight
    </button>
    <nz-divider></nz-divider>
    <button nz-button (click)="createBasicNotification('bottomLeft')" nzType="primary">
      <span nz-icon nzType="radius-bottomleft"></span>
      bottomLeft
    </button>
    <button nz-button (click)="createBasicNotification('bottomRight')" nzType="primary">
      <span nz-icon nzType="radius-bottomright"></span>
      bottomRight
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
