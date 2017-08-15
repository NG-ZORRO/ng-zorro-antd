import {Component, OnInit} from '@angular/core';
import {NzNotificationService} from '../../../index.showcase';

@Component({
  selector  : 'nz-demo-notification-basic',
  template  : `
    <button nz-button [nzType]="'primary'" (click)="createBasicNotification()">打开通知提示框</button>
  `,
  styles    : []
})
export class NzDemoNotificationBasicComponent implements OnInit {

  constructor(private _notification: NzNotificationService) { }

  ngOnInit() { }

  createBasicNotification() {
    this._notification.blank('这是标题', '这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案');
  }
}

