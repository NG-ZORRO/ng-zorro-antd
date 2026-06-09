import { Component, signal } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'nz-demo-modal-basic',
  imports: [NzButtonModule, NzModalModule],
  template: `
    <button nz-button nzType="primary" (click)="showModal()"><span>Show Modal</span></button>
    <nz-modal [(nzVisible)]="isVisible" nzTitle="The first Modal" (nzOnCancel)="handleCancel()" (nzOnOk)="handleOk()">
      <ng-container *nzModalContent>
        <p>Content one</p>
        <p>Content two</p>
        <p>Content three</p>
      </ng-container>
    </nz-modal>
  `
})
export class NzDemoModalBasicComponent {
  readonly isVisible = signal(false);

  showModal(): void {
    this.isVisible.set(true);
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible.set(false);
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible.set(false);
  }
}
