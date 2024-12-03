import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputNumberLegacyModule } from 'ng-zorro-antd/input-number-legacy';

@Component({
  selector: 'nz-demo-input-number-legacy-borderless',
  standalone: true,
  imports: [FormsModule, NzInputNumberLegacyModule],
  template: `<nz-input-number-legacy nzBorderless [(ngModel)]="value"></nz-input-number-legacy>`
})
export class NzDemoInputNumberLegacyBorderlessComponent {
  value = 3;
}
