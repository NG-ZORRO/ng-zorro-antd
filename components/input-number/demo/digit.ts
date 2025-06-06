import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@Component({
  selector: 'nz-demo-input-number-digit',
  imports: [FormsModule, NzInputNumberModule],
  template: `<nz-input-number [(ngModel)]="value" nzMin="0" nzMax="10" nzStep="0.1" nzPlaceHolder="Digital" />`
})
export class NzDemoInputNumberDigitComponent {
  value = 0.1;
}
