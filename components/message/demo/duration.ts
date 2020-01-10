import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'nz-demo-message-duration',
  template: `
    <button nz-button [nzType]="'default'" (click)="createBasicMessage()">Customized display duration</button>
  `
})
export class NzDemoMessageDurationComponent {
  createBasicMessage(): void {
    this.message.success('This is a prompt message for success, and it will disappear in 10 seconds', {
      nzDuration: 10000
    });
  }

  constructor(private message: NzMessageService) {}
}
