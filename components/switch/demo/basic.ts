import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-switch-basic',
  template: `
    <nz-switch [(ngModel)]="switchValue"></nz-switch>
  `
})
export class NzDemoSwitchBasicComponent {
  switchValue = false;
}
