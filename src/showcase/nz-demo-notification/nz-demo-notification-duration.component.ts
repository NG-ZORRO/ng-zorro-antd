import {Component} from '@angular/core';
import {NzNotificationService} from '../../../index.showcase';

@Component({
  selector  : 'nz-demo-notification-duration',
  template  : `
    <button nz-button [nzType]="'primary'" (click)="createBasicNotification()">打开通知提示框</button>
`,
  styles    : []
})
export class NzDemoNotificationDurationComponent {
  createBasicNotification = () => {
    this._notification.blank('这是标题', '我不会自动关闭，我不会自动关闭，我不会自动关闭，我不会自动关闭，我不会自动关闭，我不会自动关闭，我不会自动关闭', {nzDuration: 0});
  };
  constructor(private _notification: NzNotificationService) {
  }
}

