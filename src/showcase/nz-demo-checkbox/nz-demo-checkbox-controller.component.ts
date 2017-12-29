import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-checkbox-controller',
  template: `
    <p style="margin-bottom: 20px;">
      <label nz-checkbox [(ngModel)]="isCheckedButton" [nzDisabled]="isDisabledButton">
        <span>{{isCheckedButton ? 'Checked' : 'Unchecked'}} - {{isDisabledButton ? 'Disabled' : 'Enabled'}}</span>
      </label>
    </p>
    <p>
      <button nz-button [nzType]="'primary'" (click)="checkButton()" [nzSize]="'small'">
        <span>{{!isCheckedButton ? 'Checked' : 'Unchecked'}}</span>
      </button>
      <button nz-button [nzType]="'primary'" (click)="disableButton()" [nzSize]="'small'">
        <span>{{isDisabledButton ? 'Enabled' : 'Disabled'}}</span>
      </button>
    </p>
  `,
  styles  : []
})
export class NzDemoCheckboxControllerComponent {
  isCheckedButton = true;
  isDisabledButton = false;
  checkButton = () => {
    this.isCheckedButton = !this.isCheckedButton;
  };
  disableButton = () => {
    this.isDisabledButton = !this.isDisabledButton;
  };
}
