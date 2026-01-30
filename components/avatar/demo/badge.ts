import { Component } from '@angular/core';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

@Component({
  selector: 'nz-demo-avatar-badge',
  imports: [NzBadgeModule, NzAvatarModule],
  template: `
    <nz-badge [nzCount]="5" style="margin-right: 24px">
      <nz-avatar nzIcon="user" nzShape="square" />
    </nz-badge>
    <nz-badge nzDot>
      <nz-avatar nzIcon="user" nzShape="square" />
    </nz-badge>
  `
})
export class NzDemoAvatarBadgeComponent {}
