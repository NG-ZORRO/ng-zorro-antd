import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-switch-disabled',
  template: `
    <nz-switch [(ngModel)]="switchValue" [nzDisabled]="isDisabled"></nz-switch>
    <br />
    <br />
    <button nz-button [nzType]="'primary'" (click)="isDisabled = !isDisabled">Toggle disabled</button>
  `
})
export class NzDemoSwitchDisabledComponent {
  switchValue = false;
  isDisabled = true;
}
