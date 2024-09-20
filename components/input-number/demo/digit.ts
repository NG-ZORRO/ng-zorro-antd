import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@Component({
  selector: 'nz-demo-input-number-digit',
  standalone: true,
  imports: [FormsModule, NzInputNumberModule],
  template: `
    <nz-input-number
      [(ngModel)]="value"
      [nzMin]="1"
      [nzMax]="10"
      [nzStep]="0.1"
      [nzPlaceHolder]="'Digital'"
    ></nz-input-number>
  `
})
export class NzDemoInputNumberDigitComponent {
  value = 0;
}
