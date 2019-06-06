import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-number-size',
  template: `
    <nz-input-number [(ngModel)]="demoValue" [nzSize]="'large'" [nzMin]="1" [nzMax]="10" [nzStep]="1"></nz-input-number>
    <nz-input-number [(ngModel)]="demoValue" [nzMin]="1" [nzMax]="10" [nzStep]="1"></nz-input-number>
    <nz-input-number [(ngModel)]="demoValue" [nzSize]="'small'" [nzMin]="1" [nzMax]="10" [nzStep]="1"></nz-input-number>
  `,
  styles: [
    `
      nz-input-number {
        margin-right: 8px;
      }
    `
  ]
})
export class NzDemoInputNumberSizeComponent {
  demoValue = 3;
}
