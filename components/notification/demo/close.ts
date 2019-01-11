import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';

@Component({
  selector: 'nz-demo-notification-close',
  template: `
    <button nz-button [nzType]="'primary'" (click)="createBasicNotification()">Open the notification with call back
      box
    </button>
  `,
  styles: []
})
export class NzDemoNotificationCloseComponent implements OnDestroy {

  sub = Subscription.EMPTY;

  constructor(private notification: NzNotificationService) {
  }

  createBasicNotification(): void {
    const notificationInstance = this.notification.blank('Notification Title',
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.', {
        nzOnClose: () => new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
      });
    if (this.sub === Subscription.EMPTY) {
      notificationInstance.nzAfterClose.subscribe(note => alert('notification has been closed'));
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
