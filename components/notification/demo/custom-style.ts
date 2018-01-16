import { Component, TemplateRef } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-notification-custom-style',
  template: `
    <button nz-button [nzType]="'primary'" (click)="createBasicNotification()">Open the notification box</button>
  `,
  styles  : []
})
export class NzDemoNotificationCustomStyleComponent {

  constructor(private _notification: NzNotificationService) {
  }

  createBasicNotification(): void {
    this._notification.blank('Notification Title', 'This is the content of the notification. This is the content of the notification. This is the content of the notification.', {
      nzStyle   : {
        width     : '600px',
        marginLeft: '-265px'
      },
      nzClass   : 'test-class'
    });
  }
}
