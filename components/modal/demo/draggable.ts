/* declarations: NzModalDraggableComponent */

import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-modal-draggable',
  template: `
    <button nz-button [nzType]="'primary'" (click)="showModal()">Show Modal</button>
    &nbsp;
    <button nz-button nzType="primary" (click)="createComponentModal()">Use Component</button>
    <br />
    <br />
    <button nz-button nzType="primary" (click)="createConfirm()">Confirm</button>
    &nbsp;
    <button nz-button nzType="primary" (click)="createMultiComponentModal()">Multi Modal</button>
    <nz-modal
      [(nzVisible)]="isVisible"
      nzDraggable
      nzWrapClassName="draggable-modal"
      nzTitle="Draggable Modal"
      (nzOnCancel)="handleCancel()"
      (nzOnOk)="handleOk()"
    >
      <p>Content one</p>
      <p>Content two</p>
      <p>Content three</p>
    </nz-modal>
  `,
  styles: [
    `
      ::ng-deep .multi-modal {
        pointer-events: none;
      }

      ::ng-deep .draggable-modal .ant-modal-header {
        cursor: move;
      }
    `
  ]
})
export class NzDemoModalDraggableComponent {
  isVisible = false;

  constructor(private modal: NzModalService) {}

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  createComponentModal(): void {
    const modalRef = this.modal.create({
      nzTitle: 'Draggable Modal',
      nzWrapClassName: 'draggable-modal',
      nzDraggable: true,
      nzContent: NzModalDraggableComponent
    });

    modalRef.afterOpen.subscribe(() => {
      const dragRef = modalRef.getDragRef();
      if (dragRef) {
        dragRef.withBoundaryElement(modalRef.getBackdropElement());
        dragRef.moved.subscribe(console.log);
      }
    });
  }

  createConfirm(): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this task?',
      nzContent: 'Some descriptions',
      nzDraggable: true
    });
  }

  createMultiComponentModal(): void {
    const modalRef1 = this.modal.create({
      nzTitle: 'Draggable Modal1',
      nzDraggable: true,
      nzMask: false,
      nzMaskClosable: false,
      nzContent: NzModalDraggableComponent,
      nzWrapClassName: 'multi-modal draggable-modal',
      nzMaskStyle: { pointerEvents: 'none' }
    });

    const modalRef2 = this.modal.create({
      nzTitle: 'Draggable Modal2',
      nzDraggable: true,
      nzMask: false,
      nzMaskClosable: false,
      nzContent: NzModalDraggableComponent,
      nzStyle: { top: `70px`, left: `100px` },
      nzWrapClassName: 'multi-modal draggable-modal',
      nzMaskStyle: { pointerEvents: 'none' }
    });

    modalRef1.afterOpen.subscribe(() => {
      const dragRef = modalRef1.getDragRef();
      if (dragRef) {
        dragRef.moved.subscribe(() => {
          modalRef1.updateConfig({ nzZIndex: 1001 });
          modalRef2.updateConfig({ nzZIndex: 1000 });
        });
      }
    });

    modalRef2.afterOpen.subscribe(() => {
      const dragRef = modalRef2.getDragRef();
      if (dragRef) {
        dragRef.moved.subscribe(() => {
          modalRef2.updateConfig({ nzZIndex: 1001 });
          modalRef1.updateConfig({ nzZIndex: 1000 });
        });
      }
    });
  }
}

@Component({
  selector: 'nz-modal-draggable-component',
  template: `
    <p>Content one</p>
    <p>Content two</p>
    <p>Content three</p>
  `
})
export class NzModalDraggableComponent {
  constructor() {}
}
