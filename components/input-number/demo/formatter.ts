import { Component, signal } from '@angular/core';
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
  readonly dollarValue = signal(1000);
  readonly percentValue = signal(100);
  readonly formatterDollar = (value: number): string => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  readonly parserDollar = (value: string): number => +value?.replace(/\$\s?|(,*)/g, '');
  readonly formatterPercent = (value: number): string => `${value}%`;
  readonly parserPercent = (value: string): number => +value?.replace('%', '');
}
