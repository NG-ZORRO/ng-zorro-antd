import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-message-loading',
  template: `
    <button nz-button [nzType]="'default'" (click)="createBasicMessage()">Display a loading indicator</button>
  `,
  styles  : []
})
export class NzDemoMessageLoadingComponent {

  constructor(private _message: NzMessageService) {
  }

  createBasicMessage(): void {
    const id = this._message.loading('Action in progress..', { nzDuration: 0 }).messageId;
    setTimeout(_ => {
      this._message.remove(id);
    }, 2500);
  }
}
