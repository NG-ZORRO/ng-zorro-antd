import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-avatar-type',
  template: `
  <nz-avatar nzIcon="anticon anticon-user"></nz-avatar>
  <nz-avatar nzText="U"></nz-avatar>
  <nz-avatar nzText="USER"></nz-avatar>
  <nz-avatar nzIcon="anticon anticon-user" nzSrc="//zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></nz-avatar>
  <nz-avatar nzText="U" style="color:#f56a00; background-color:#fde3cf;"></nz-avatar>
  <nz-avatar nzIcon="anticon anticon-user" style="background-color:#87d068;"></nz-avatar>
  `,
  styles: [`
    :host ::ng-deep .ant-avatar {
      margin-top: 16px;
      margin-right: 16px;
    }
  `]
})
export class NzDemoAvatarTypeComponent { }
