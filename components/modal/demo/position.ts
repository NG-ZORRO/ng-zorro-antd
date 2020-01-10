import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-modal-position',
  template: `
    <button nz-button nzType="primary" (click)="showModalTop()">Display a modal dialog at 20px to Top</button>
    <nz-modal
      [nzStyle]="{ top: '20px' }"
      [(nzVisible)]="isVisibleTop"
      nzTitle="20px to Top"
      (nzOnCancel)="handleCancelTop()"
      (nzOnOk)="handleOkTop()"
    >
      <p>some contents...</p>
      <p>some contents...</p>
      <p>some contents...</p>
    </nz-modal>

    <br /><br />

    <button nz-button nzType="primary" (click)="showModalMiddle()">Vertically centered modal dialog</button>
    <nz-modal
      nzWrapClassName="vertical-center-modal"
      [(nzVisible)]="isVisibleMiddle"
      nzTitle="Vertically centered modal dialog"
      (nzOnCancel)="handleCancelMiddle()"
      (nzOnOk)="handleOkMiddle()"
    >
      <p>some contents...</p>
      <p>some contents...</p>
      <p>some contents...</p>
    </nz-modal>
  `,
  styles: [
    `
      ::ng-deep .vertical-center-modal {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      ::ng-deep .vertical-center-modal .ant-modal {
        top: 0;
      }
    `
  ]
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
    console.log('click ok');
    this.isVisibleMiddle = false;
  }

  handleCancelMiddle(): void {
    this.isVisibleMiddle = false;
  }
}
