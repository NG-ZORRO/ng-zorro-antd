import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';

@Component({
  selector: 'nz-demo-message-close',
  template: `
    <button nz-button [nzType]="'default'" (click)="createBasicMessage()">Customized close callback</button>
  `,
  styles: []
})
export class NzDemoMessageCloseComponent implements OnDestroy {

  sub = Subscription.EMPTY;

  createBasicMessage(): void {
    const messageInstance = this.message.success('This is a prompt message for success, and it will disappear in 3 seconds', {
      nzDuration: 3000, nzOnClose: (message) => {
        alert('Message on close filter triggered');
        return true;
      }
    });
    if (this.sub === Subscription.EMPTY) {
      messageInstance.nzAfterClose.subscribe(message => {
        alert('message has been closed');
      });
    }
  }

  constructor(private message: NzMessageService) {
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
