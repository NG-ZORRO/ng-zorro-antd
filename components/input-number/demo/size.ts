import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@Component({
  selector: 'nz-demo-input-number-size',
  standalone: true,
  imports: [FormsModule, NzInputNumberModule],
  template: `
    <nz-input-number [(ngModel)]="value" [nzSize]="'large'" [nzMin]="1" [nzMax]="10" [nzStep]="1"></nz-input-number>
    <nz-input-number [(ngModel)]="value" [nzMin]="1" [nzMax]="10" [nzStep]="1"></nz-input-number>
    <nz-input-number [(ngModel)]="value" [nzSize]="'small'" [nzMin]="1" [nzMax]="10" [nzStep]="1"></nz-input-number>
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
  value = 3;
}
