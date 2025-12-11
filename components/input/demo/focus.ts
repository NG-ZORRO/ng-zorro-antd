import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-input-focus',
  imports: [FormsModule, NzInputModule, NzButtonModule],
  template: `
    <button nz-button (click)="input.focus({ cursor: 'start' })">Focus at first</button>
    <button nz-button (click)="input.focus({ cursor: 'end' })">Focus at last</button>
    <button nz-button (click)="input.focus({ cursor: 'all' })">Focus to select all</button>
    <button nz-button (click)="input.focus({ preventScroll: true })"> Focus prevent scroll </button>

    <br />
    <br />

    <!-- <input #input="nzInput" nz-input [(ngModel)]="value" [style.width.%]="100" /> -->
    <!-- or -->
    <textarea #input="nzInput" nz-input rows="4" [(ngModel)]="value" [style.width.%]="100"> </textarea>
  `
})
export class NzDemoInputFocusComponent {
  value = 'NG-ZORRO love you!';

  inputElem = true;
}
