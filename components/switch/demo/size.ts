import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-switch-size',
  template: `
    <nz-switch [ngModel]="true"></nz-switch>
    <br />
    <br />
    <nz-switch nzSize="small" [ngModel]="true"></nz-switch>
  `
})
export class NzDemoSwitchSizeComponent {}
