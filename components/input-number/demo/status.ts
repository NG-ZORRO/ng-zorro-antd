import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-number-status',
  template: `
    <nz-input-number [nzStep]="1" nzStatus="error"></nz-input-number>
    <nz-input-number [nzStep]="1" nzStatus="warning"></nz-input-number>
  `,
  styles: [
    `
      nz-input-number {
        width: 100%;
        margin-bottom: 8px;
      }
    `
  ]
})
export class NzDemoInputNumberStatusComponent {}
