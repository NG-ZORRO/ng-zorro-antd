import { Component } from '@angular/core';

import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-demo-badge-dot',
  imports: [NzBadgeModule, NzIconModule],
  template: `
    <nz-badge nzDot>
      <nz-icon nzType="notification" />
    </nz-badge>
    <nz-badge nzDot [nzShowDot]="false">
      <nz-icon nzType="notification" />
    </nz-badge>
    <nz-badge nzDot>
      <a>Link something</a>
    </nz-badge>
  `,
  styles: [
    `
      nz-badge {
        margin-right: 20px;
      }

      nz-icon {
        width: 16px;
        height: 16px;
        line-height: 16px;
        font-size: 16px;
      }
    `
  ]
})
export class NzDemoBadgeDotComponent {}
