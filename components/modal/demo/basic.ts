import { Component, ViewChild, OnInit } from '@angular/core';
import { NzModalComponent } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-modal-basic',
  template: `
    <button nz-button [nzType]="'primary'" (click)="showModal()"><span>Show Modal</span></button>
    <nz-modal #modal *ngIf="modalValid" [(nzVisible)]="isVisible" nzTitle="The first Modal" (nzOnCancel)="handleCancel()" (nzOnOk)="handleOk()">
      <p>Content one</p>
      <p>Content two</p>
      <p>Content three</p>
    </nz-modal>
  `,
  styles: []
})
export class NzDemoModalBasicComponent implements OnInit {
  isVisible = false;
  modalValid = true;

  @ViewChild('modal') private modal: NzModalComponent;

  constructor() {}

  ngOnInit(): void {
    (window as any).modal = this.modal; // tslint:disable-line
  }

  showModal(): void {
    this.isVisible = true;
    window.setTimeout(() => this.modalValid = false, 2000);
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
