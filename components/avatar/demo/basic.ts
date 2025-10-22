import { Component } from '@angular/core';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@Component({
  selector: 'nz-demo-avatar-basic',
  imports: [NzAvatarModule],
  template: `
    <div>
      <nz-avatar [nzSize]="64" nzIcon="user"></nz-avatar>
      <nz-avatar nzSize="large" nzIcon="user"></nz-avatar>
      <nz-avatar nzIcon="user"></nz-avatar>
      <nz-avatar nzSize="small" nzIcon="user"></nz-avatar>
    </div>
    <div>
      <nz-avatar nzShape="square" [nzSize]="64" nzIcon="user"></nz-avatar>
      <nz-avatar nzShape="square" nzSize="large" nzIcon="user"></nz-avatar>
      <nz-avatar nzShape="square" nzIcon="user"></nz-avatar>
      <nz-avatar nzShape="square" nzSize="small" nzIcon="user"></nz-avatar>
    </div>
  `,
  styles: [
    `
      nz-avatar {
        margin-top: 16px;
        margin-right: 16px;
      }
    `
  ]
})
export class NzDemoAvatarBasicComponent {}
