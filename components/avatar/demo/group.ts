import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-avatar-group',
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
  `,
  styles: [``]
})
export class NzDemoAvatarGroupComponent {}
