import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-message-close',
  template: `
    <button nz-button [nzType]="'default'" (click)="createBasicMessage()">Customized close callback</button>
  `,
  styles: []
})
export class NzDemoMessageCloseComponent {
  createBasicMessage(): void {
    this.message.success('This is a prompt message for success, and it will disappear in 10 seconds', {
      nzDuration: 3000, nzOnClose: (messageID) => {
        alert('Message ' + messageID + ' has been closed');
      }
    });
  }

  constructor(private message: NzMessageService) {
  }
}