import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'nz-demo-popconfirm-async',
  imports: [NzButtonModule, NzPopconfirmModule],
  template: `
    <button
      nz-button
      nzType="primary"
      nz-popconfirm
      nzPopconfirmTitle="Title"
      [nzBeforeConfirm]="beforeConfirm"
      (nzOnConfirm)="confirm()"
      (nzOnCancel)="cancel()"
    >
      Open Popconfirm with async logic
    </button>
  `
})
export class NzDemoPopconfirmAsyncComponent {
  constructor(private nzMessageService: NzMessageService) {}

  cancel(): void {
    this.nzMessageService.info('click cancel');
  }

  confirm(): void {
    this.nzMessageService.info('click confirm');
  }

  beforeConfirm(): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(true);
        observer.complete();
      }, 3000);
    });
  }
}
