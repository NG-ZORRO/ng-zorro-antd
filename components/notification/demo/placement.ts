import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'nz-demo-notification-placement',
  standalone: true,
  imports: [NzButtonModule, NzDividerModule, NzIconModule],
  template: `
    <button nz-button (click)="createNotification('top')" nzType="primary">
      <span nz-icon nzType="border-top" nzTheme="outline"></span>
      top
    </button>
    <button nz-button (click)="createNotification('bottom')" nzType="primary">
      <span nz-icon nzType="border-bottom" nzTheme="outline"></span>
      bottom
    </button>
    <nz-divider></nz-divider>
    <button nz-button (click)="createNotification('topLeft')" nzType="primary">
      <span nz-icon nzType="radius-upleft"></span>
      topLeft
    </button>
    <button nz-button (click)="createNotification('topRight')" nzType="primary">
      <span nz-icon nzType="radius-upright"></span>
      topRight
    </button>
    <nz-divider></nz-divider>
    <button nz-button (click)="createNotification('bottomLeft')" nzType="primary">
      <span nz-icon nzType="radius-bottomleft"></span>
      bottomLeft
    </button>
    <button nz-button (click)="createNotification('bottomRight')" nzType="primary">
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

  constructor(private notification: NzNotificationService) {}

  createNotification(position: NzNotificationPlacement): void {
    this.notification.blank(
      'Notification Title',
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      { nzPlacement: position }
    );
  }
}
