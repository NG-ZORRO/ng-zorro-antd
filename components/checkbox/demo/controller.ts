import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@Component({
  selector: 'nz-demo-checkbox-controller',
  imports: [FormsModule, NzButtonModule, NzCheckboxModule],
  template: `
    <label nz-checkbox [(ngModel)]="isCheckedButton" [nzDisabled]="isDisabledButton">
      {{ isCheckedButton ? 'Checked' : 'Unchecked' }} - {{ isDisabledButton ? 'Disabled' : 'Enabled' }}
    </label>
    <br />
    <br />
    <button nz-button nzType="primary" (click)="checkButton()" nzSize="small">
      {{ !isCheckedButton ? 'Checked' : 'Unchecked' }}
    </button>
    <button nz-button nzType="primary" (click)="disableButton()" nzSize="small">
      {{ isDisabledButton ? 'Enabled' : 'Disabled' }}
    </button>
  `,
  styles: `
    button {
      margin-right: 8px;
    }
  `
})
export class NzDemoCheckboxControllerComponent {
  isCheckedButton = true;
  isDisabledButton = false;

  checkButton(): void {
    this.isCheckedButton = !this.isCheckedButton;
  }

  disableButton(): void {
    this.isDisabledButton = !this.isDisabledButton;
  }
}
