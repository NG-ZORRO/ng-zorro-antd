import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-number-presuffix',
  template: `
    <nz-input-group [nzSuffix]="suffixTemplateInfo" [nzPrefix]="prefixTemplateUser">
      <nz-input-number type="text" nz-input placeholder="Enter your username"></nz-input-number>
    </nz-input-group>
    <ng-template #prefixTemplateUser><i nz-icon nzType="user"></i></ng-template>
    <ng-template #suffixTemplateInfo><i nz-icon nz-tooltip nzTooltipTitle="Extra information" nzType="info-circle"></i></ng-template>
  `
})
export class NzDemoInputNumberPresuffixComponent {}
