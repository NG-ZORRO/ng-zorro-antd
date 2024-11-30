import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputNumberLegacyModule } from 'ng-zorro-antd/input-number-legacy';

@Component({
  selector: 'nz-demo-input-number-legacy-size',
  standalone: true,
  imports: [FormsModule, NzInputNumberLegacyModule],
  template: `
    <nz-input-number-legacy
      [(ngModel)]="value"
      [nzSize]="'large'"
      [nzMin]="1"
      [nzMax]="10"
      [nzStep]="1"
    ></nz-input-number-legacy>
    <nz-input-number-legacy [(ngModel)]="value" [nzMin]="1" [nzMax]="10" [nzStep]="1"></nz-input-number-legacy>
    <nz-input-number-legacy
      [(ngModel)]="value"
      [nzSize]="'small'"
      [nzMin]="1"
      [nzMax]="10"
      [nzStep]="1"
    ></nz-input-number-legacy>
  `,
  styles: [
    `
      nz-input-number-legacy {
        margin-right: 8px;
      }
    `
  ]
})
export class NzDemoInputNumberLegacySizeComponent {
  value = 3;
}
