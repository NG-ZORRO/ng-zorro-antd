import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'nz-demo-popconfirm-async',
  template: `
    <button
      nz-popconfirm
      nzPopconfirmTitle="Title"
      [nzBeforeConfirm]="beforeConfirm"
      (nzOnConfirm)="confirm()"
      (nzOnCancel)="cancel()"
      nz-button
      nzType="primary"
    >
      Open Popconfirm with async logic
    </button>
  `
})
export class NzDemoPopconfirmAsyncComponent {
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

  constructor(private nzMessageService: NzMessageService) {}
}
