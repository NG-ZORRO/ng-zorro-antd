import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'nz-demo-badge-no-wrapper',
  imports: [FormsModule, NzBadgeModule, NzFlexModule, NzIconModule, NzSwitchModule],
  template: `
    <nz-flex nzGap="small" nzAlign="center">
      <nz-switch [(ngModel)]="show" />
      <nz-badge nzStandalone nzShowZero [nzCount]="show ? 11 : 0" [nzStyle]="{ backgroundColor: '#faad14' }" />
      <nz-badge nzStandalone [nzCount]="show ? 25 : 0" />
      <nz-badge nzStandalone [nzCount]="show ? iconTemplate : 0" />
      <nz-badge nzStandalone [nzCount]="show ? 109 : 0" [nzStyle]="{ backgroundColor: '#52c41a' }" />
    </nz-flex>

    <ng-template #iconTemplate>
      <nz-icon nzType="clock-circle" class="ant-scroll-number-custom-component" style="color: #f5222d" />
    </ng-template>
  `
})
export class NzDemoBadgeNoWrapperComponent {
  show = true;
}
