import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'nz-demo-notification-placement',
  imports: [NzButtonModule, NzDividerModule, NzIconModule],
  template: `
    <button nz-button (click)="createNotification('top')" nzType="primary">
      <nz-icon nzType="border-top" nzTheme="outline" />
      top
    </button>
    <button nz-button (click)="createNotification('bottom')" nzType="primary">
      <nz-icon nzType="border-bottom" nzTheme="outline" />
      bottom
    </button>
    <nz-divider />
    <button nz-button (click)="createNotification('topLeft')" nzType="primary">
      <nz-icon nzType="radius-upleft" />
      topLeft
    </button>
    <button nz-button (click)="createNotification('topRight')" nzType="primary">
      <nz-icon nzType="radius-upright" />
      topRight
    </button>
    <nz-divider />
    <button nz-button (click)="createNotification('bottomLeft')" nzType="primary">
      <nz-icon nzType="radius-bottomleft" />
      bottomLeft
    </button>
    <button nz-button (click)="createNotification('bottomRight')" nzType="primary">
      <nz-icon nzType="radius-bottomright" />
      bottomRight
    </button>
  `,
  styles: `
    button {
      margin-right: 1em;
    }
  `
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
