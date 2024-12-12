import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'nz-demo-switch-text',
  imports: [FormsModule, NzIconModule, NzSwitchModule],
  template: `
    <nz-switch [ngModel]="true" nzCheckedChildren="开" nzUnCheckedChildren="关"></nz-switch>
    <br />
    <br />
    <nz-switch [ngModel]="false" nzCheckedChildren="1" nzUnCheckedChildren="0"></nz-switch>
    <br />
    <br />
    <nz-switch
      [ngModel]="true"
      [nzCheckedChildren]="checkedTemplate"
      [nzUnCheckedChildren]="unCheckedTemplate"
    ></nz-switch>
    <ng-template #checkedTemplate><nz-icon nzType="check" /></ng-template>
    <ng-template #unCheckedTemplate><nz-icon nzType="close" /></ng-template>
  `
})
export class NzDemoSwitchTextComponent {}
