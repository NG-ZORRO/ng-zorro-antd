import { Component } from '@angular/core';


@Component({
  selector: 'nz-demo-modal-basic',
  template: `
    <button nz-button [nzType]="'primary'" (click)="showModal()">
      <span>显示对话框</span>
    </button>
    <nz-modal [nzVisible]="isVisible" [nzTitle]="'第一个 Modal'" [nzContent]="modalContent" (nzOnCancel)="handleCancel($event)" (nzOnOk)="handleOk($event)">
      <ng-template #modalContent>
        <p>对话框的内容</p>
        <p>对话框的内容</p>
        <p>对话框的内容</p>
      </ng-template>
    </nz-modal>
  `,
  styles: []
})
export class NzDemoModalBasicComponent {
  isVisible = false;

  showModal = () => {
    this.isVisible = true;
  }

  handleOk = (e) => {
    console.log('点击了确定');
    this.isVisible = false;
  }

  handleCancel = (e) => {
    console.log(e);
    this.isVisible = false;
  }

  constructor() {}
}
