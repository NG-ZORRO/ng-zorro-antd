import { Component, signal } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'nz-demo-modal-position',
  imports: [NzButtonModule, NzModalModule],
  template: `
    <button nz-button nzType="primary" (click)="showModalTop()">Display a modal dialog at 20px to Top</button>
    <nz-modal
      [nzStyle]="{ top: '20px' }"
      [(nzVisible)]="isVisibleTop"
      nzTitle="20px to Top"
      (nzOnCancel)="handleCancelTop()"
      (nzOnOk)="handleOkTop()"
    >
      <ng-container *nzModalContent>
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </ng-container>
    </nz-modal>

    <br />
    <br />

    <button nz-button nzType="primary" (click)="showModalMiddle()">Vertically centered modal dialog</button>
    <nz-modal
      [(nzVisible)]="isVisibleMiddle"
      nzTitle="Vertically centered modal dialog"
      nzCentered
      (nzOnCancel)="handleCancelMiddle()"
      (nzOnOk)="handleOkMiddle()"
    >
      <ng-container *nzModalContent>
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </ng-container>
    </nz-modal>
  `
})
export class NzDemoModalPositionComponent {
  readonly isVisibleTop = signal(false);
  readonly isVisibleMiddle = signal(false);

  showModalTop(): void {
    this.isVisibleTop.set(true);
  }

  showModalMiddle(): void {
    this.isVisibleMiddle.set(true);
  }

  handleOkTop(): void {
    console.log('点击了确定');
    this.isVisibleTop.set(false);
  }

  handleCancelTop(): void {
    this.isVisibleTop.set(false);
  }

  handleOkMiddle(): void {
    console.log('click ok');
    this.isVisibleMiddle.set(false);
  }

  handleCancelMiddle(): void {
    this.isVisibleMiddle.set(false);
  }
}
