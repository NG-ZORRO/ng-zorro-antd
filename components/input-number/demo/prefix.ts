import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-number-prefix',
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
export class NzDemoInputNumberPrefixComponent {}
