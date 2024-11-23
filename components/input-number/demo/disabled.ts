import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@Component({
  selector: 'nz-demo-input-number-disabled',
  standalone: true,
  imports: [FormsModule, NzButtonModule, NzInputNumberModule],
  template: `
    <nz-input-number
      [(ngModel)]="value"
      [nzMin]="1"
      [nzMax]="10"
      [nzStep]="1"
      [nzDisabled]="isDisabled"
    ></nz-input-number>
    <br />
    <br />
    <button nz-button [nzType]="'primary'" (click)="toggleDisabled()">
      <span>Toggle Disabled</span>
    </button>
  `
})
export class NzDemoInputNumberDisabledComponent {
  value = 3;
  isDisabled = false;

  toggleDisabled(): void {
    this.isDisabled = !this.isDisabled;
  }
}
