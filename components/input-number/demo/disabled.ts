import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@Component({
  selector: 'nz-demo-input-number-disabled',
  imports: [FormsModule, NzButtonModule, NzInputNumberModule],
  template: `
    <nz-input-number [(ngModel)]="value" nzMin="1" nzMax="10" [nzDisabled]="isDisabled" />
    <br />
    <br />
    <button nz-button nzType="primary" (click)="isDisabled = !isDisabled">Toggle Disabled</button>
  `
})
export class NzDemoInputNumberDisabledComponent {
  value = 3;
  isDisabled = false;
}
