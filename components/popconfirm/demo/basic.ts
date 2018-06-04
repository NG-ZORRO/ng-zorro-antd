import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-popconfirm-basic',
  template: `
    <a nz-popconfirm nzTitle="Are you sure delete this task?" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()">Delete</a>
  `
})
export class NzDemoPopconfirmBasicComponent {

  cancel(): void {
    this.nzMessageService.info('click cancel');
  }

  confirm(): void {
    this.nzMessageService.info('click confirm');
  }

  constructor(private nzMessageService: NzMessageService) {

  }

}
