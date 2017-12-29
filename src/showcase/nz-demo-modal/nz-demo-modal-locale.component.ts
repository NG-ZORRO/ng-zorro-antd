import { Component } from '@angular/core';
import { NzModalService } from '../../../index.showcase';


@Component({
  selector: 'nz-demo-modal-locale',
  template: `
    <button nz-button [nzType]="'primary'" (click)="showModal()">
      <span>Show Modal</span>
    </button>
    <nz-modal [nzVisible]="isVisible" [nzTitle]="'Modal'" [nzContent]="modalContent" (nzOnCancel)="handleCancel($event)" (nzOnOk)="handleOk($event)">
      <ng-template #modalContent>
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
      </ng-template>
    </nz-modal>
    <br />
    <button nz-button [nzType]="'info'" (click)="showConfirm()">
      <span>confirm</span>
    </button>
  `,
  styles: []
})
export class NzDemoModalLocaleComponent {
  isVisible = false;

  showModal = () => {
    this.isVisible = true;
  }

  handleOk = (e) => {
    this.isVisible = false;
  }

  handleCancel = (e) => {
    console.log(e);
    this.isVisible = false;
  }

  showConfirm = () => {
    this.confirmServ.confirm({
      title: 'Confirm',
      content: 'Bla bla ...',
      okText: 'OK',
      cancelText: 'Cancel'
    });
  }

  constructor(private confirmServ: NzModalService) {}
}
