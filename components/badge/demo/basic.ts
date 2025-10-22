import { Component } from '@angular/core';

import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-demo-badge-basic',
  imports: [NzBadgeModule, NzIconModule],
  template: `
    <nz-badge [nzCount]="5">
      <a class="head-example"></a>
    </nz-badge>
    <nz-badge [nzCount]="0" nzShowZero>
      <a class="head-example"></a>
    </nz-badge>
    <nz-badge [nzCount]="iconTemplate">
      <a class="head-example"></a>
    </nz-badge>
    <ng-template #iconTemplate>
      <nz-icon nzType="clock-circle" class="ant-scroll-number-custom-component" style="color: #f5222d" />
    </ng-template>
  `,
  styles: [
    `
      nz-badge {
        margin-right: 20px;
      }

      .head-example {
        width: 42px;
        height: 42px;
        border-radius: 4px;
        background: #eee;
        display: inline-block;
        vertical-align: middle;
      }
    `
  ]
})
export class NzDemoBadgeBasicComponent {}
