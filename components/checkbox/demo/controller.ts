import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-checkbox-controller',
  template: `
    <p style="margin-bottom: 20px;">
      <label nz-checkbox [(ngModel)]="isCheckedButton" [nzDisabled]="isDisabledButton">
        {{ isCheckedButton ? 'Checked' : 'Unchecked' }} - {{ isDisabledButton ? 'Disabled' : 'Enabled' }}
      </label>
    </p>
    <p>
      <button nz-button [nzType]="'primary'" (click)="checkButton()" [nzSize]="'small'">
        {{ !isCheckedButton ? 'Checked' : 'Unchecked' }}
      </button>
      <button nz-button [nzType]="'primary'" (click)="disableButton()" [nzSize]="'small'">
        {{ isDisabledButton ? 'Enabled' : 'Disabled' }}
      </button>
    </p>
  `,
  styles: [
    `
      button {
        margin-right: 8px;
      }
    `
  ]
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
