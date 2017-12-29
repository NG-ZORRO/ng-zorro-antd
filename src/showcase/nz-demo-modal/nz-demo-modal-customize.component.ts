import { Component } from '@angular/core';


@Component({
  selector: 'nz-demo-modal-customize',
  template: `
    <button nz-button [nzType]="'primary'" (click)="showModal()">
      <span>显示对话框</span>
    </button>
    <nz-modal [nzVisible]="isVisible" [nzTitle]="modalTitle" [nzContent]="modalContent" [nzFooter]="modalFooter" (nzOnCancel)="handleCancel($event)">
      <ng-template #modalTitle>
        对话框标题
      </ng-template>
      <ng-template #modalContent>
        <p>对话框的内容</p>
        <p>对话框的内容</p>
        <p>对话框的内容</p>
        <p>对话框的内容</p>
        <p>对话框的内容</p>
      </ng-template>
      <ng-template #modalFooter>
        <button nz-button [nzType]="'default'" [nzSize]="'large'" (click)="handleCancel($event)">
          返 回
        </button>
        <button nz-button [nzType]="'primary'" [nzSize]="'large'" (click)="handleOk($event)" [nzLoading]="isConfirmLoading">
          提 交
        </button>
      </ng-template>
    </nz-modal>
  `,
  styles: []
})
export class NzDemoModalCustomizeComponent {
  isVisible = false;
  isConfirmLoading = false;

  showModal = () => {
    this.isVisible = true;
  }

  handleOk = (e) => {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  handleCancel = (e) => {
    this.isVisible = false;
  }

  constructor() { }
}
