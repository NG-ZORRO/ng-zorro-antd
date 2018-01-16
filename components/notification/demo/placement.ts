import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-notification-placement',
  template: `
    <nz-select [(ngModel)]="placement" style="width: 120px; margin-right: 10px;">
      <nz-option nzValue="topLeft" nzLabel="topLeft"></nz-option>
      <nz-option nzValue="topRight" nzLabel="topRight"></nz-option>
      <nz-option nzValue="bottomLeft" nzLabel="bottomLeft"></nz-option>
      <nz-option nzValue="bottomRight" nzLabel="bottomRight"></nz-option>
    </nz-select>
    <button nz-button [nzType]="'primary'" (click)="createBasicNotification()">Open the notification box</button>
  `,
  styles  : []
})
export class NzDemoNotificationPlacementComponent {
  placement = 'topRight';

  constructor(private _notification: NzNotificationService) {
  }

  createBasicNotification(): void {
    this._notification.config({
      nzPlacement: this.placement
    });
    this._notification.blank('Notification Title', 'This is the content of the notification. This is the content of the notification. This is the content of the notification.');
  }
}
