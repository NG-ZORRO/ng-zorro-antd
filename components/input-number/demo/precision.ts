import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-number-size',
  template: `
    <nz-input-number [(ngModel)]="demoValue" [nzPrecision]="precision" nzPlaceHolder="round"></nz-input-number>
    <nz-input-number
      [(ngModel)]="demoValue"
      [nzPrecision]="precision"
      nzPrecisionMode="floor"
      nzPlaceHolder="floor"
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
export class NzDemoInputNumberPrecisionComponent {
  demoValue = 3;
  precision = 2;
}
