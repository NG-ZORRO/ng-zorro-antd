import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@Component({
  selector: 'nz-demo-input-number-borderless',
  standalone: true,
  imports: [FormsModule, NzInputNumberModule],
  template: `<nz-input-number nzBorderless [(ngModel)]="value"></nz-input-number>`
})
export class NzDemoInputNumberBorderlessComponent {
  value = 3;
}
