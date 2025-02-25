import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@Component({
  selector: 'nz-demo-input-number-borderless',
  imports: [FormsModule, NzInputNumberModule],
  template: `<nz-input-number nzBordered="false" [(ngModel)]="value"></nz-input-number>`
})
export class NzDemoInputNumberBorderlessComponent {
  value = 3;
}
