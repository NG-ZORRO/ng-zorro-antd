import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-notification-close',
  template: `
    <button nz-button [nzType]="'primary'" (click)="createBasicNotification()">Open the notification with call back
      box
    </button>
  `,
  styles: []
})
export class NzDemoNotificationCloseComponent implements OnInit {

  ngOnInit(): void {
    this.notification.nzAfterClose.subscribe(data => {
      alert('Notification has been destroyed');
    });
  }

  constructor(private notification: NzNotificationService) {
  }

  createBasicNotification(): void {
    this.notification.blank('Notification Title',
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.');
  }
}
