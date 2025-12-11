import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputDirective, NzInputModule } from 'ng-zorro-antd/input';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'nz-demo-input-focus',
  imports: [FormsModule, NzInputModule, NzButtonModule, NzSwitchModule],
  template: `
    <button nz-button (click)="input.focus({ cursor: 'start' })">Focus at first</button>
    <button nz-button (click)="input.focus({ cursor: 'end' })">Focus at last</button>
    <button nz-button (click)="input.focus({ cursor: 'all' })">Focus to select all</button>
    <button nz-button (click)="input.focus({ preventScroll: true })"> Focus prevent scroll </button>

    <br />
    <nz-switch [(ngModel)]="inputElem" nzCheckedChildren="input" nzUnCheckedChildren="textarea" />
    <br />
    <br />

    @if (inputElem) {
      <input #input="nzInput" nz-input [(ngModel)]="value" />
    } @else {
      <textarea #input="nzInput" nz-input rows="2" [(ngModel)]="value"> </textarea>
    }
  `
})
export class NzDemoInputFocusComponent {
  value = 'NG-ZORRO love you!';
  inputElem = true;

  @ViewChild(NzInputDirective) input!: NzInputDirective;
}
