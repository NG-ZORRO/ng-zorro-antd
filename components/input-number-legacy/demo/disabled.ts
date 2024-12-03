import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberLegacyModule } from 'ng-zorro-antd/input-number-legacy';

@Component({
  selector: 'nz-demo-input-number-legacy-disabled',
  standalone: true,
  imports: [FormsModule, NzButtonModule, NzInputNumberLegacyModule],
  template: `
    <nz-input-number-legacy
      [(ngModel)]="value"
      [nzMin]="1"
      [nzMax]="10"
      [nzStep]="1"
      [nzDisabled]="isDisabled"
    ></nz-input-number-legacy>
    <br />
    <br />
    <button nz-button [nzType]="'primary'" (click)="toggleDisabled()">
      <span>Toggle Disabled</span>
    </button>
  `
})
export class NzDemoInputNumberLegacyDisabledComponent {
  value = 3;
  isDisabled = false;

  toggleDisabled(): void {
    this.isDisabled = !this.isDisabled;
  }
}
