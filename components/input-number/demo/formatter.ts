import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@Component({
  selector: 'nz-demo-input-number-formatter',
  imports: [FormsModule, NzInputNumberModule],
  template: `
    <nz-input-number
      [(ngModel)]="demoValue"
      nzMin="1"
      nzMax="100"
      [nzFormatter]="formatterDollar"
      [nzParser]="parserDollar"
    />
    <nz-input-number
      [(ngModel)]="demoValue"
      nzMin="1"
      nzMax="100"
      [nzFormatter]="formatterPercent"
      [nzParser]="parserPercent"
    />
  `,
  styles: [
    `
      nz-input-number {
        margin-right: 8px;
      }
    `
  ]
})
export class NzDemoInputNumberFormatterComponent {
  demoValue = 100;
  formatterPercent = (value: number): string => `${value} %`;
  parserPercent = (value: string): number => +value.replace(' %', '');
  formatterDollar = (value: number): string => `$ ${value}`;
  parserDollar = (value: string): number => +value.replace('$ ', '');
}
