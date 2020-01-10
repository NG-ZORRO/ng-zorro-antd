import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-switch-loading',
  template: `
    <nz-switch [ngModel]="true" nzLoading></nz-switch>
    <br />
    <nz-switch nzSize="small" [ngModel]="false" nzLoading></nz-switch>
  `,
  styles: [
    `
      nz-switch {
        margin-bottom: 8px;
      }
    `
  ]
})
export class NzDemoSwitchLoadingComponent {}
