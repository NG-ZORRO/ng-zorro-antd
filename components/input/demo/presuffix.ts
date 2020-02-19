import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-presuffix',
  template: `
    <nz-input-group [nzSuffix]="suffixTemplateInfo" [nzPrefix]="prefixTemplateUser">
      <input type="text" nz-input placeholder="Enter your username" />
    </nz-input-group>
    <ng-template #prefixTemplateUser><i nz-icon nzType="user"></i></ng-template>
    <ng-template #suffixTemplateInfo><i nz-icon nz-tooltip nzTooltipTitle="Extra information" nzType="info-circle"></i></ng-template>
    <br />
    <br />
    <nz-input-group nzSuffix="RMB" nzPrefix="￥">
      <input type="text" nz-input />
    </nz-input-group>
  `
})
export class NzDemoInputPresuffixComponent {}
