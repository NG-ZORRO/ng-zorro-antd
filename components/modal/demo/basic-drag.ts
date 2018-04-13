import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-modal-basic-drag',
  template: `
    <button nz-button  [nzType]="'primary'" (click)="showModal()"><span>Show Drag Modal</span></button>
    <nz-modal [(nzVisible)]="isVisible" nzDraggable="true" nzMaskClosable="false"  nzTitle="Drag Test Modal" (nzOnCancel)="handleCancel()" (nzOnOk)="handleOk()">
      <p>1.Click header to drag</p>
      <p>2.Click mouse button to move</p>
      <p>3.Mouse up to stop drag.  </p>
    </nz-modal>
  `,
  styles: []
})
export class NzDemoModalBasicDragComponent {
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
