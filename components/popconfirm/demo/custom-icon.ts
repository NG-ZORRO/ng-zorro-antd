import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-popconfirm-custom-icon',
  template: `
    <a nz-popconfirm nzTitle="A smile!" (nzOnConfirm)="confirm()" (nzOnCancel)="cancel()" [nzIcon]="customIcon">Custom Icon</a>
    <ng-template #customIcon>
      <i nz-icon type="smile" style="color: #40a9ff;" theme="outline"></i>
    </ng-template>
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
