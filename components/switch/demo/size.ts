import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-switch-size',
  template: `
    <nz-switch [ngModel]="true"></nz-switch>
    <br />
    <nz-switch nzSize="small" [ngModel]="true"></nz-switch>
  `,
  styles: [
    `
      nz-switch {
        margin-bottom: 8px;
      }
    `
  ]
})
export class NzDemoSwitchSizeComponent {}
