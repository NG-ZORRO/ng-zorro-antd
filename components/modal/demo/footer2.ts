/* entryComponents: NzModalCustomFooterComponent */

import { Component } from '@angular/core';
import { NzModal, NzModalRef2 } from 'ng-zorro-antd/modal';

@Component({
  selector: 'nz-demo-modal-footer2',
  template: `
    <button nz-button nzType="primary" (click)="showModal1()">
      <span>In Template</span>
    </button>
    <br />
    <br />
    <button nz-button nzType="primary" (click)="showModal2()">
      <span>In Component</span>
    </button>
    <nz-modal2 [(nzVisible)]="isVisible" nzTitle="Custom Modal Title" (nzOnCancel)="handleCancel()">
      <div>
        <p>Modal Content</p>
        <p>Modal Content</p>
        <p>Modal Content</p>
        <p>Modal Content</p>
        <p>Modal Content</p>
      </div>
      <div *nzModalFooter>
        <span>Modal Footer: </span>
        <button nz-button nzType="default" (click)="handleCancel()">Custom Callback</button>
        <button nz-button nzType="primary" (click)="handleOk()" [nzLoading]="isConfirmLoading">Custom Submit</button>
      </div>
    </nz-modal2>
  `,
  styles: []
})
export class NzDemoModalFooter2Component {
  isVisible = false;
  isConfirmLoading = false;

  constructor(private modalService: NzModal) {}

  showModal1(): void {
    this.isVisible = true;
  }

  showModal2(): void {
    this.modalService.create({
      nzTitle: 'Modal Title',
      nzContent: NzModalCustomFooterComponent
    });
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}

@Component({
  selector: 'nz-modal-custom-footer-component',
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
  constructor(private modal: NzModalRef2) {}

  destroyModal(): void {
    this.modal.destroy();
  }
}
