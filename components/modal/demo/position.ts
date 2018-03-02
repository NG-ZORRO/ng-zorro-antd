import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-modal-position',
  template: `
    <button nz-button nzType="primary" (click)="showModalTop()">显示距离顶部 20px 的对话框</button>
    <nz-modal [nzStyle]="{ top: '20px' }" [(nzVisible)]="isVisibleTop" nzTitle="距离顶部 20px 的对话框" (nzOnCancel)="handleCancelTop()" (nzOnOk)="handleOkTop()">
      <p>对话框的内容</p>
      <p>对话框的内容</p>
      <p>对话框的内容</p>
    </nz-modal>

    <br/><br/>

    <button nz-button nzType="primary" (click)="showModalMiddle()">显示垂直居中的对话框</button>
    <nz-modal nzWrapClassName="vertical-center-modal" [(nzVisible)]="isVisibleMiddle" nzTitle="垂直居中的对话框" (nzOnCancel)="handleCancelMiddle()" (nzOnOk)="handleOkMiddle()">
      <p>对话框的内容</p>
      <p>对话框的内容</p>
      <p>对话框的内容</p>
    </nz-modal>
  `,
  styles: [ `
    ::ng-deep .vertical-center-modal {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    ::ng-deep .vertical-center-modal .ant-modal {
      top: 0;
    }
  ` ]
})
export class NzDemoModalPositionComponent {
  isVisibleTop = false;
  isVisibleMiddle = false;

  showModalTop(): void {
    this.isVisibleTop = true;
  }

  showModalMiddle(): void {
    this.isVisibleMiddle = true;
  }

  handleOkTop(): void {
    console.log('点击了确定');
    this.isVisibleTop = false;
  }

  handleCancelTop(): void {
    this.isVisibleTop = false;
  }

  handleOkMiddle(): void {
    console.log('点击了确定');
    this.isVisibleMiddle = false;
  }

  handleCancelMiddle(): void {
    this.isVisibleMiddle = false;
  }
}
