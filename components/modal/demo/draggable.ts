import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-modal-draggable',
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

  constructor() {}

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
