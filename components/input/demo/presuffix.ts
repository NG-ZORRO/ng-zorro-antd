import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-presuffix',
  template: `
    <nz-input-group [nzSuffix]="suffixTemplateInfo" [nzPrefix]="prefixTemplateUser">
      <input type="text" nz-input placeholder="Enter your username" />
    </nz-input-group>
    <ng-template #prefixTemplateUser><span nz-icon nzType="user"></span></ng-template>
    <ng-template #suffixTemplateInfo>
      <span nz-icon nz-tooltip nzTooltipTitle="Extra information" nzType="info-circle"></span>
    </ng-template>
    <br />
    <br />
    <nz-input-group nzSuffix="RMB" nzPrefix="￥">
      <input type="text" nz-input />
    </nz-input-group>
  `
})
export class NzDemoInputPresuffixComponent {}
