import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputNumberLegacyModule } from 'ng-zorro-antd/input-number-legacy';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'nz-demo-input-number-legacy-status',
  imports: [FormsModule, NzInputNumberLegacyModule, NzSpaceModule],
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
export class NzDemoInputNumberLegacyStatusComponent {}
