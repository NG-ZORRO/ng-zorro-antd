import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputNumberLegacyModule } from 'ng-zorro-antd/input-number-legacy';

@Component({
  selector: 'nz-demo-input-number-legacy-precision',
  imports: [FormsModule, NzInputNumberLegacyModule],
  template: `
    <nz-input-number [(ngModel)]="toFixedValue" [nzPrecision]="precision" nzPlaceHolder="toFixed"></nz-input-number>
    <nz-input-number
      [(ngModel)]="cutValue"
      [nzPrecision]="precision"
      nzPrecisionMode="cut"
      nzPlaceHolder="cut off"
    ></nz-input-number>
    <nz-input-number
      [(ngModel)]="customFnValue"
      [nzPrecision]="precision"
      [nzPrecisionMode]="customPrecisionFn"
      nzPlaceHolder="cut off"
    ></nz-input-number>
  `,
  styles: [
    `
      nz-input-number {
        margin-right: 8px;
      }
    `
  ]
})
export class NzDemoInputNumberLegacyPrecisionComponent {
  toFixedValue = 2;
  cutValue = 2;
  customFnValue = 2;
  precision = 2;
  customPrecisionFn(value: string | number, precision?: number): number {
    return +Number(value).toFixed(precision! + 1);
  }
}
