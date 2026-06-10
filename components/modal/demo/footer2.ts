import { Component, inject, signal } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'nz-demo-modal-footer2',
  imports: [NzButtonModule, NzModalModule],
  template: `
    <button nz-button nzType="primary" (click)="showModal1()">
      <span>In Template</span>
    </button>
    <br />
    <br />
    <button nz-button nzType="primary" (click)="showModal2()">
      <span>In Component</span>
    </button>
    <nz-modal [(nzVisible)]="isVisible" nzTitle="Custom Modal Title" (nzOnCancel)="handleCancel()">
      <div *nzModalContent>
        <p>Modal Content</p>
        <p>Modal Content</p>
        <p>Modal Content</p>
        <p>Modal Content</p>
        <p>Modal Content</p>
      </div>
      <div *nzModalFooter>
        <span>Modal Footer:</span>
        <button nz-button nzType="default" (click)="handleCancel()">Custom Callback</button>
        <button nz-button nzType="primary" (click)="handleOk()" [nzLoading]="isConfirmLoading()">Custom Submit</button>
      </div>
    </nz-modal>
  `
})
export class NzDemoModalFooter2Component {
  private readonly modalService = inject(NzModalService);

  readonly isVisible = signal(false);
  readonly isConfirmLoading = signal(false);

  showModal1(): void {
    this.isVisible.set(true);
  }

  showModal2(): void {
    this.modalService.create({
      nzTitle: 'Modal Title',
      nzContent: NzModalCustomFooterComponent
    });
  }

  handleOk(): void {
    this.isConfirmLoading.set(true);
    setTimeout(() => {
      this.isVisible.set(false);
      this.isConfirmLoading.set(false);
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible.set(false);
  }
}

@Component({
  selector: 'nz-modal-custom-footer-component',
  imports: [NzButtonModule, NzModalModule],
  template: `
    <div>
      <p>Modal Content</p>
      <p>Modal Content</p>
      <p>Modal Content</p>
      <p>Modal Content</p>
      <p>Modal Content</p>
    </div>
    <div *nzModalFooter>
      <button nz-button nzType="default" (click)="destroyModal()">Custom Callback</button>
      <button nz-button nzType="primary" (click)="destroyModal()">Custom Submit</button>
    </div>
  `
})
export class NzModalCustomFooterComponent {
  private readonly modalRef = inject(NzModalRef);

  destroyModal(): void {
    this.modalRef.destroy();
  }
}
