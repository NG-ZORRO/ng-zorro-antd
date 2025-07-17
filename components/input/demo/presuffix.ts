import { Component } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'nz-demo-input-presuffix',
  imports: [NzInputModule, NzIconModule, NzTooltipModule],
  template: `
    <nz-input-group [nzSuffix]="suffixTemplateInfo" [nzPrefix]="prefixTemplateUser">
      <input type="text" nz-input placeholder="Enter your username" />
    </nz-input-group>
    <ng-template #prefixTemplateUser><nz-icon nzType="user" /></ng-template>
    <ng-template #suffixTemplateInfo>
      <nz-icon nz-tooltip nzTooltipTitle="Extra information" nzType="info-circle" />
    </ng-template>
    <br />
    <br />
    <nz-input-group nzSuffix="RMB" nzPrefix="￥">
      <input type="text" nz-input />
    </nz-input-group>
  `
})
export class NzDemoInputPresuffixComponent {}
