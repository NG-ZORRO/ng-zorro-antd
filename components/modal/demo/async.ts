import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-modal-async',
  template: `
    <button nz-button nzType="primary" (click)="showModal()">
      <span>显示对话框</span>
    </button>
    <nz-modal [(nzVisible)]="isVisible" nzTitle="对话框标题" (nzOnCancel)="handleCancel($event)" (nzOnOk)="handleOk($event)" [nzOkLoading]="isOkLoading">
      <p>对话框的内容</p>
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
