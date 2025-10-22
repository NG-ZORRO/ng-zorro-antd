import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputNumberLegacyModule } from 'ng-zorro-antd/input-number-legacy';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'nz-demo-input-number-legacy-prefix',
  imports: [FormsModule, NzInputNumberLegacyModule, NzSpaceModule],
  template: `
    <nz-space nzDirection="vertical" style="width: 100%">
      <nz-input-number-group *nzSpaceItem nzPrefix="￥" style="width: 100%">
        <nz-input-number [nzStep]="1"></nz-input-number>
      </nz-input-number-group>
      <nz-input-number-group *nzSpaceItem nzAddOnBeforeIcon="user" nzPrefix="￥" style="width: 100%">
        <nz-input-number [nzStep]="1"></nz-input-number>
      </nz-input-number-group>
      <nz-input-number-group *nzSpaceItem nzPrefix="￥" style="width: 100%">
        <nz-input-number nzDisabled [nzStep]="1"></nz-input-number>
      </nz-input-number-group>
    </nz-space>
  `
})
export class NzDemoInputNumberLegacyPrefixComponent {}
