import { Component } from '@angular/core';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@Component({
  selector: 'nz-demo-avatar-responsive',
  imports: [NzAvatarModule],
  template: `<nz-avatar [nzSize]="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }" nzIcon="user" />`
})
export class NzDemoAvatarResponsiveComponent {}
