import { Component } from '@angular/core';


@Component({
  selector: 'nz-demo-modal-style',
  template: `
    <button nz-button [nzType]="'primary'" (click)="showModalTop()">
      <span>显示距离顶部 20px 的对话框</span>
    </button>
    <button nz-button [nzType]="'primary'" (click)="showModalMiddle()">
      <span>显示垂直居中的对话框</span>
    </button>
    <nz-modal [nzStyle]="style" [nzVisible]="isVisibleTop" [nzContent]="modalContent1" [nzTitle]="'距离顶部 20px 的对话框'" (nzOnCancel)="handleCancelTop($event)" (nzOnOk)="handleOkTop($event)">
      <ng-template #modalContent1>
        <p>对话框的内容</p>
        <p>对话框的内容</p>
        <p>对话框的内容</p>
      </ng-template>
    </nz-modal>
    <nz-modal [nzWrapClassName]="'vertical-center-modal'" [nzContent]="modalContent2" [nzVisible]="isVisibleMiddle" [nzTitle]="'垂直居中的对话框'" (nzOnCancel)="handleCancelMiddle($event)" (nzOnOk)="handleOkMiddle($event)">
      <ng-template #modalContent2>
        <p>对话框的内容</p>
        <p>对话框的内容</p>
        <p>对话框的内容</p>
      </ng-template>
    </nz-modal>
  `,
  styles  : [ `
    :host ::ng-deep .vertical-center-modal {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    :host ::ng-deep .vertical-center-modal .ant-modal {
      top: 0;
    }
  ` ]
})
export class NzDemoModalStyleComponent {
  isVisibleTop = false;
  isVisibleMiddle = false;
  style: any = {
    top: '20px'
  };

  showModalTop = () => {
    this.isVisibleTop = true;
  };

  showModalMiddle = () => {
    this.isVisibleMiddle = true;
  };

  handleOkTop = (e) => {
    console.log('点击了确定');
    this.isVisibleTop = false;
  };

  handleCancelTop = (e) => {
    console.log(e);
    this.isVisibleTop = false;
  };

  handleOkMiddle = (e) => {
    console.log('点击了确定');
    this.isVisibleMiddle = false;
  };

  handleCancelMiddle = (e) => {
    console.log(e);
    this.isVisibleMiddle = false;
  };
}
