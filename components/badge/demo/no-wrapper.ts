import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'nz-demo-badge-no-wrapper',
  imports: [FormsModule, NzBadgeModule, NzIconModule, NzSwitchModule],
  template: `
    <nz-switch [(ngModel)]="show"></nz-switch>
    <nz-badge nzStandalone [nzCount]="show ? 25 : 0"></nz-badge>
    <nz-badge
      nzStandalone
      [nzCount]="show ? 4 : 0"
      [nzStyle]="{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }"
    ></nz-badge>
    <nz-badge [nzCount]="show ? iconTemplate : 0" nzStandalone>
      <a class="head-example"></a>
    </nz-badge>
    <ng-template #iconTemplate>
      <nz-icon nzType="clock-circle" class="ant-scroll-number-custom-component" style="color: #f5222d" />
    </ng-template>
    <nz-badge nzStandalone [nzCount]="show ? 109 : 0" [nzStyle]="{ backgroundColor: '#52c41a' }"></nz-badge>
  `,
  styles: [
    `
      nz-badge {
        margin-right: 20px;
      }
    `
  ]
})
export class NzDemoBadgeNoWrapperComponent {
  show = true;
}
