import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@Component({
  selector: 'nz-demo-input-number-status',
  imports: [FormsModule, NzInputNumberModule, NzIconModule],
  template: `
    <nz-input-number nzStatus="error" [style.width.%]="100"></nz-input-number>
    <nz-input-number nzStatus="warning" [style.width.%]="100"></nz-input-number>
    <nz-input-number nzStatus="error" [style.width.%]="100">
      <nz-icon nzInputPrefix nzType="clock-circle" />
    </nz-input-number>
    <nz-input-number nzStatus="warning" [style.width.%]="100">
      <nz-icon nzInputPrefix nzType="clock-circle" />
    </nz-input-number>
  `,
  styles: [
    `
      nz-input-number {
        margin-bottom: 8px;
      }
    `
  ]
})
export class NzDemoInputNumberStatusComponent {}
