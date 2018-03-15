import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-modal-basic',
  template: `
    <button nz-button [nzType]="'primary'" (click)="showModal()"><span>Show Modal</span></button>
    <nz-modal [(nzVisible)]="isVisible" nzTitle="The first Modal" (nzOnCancel)="handleCancel($event)" (nzOnOk)="handleOk($event)">
      <p>Content one</p>
      <p>Content two</p>
      <p>Content three</p>
      <nz-select style="width: 120px;" [(ngModel)]="selectedValue" nzAllowClear nzPlaceHolder="Choose">
        <nz-option nzValue="jack" nzLabel="Jack"></nz-option>
        <nz-option nzValue="lucy" nzLabel="Lucy"></nz-option>
        <nz-option nzValue="disabled" nzLabel="Disabled" nzDisabled></nz-option>
      </nz-select>
    </nz-modal>
  `,
  styles: []
})
export class NzDemoModalBasicComponent {
  isVisible = false;
  selectedValue = 'lucy';

  constructor() {}

  showModal(): void {
    this.isVisible = true;
  }

  handleOk($event: MouseEvent): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel($event: MouseEvent): void {
    console.log('Button cancel clicked!', $event);
    this.isVisible = false;
  }
}
