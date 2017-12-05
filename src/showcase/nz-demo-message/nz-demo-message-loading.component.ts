import {Component} from '@angular/core';
import {NzMessageService} from '../../../index.showcase';

@Component({
  selector  : 'nz-demo-message-loading',
  template  : `
    <button nz-button [nzType]="'default'" (click)="createBasicMessage()">显示加载中</button>
`,
  styles    : []
})
export class NzDemoMessageLoadingComponent {
  _id;
  createBasicMessage = () => {
    this._id = this._message.loading('正在执行中', { nzDuration: 0 }).messageId;
    setTimeout(_ => {
      this._message.remove(this._id);
    }, 2500)
  };
  constructor(private _message: NzMessageService) {
  }
}

