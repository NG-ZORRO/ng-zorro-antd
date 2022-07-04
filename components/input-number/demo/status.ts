import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-number-status',
  template: `
    <nz-space nzDirection="vertical" style="width: 100%">
      <nz-input-number *nzSpaceItem [nzStep]="1" nzStatus="error" style="width: 100%"></nz-input-number>
      <nz-input-number *nzSpaceItem [nzStep]="1" nzStatus="warning" style="width: 100%"></nz-input-number>
      <nz-input-number-group *nzSpaceItem nzPrefixIcon="clock-circle" nzStatus="error" style="width: 100%">
        <nz-input-number [nzStep]="1"></nz-input-number>
      </nz-input-number-group>
      <nz-input-number-group *nzSpaceItem nzPrefixIcon="clock-circle" nzStatus="warning" style="width: 100%">
        <nz-input-number [nzStep]="1"></nz-input-number>
      </nz-input-number-group>
    </nz-space>
  `
})
export class NzDemoInputNumberStatusComponent {}
