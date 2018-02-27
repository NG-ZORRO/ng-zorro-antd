import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-modal-locale',
  template: `
    <div>
      <button nz-button nzType="primary" (click)="showModal()">Modal</button>
      <nz-modal
        [(nzVisible)]="isVisible"
        nzTitle="Modal"
        nzOkText="确认"
        nzCancelText="取消"
        (nzOnOk)="handleOk()"
        (nzOnCancel)="handleCancel()"
      >
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
      </nz-modal>
    </div>
    <br/>
    <button nz-button nzType="info" (click)="showConfirm()">Confirm</button>
  `,
  styles: []
})
export class NzDemoModalLocaleComponent {
  isVisible = false;

  constructor(private modalService: NzModalService) { }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  showConfirm(): void {
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Bla bla ...',
      nzOkText: '确认',
      nzCancelText: '取消'
    });
  }
}
