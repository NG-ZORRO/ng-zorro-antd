import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@Component({
  selector: 'nz-demo-input-number-focus',
  imports: [FormsModule, NzInputNumberModule, NzButtonModule],
  template: `
    <button nz-button (click)="inputNumber.focus({ cursor: 'start' })">Focus at first</button>
    <button nz-button (click)="inputNumber.focus({ cursor: 'end' })">Focus at last</button>
    <button nz-button (click)="inputNumber.focus({ cursor: 'all' })">Focus to select all</button>
    <button nz-button (click)="inputNumber.focus({ preventScroll: true })"> Focus prevent scroll </button>

    <br />
    <br />

    <nz-input-number #inputNumber [(ngModel)]="value" [style.width.%]="100" />
  `
})
export class NzDemoInputNumberFocusComponent {
  value = 9999;
}
