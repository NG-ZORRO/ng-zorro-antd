import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-number-formatter',
  template: `
    <nz-input-number
      [(ngModel)]="demoValue"
      [nzMin]="1"
      [nzMax]="100"
      [nzStep]="1"
      [nzFormatter]="formatterDollar"
      [nzParser]="parserDollar"
    ></nz-input-number>
    <nz-input-number
      [(ngModel)]="demoValue"
      [nzMin]="1"
      [nzMax]="100"
      [nzStep]="1"
      [nzFormatter]="formatterPercent"
      [nzParser]="parserPercent"
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
export class NzDemoInputNumberFormatterComponent {
  demoValue = 100;
  formatterPercent = (value: number): string => `${value} %`;
  parserPercent = (value: string): string => value.replace(' %', '');
  formatterDollar = (value: number): string => `$ ${value}`;
  parserDollar = (value: string): string => value.replace('$ ', '');
}
