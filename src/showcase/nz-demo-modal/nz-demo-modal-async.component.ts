import { Component } from '@angular/core';


@Component({
  selector: 'nz-demo-modal-async',
  template: `
    <button nz-button [nzType]="'primary'" (click)="showModal()">
      <span>显示对话框</span>
    </button>
    <nz-modal [nzVisible]="isVisible" [nzTitle]="'对话框标题'" [nzContent]="modalContent" (nzOnCancel)="handleCancel($event)" (nzOnOk)="handleOk($event)" [nzConfirmLoading]="isConfirmLoading">
      <ng-template #modalContent>
        <p>对话框的内容</p>
      </ng-template>
    </nz-modal>
  `,
  styles: []
})
export class NzDemoModalAsyncComponent {
  isVisible = false;
  isConfirmLoading = false;

  showModal = () => {
    this.isVisible = true;
  };

  handleOk = (e) => {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  };

  handleCancel = (e) => {
    this.isVisible = false;
  };
}
