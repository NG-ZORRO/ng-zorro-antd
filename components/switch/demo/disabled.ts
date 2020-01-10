import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-switch-disabled',
  template: `
    <nz-switch [(ngModel)]="switchValue" [nzDisabled]="isDisabled"></nz-switch>
    <br />
    <button nz-button [nzType]="'primary'" (click)="isDisabled = !isDisabled">Toggle disabled</button>
  `,
  styles: [
    `
      nz-switch {
        margin-bottom: 8px;
      }
    `
  ]
})
export class NzDemoSwitchDisabledComponent {
  switchValue = false;
  isDisabled = true;
}
