import { Component } from '@angular/core';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  standalone: true,
  selector: 'nz-demo-avatar-group',
  imports: [NzAvatarModule, NzDividerModule, NzToolTipModule],
  template: `
    <nz-avatar-group>
      <nz-avatar nzIcon="user" nzSrc="//zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></nz-avatar>
      <nz-avatar style="background-color: #f56a00" nzText="U"></nz-avatar>
      <nz-avatar style="background-color: #87d068" nz-tooltip nzTooltipTitle="NG-ZORRO User" nzIcon="user"></nz-avatar>
      <nz-avatar style="background-color: #1890ff" nzText="NG"></nz-avatar>
    </nz-avatar-group>
    <nz-divider></nz-divider>
    <nz-avatar-group>
      <nz-avatar nzIcon="user" nzSrc="//zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></nz-avatar>
      <nz-avatar style="background-color: #f56a00" nzText="U"></nz-avatar>
      <nz-avatar style="background-color: #fde3cf; color: #f56a00" nzText="+2"></nz-avatar>
    </nz-avatar-group>
  `
})
export class NzDemoAvatarGroupComponent {}
