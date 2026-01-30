import { Component } from '@angular/core';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@Component({
  selector: 'nz-demo-avatar-type',
  imports: [NzAvatarModule],
  template: `
    <nz-avatar nzIcon="user" />
    <nz-avatar nzText="U" />
    <nz-avatar nzText="USER" />
    <nz-avatar nzIcon="user" nzSrc="//zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
    <nz-avatar nzText="U" style="color:#f56a00; background-color:#fde3cf;" />
    <nz-avatar nzIcon="user" style="background-color:#87d068;" />
  `,
  styles: `
    nz-avatar {
      margin-top: 16px;
      margin-right: 16px;
    }
  `
})
export class NzDemoAvatarTypeComponent {}
