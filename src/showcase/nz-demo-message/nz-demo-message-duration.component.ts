import {Component} from '@angular/core';
import {NzMessageService} from '../../../index.showcase';

@Component({
  selector  : 'nz-demo-message-duration',
  template  : `
    <button nz-button [nzType]="'default'" (click)="createBasicMessage()">自定义时长提示</button>
`,
  styles    : []
})
export class NzDemoMessageDurationComponent {
  createBasicMessage = () => {
    this._message.success('这是一条成功的提示,并将于10秒后消失', {nzDuration: 10000});
  };
  constructor(private _message: NzMessageService) {
  }
}

