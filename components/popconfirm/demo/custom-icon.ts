import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-popconfirm-custom-icon',
  template: `
    <a nz-popconfirm nzTitle="A smile!" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" nzIcon="smile" nzIconColor="#40a9ff">Custom Icon</a>
  `
})
export class NzDemoPopconfirmCustomIconComponent {

  cancel(): void {
    this.nzMessageService.info('click cancel');
  }

  confirm(): void {
    this.nzMessageService.info('click confirm');
  }

  constructor(private nzMessageService: NzMessageService) {

  }

}
