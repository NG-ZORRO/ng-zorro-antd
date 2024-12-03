import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputNumberLegacyModule } from 'ng-zorro-antd/input-number-legacy';

@Component({
  selector: 'nz-demo-input-number-legacy-digit',
  standalone: true,
  imports: [FormsModule, NzInputNumberLegacyModule],
  template: `
    <nz-input-number-legacy
      [(ngModel)]="value"
      [nzMin]="1"
      [nzMax]="10"
      [nzStep]="0.1"
      [nzPlaceHolder]="'Digital'"
    ></nz-input-number-legacy>
  `
})
export class NzDemoInputNumberLegacyDigitComponent {
  value = 0;
}
