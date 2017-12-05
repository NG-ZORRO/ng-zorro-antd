import {Component} from '@angular/core';
import {NzMessageService} from '../../../index.showcase';

@Component({
  selector  : 'nz-demo-message-basic',
  template  : `
    <button nz-button [nzType]="'primary'" (click)="createBasicMessage()">显示普通提醒</button>
`,
  styles    : []
})
export class NzDemoMessageBasicComponent {

  constructor(private _message: NzMessageService) {
  }

  createBasicMessage() {
    this._message.info('这是一条普通的提醒');
  }
}

