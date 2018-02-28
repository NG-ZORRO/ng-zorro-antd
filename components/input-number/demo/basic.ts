import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-number-basic',
  template: `
    <nz-input-number [(ngModel)]="demoValue" [nzMin]="1" [nzMax]="10" [nzStep]="1"></nz-input-number>
  `
})
export class NzDemoInputNumberBasicComponent {
  demoValue = 3;
}
