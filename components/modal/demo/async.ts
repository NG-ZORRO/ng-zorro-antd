import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-modal-async',
  template: `
    <button nz-button nzType="primary" (click)="showModal()">
      <span>Show Modal</span>
    </button>
    <nz-modal [(nzVisible)]="isVisible" nzTitle="Modal Title" (nzOnCancel)="handleCancel($event)" (nzOnOk)="handleOk($event)" [nzOkLoading]="isOkLoading">
      <p>Modal Content</p>
    </nz-modal>
  `,
  styles: []
})
export class NzDemoModalAsyncComponent {
  isVisible = false;
  isOkLoading = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk($event: MouseEvent): void {
    this.isOkLoading = true;
    window.setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel($event: MouseEvent): void {
    this.isVisible = false;
  }
}
