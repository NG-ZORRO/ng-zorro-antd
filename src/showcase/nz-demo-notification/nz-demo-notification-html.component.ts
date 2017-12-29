import {Component} from '@angular/core';
import {NzNotificationService} from '../../../index.showcase';

@Component({
  selector  : 'nz-demo-notification-html',
  template  : `
    <button nz-button [nzType]="'primary'" (click)="createBasicNotification()">打开通知提示框</button>
`,
  styles    : []
})
export class NzDemoNotificationHtmlComponent {
  createBasicNotification = () => {
    this._notification.html('<strong>自定义通知栏内HTML</strong><br><p>HTML</p>');
  };
  constructor(private _notification: NzNotificationService) {
  }
}

