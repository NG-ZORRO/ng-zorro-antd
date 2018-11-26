import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-message-close',
  template: `
    <button nz-button [nzType]="'default'" (click)="createBasicMessage()">Customized close callback</button>
  `,
  styles: []
})
export class NzDemoMessageCloseComponent implements OnInit {

  ngOnInit(): void {
    this.message.nzAfterClose.subscribe(message => {
      console.log(message);
    });
  }

  createBasicMessage(): void {
    this.message.success('This is a prompt message for success, and it will disappear in 3 seconds', {
      nzDuration: 3000
    });
  }

  constructor(private message: NzMessageService) {
  }
}
