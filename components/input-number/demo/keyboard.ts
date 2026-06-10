import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@Component({
  selector: 'nz-demo-input-number-keyboard',
  imports: [FormsModule, NzInputNumberModule, NzCheckboxModule],
  template: `
    <nz-input-number [(ngModel)]="value" [nzKeyboard]="keyboard()" nzMin="1" nzMax="10" />
    <label nz-checkbox [(ngModel)]="keyboard">Toggle Keyboard</label>
  `,
  styles: `
    nz-input-number {
      margin-right: 8px;
    }
  `
})
export class NzDemoInputNumberKeyboardComponent {
  readonly keyboard = signal(true);
  readonly value = signal(3);
}
