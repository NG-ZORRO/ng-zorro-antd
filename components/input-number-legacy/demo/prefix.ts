import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputNumberLegacyModule } from 'ng-zorro-antd/input-number-legacy';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'nz-demo-input-number-legacy-prefix',
  standalone: true,
  imports: [FormsModule, NzInputNumberLegacyModule, NzSpaceModule],
  template: `
    <nz-space nzDirection="vertical" style="width: 100%">
      <nz-input-number-group *nzSpaceItem nzPrefix="￥" style="width: 100%">
        <nz-input-number-legacy [nzStep]="1"></nz-input-number-legacy>
      </nz-input-number-group>
      <nz-input-number-group *nzSpaceItem nzAddOnBeforeIcon="user" nzPrefix="￥" style="width: 100%">
        <nz-input-number-legacy [nzStep]="1"></nz-input-number-legacy>
      </nz-input-number-group>
      <nz-input-number-group *nzSpaceItem nzPrefix="￥" style="width: 100%">
        <nz-input-number-legacy nzDisabled [nzStep]="1"></nz-input-number-legacy>
      </nz-input-number-group>
    </nz-space>
  `
})
export class NzDemoInputNumberLegacyPrefixComponent {}
