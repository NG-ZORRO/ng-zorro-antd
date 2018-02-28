import { Component } from '@angular/core';


@Component({
  selector: 'nz-demo-modal-footer',
  template: `
    <button nz-button nzType="primary" (click)="showModal()">
      <span>显示对话框</span>
    </button>
    <nz-modal [(nzVisible)]="isVisible" [nzTitle]="modalTitle" [nzContent]="modalContent" [nzFooter]="modalFooter" (nzOnCancel)="handleCancel($event)">
      <ng-template #modalTitle>
        自定义对话框标题
      </ng-template>

      <ng-template #modalContent>
        <p>对话框的内容</p>
        <p>对话框的内容</p>
        <p>对话框的内容</p>
        <p>对话框的内容</p>
        <p>对话框的内容</p>
      </ng-template>

      <ng-template #modalFooter>
        <span>自定义底部: </span>
        <button nz-button nzType="default" (click)="handleCancel($event)">自定义返回</button>
        <button nz-button nzType="primary" (click)="handleOk($event)" [nzLoading]="isConfirmLoading">自定义提交</button>
      </ng-template>
    </nz-modal>
  `,
  styles: []
})
export class NzDemoModalFooterComponent {
  isVisible = false;
  isConfirmLoading = false;

  constructor() { }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk($event: MouseEvent): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  handleCancel($event: MouseEvent): void {
    this.isVisible = false;
  }
}
