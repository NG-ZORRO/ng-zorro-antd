import { Component, model, signal } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'nz-demo-modal-async',
  imports: [NzButtonModule, NzModalModule],
  template: `
    <button nz-button nzType="primary" (click)="showModal()">
      <span>Show Modal</span>
    </button>
    <nz-modal
      [(nzVisible)]="visible"
      nzTitle="Modal Title"
      (nzOnCancel)="handleCancel()"
      (nzOnOk)="handleOk()"
      [nzOkLoading]="loading()"
    >
      <p *nzModalContent>Modal Content</p>
    </nz-modal>
  `
})
export class NzDemoModalAsyncComponent {
  visible = model(false);
  loading = signal(false);

  showModal(): void {
    this.visible.set(true);
  }

  handleOk(): void {
    this.loading.set(true);
    setTimeout(() => {
      this.visible.set(false);
      this.loading.set(false);
    }, 3000);
  }

  handleCancel(): void {
    this.visible.set(false);
  }
}
