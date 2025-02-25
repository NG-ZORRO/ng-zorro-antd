import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'nz-demo-modal-manual',
  imports: [NzButtonModule, NzModalModule],
  template: `<button nz-button (click)="success()">Success</button>`
})
export class NzDemoModalManualComponent {
  constructor(private modalService: NzModalService) {}

  success(): void {
    const modal = this.modalService.success({
      nzTitle: 'This is a notification message',
      nzContent: 'This modal will be destroyed after 1 second'
    });

    setTimeout(() => modal.destroy(), 1000);
  }
}
