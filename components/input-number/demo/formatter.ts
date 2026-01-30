import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@Component({
  selector: 'nz-demo-input-number-formatter',
  imports: [FormsModule, NzInputNumberModule],
  template: `
    <nz-input-number [(ngModel)]="dollarValue" [nzFormatter]="formatterDollar" [nzParser]="parserDollar" />
    <nz-input-number
      [(ngModel)]="percentValue"
      nzMin="1"
      nzMax="100"
      [nzFormatter]="formatterPercent"
      [nzParser]="parserPercent"
    />
  `,
  styles: `
    nz-input-number {
      margin-right: 8px;
    }
  `
})
export class NzDemoInputNumberFormatterComponent {
  dollarValue = 1000;
  percentValue = 100;
  formatterDollar = (value: number): string => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  parserDollar = (value: string): number => +value?.replace(/\$\s?|(,*)/g, '');
  formatterPercent = (value: number): string => `${value}%`;
  parserPercent = (value: string): number => +value?.replace('%', '');
}
