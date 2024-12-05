import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'nz-demo-modal-draggable',
  imports: [NzButtonModule, NzModalModule],
  template: `
    <button nz-button nzType="default" (click)="showModal()">
      <span>Open Draggable Modal</span>
    </button>

    <nz-modal
      nzDraggable
      nzCentered
      [(nzVisible)]="isVisible"
      nzTitle="Draggable Modal"
      (nzOnCancel)="handleCancel()"
      (nzOnOk)="handleOk()"
    >
      <ng-container *nzModalContent>
        <p>Just don't learn physics at school and your life will be full of magic and miracles.</p>
        <p>Day before yesterday I saw a rabbit, and yesterday a deer, and today, you.</p>
      </ng-container>
    </nz-modal>
  `
})
export class NzDemoModalDraggableComponent {
  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
