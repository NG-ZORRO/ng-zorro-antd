import {Component} from '@angular/core';
import {NzMessageService} from '../../../index.showcase';

@Component({
  selector  : 'nz-demo-message-icon',
  template  : `
    <button nz-button (click)="createMessage('success','成功')">显示成功提示</button>
    <button nz-button (click)="createMessage('error','报错')">显示报错提示</button>
    <button nz-button (click)="createMessage('warning','警告')">显示警告提示</button>
`,
  styles    : []
})
export class NzDemoMessageIconComponent {
  createMessage = (type, text) => {
    this._message.create(type, `这是一条${text}提示`);
  };
  constructor(private _message: NzMessageService) {
  }
}

