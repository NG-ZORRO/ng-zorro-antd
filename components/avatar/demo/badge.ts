import { Component } from '@angular/core';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

@Component({
  selector: 'nz-demo-avatar-badge',
  imports: [NzAvatarModule, NzBadgeModule],
  template: `
    <nz-badge [nzCount]="5">
      <nz-avatar nzIcon="user" nzShape="square" />
    </nz-badge>
    <nz-badge nzDot>
      <nz-avatar nzIcon="user" nzShape="square" />
    </nz-badge>
  `,
  styles: `
    :host {
      display: inline-flex;
      gap: 24px;
    }
  `
})
export class NzDemoAvatarBadgeComponent {}
