import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-number-digit',
  template: `
    <nz-input-number [(ngModel)]="demoValue" [nzMin]="1" [nzMax]="10" [nzStep]="0.1" [nzPlaceHolder]="'Digital'"></nz-input-number>
  `
})
export class NzDemoInputNumberDigitComponent {
  demoValue: number;
}
