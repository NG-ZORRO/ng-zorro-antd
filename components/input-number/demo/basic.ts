import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@Component({
  selector: 'nz-demo-input-number-basic',
  imports: [FormsModule, NzInputNumberModule],
  template: `<nz-input-number [(ngModel)]="value" nzMin="1" nzMax="10" />`
})
export class NzDemoInputNumberBasicComponent {
  value = 3;
}
