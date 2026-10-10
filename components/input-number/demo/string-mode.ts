import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@Component({
  selector: 'nz-demo-input-number-string-mode',
  imports: [FormsModule, NzInputNumberModule],
  template: `<nz-input-number [(ngModel)]="value" nzStringMode nzMin="0" nzMax="10" nzStep="0.00000000000001" />`
})
export class NzDemoInputNumberStringModeComponent {
  readonly value = signal('1');
}
