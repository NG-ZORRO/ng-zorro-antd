import { Component } from '@angular/core';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@Component({
  selector: 'nz-demo-avatar-basic',
  imports: [NzAvatarModule],
  template: `
    <div>
      <nz-avatar [nzSize]="64" nzIcon="user" />
      <nz-avatar nzSize="large" nzIcon="user" />
      <nz-avatar nzIcon="user" />
      <nz-avatar nzSize="small" nzIcon="user" />
    </div>
    <div>
      <nz-avatar nzShape="square" [nzSize]="64" nzIcon="user" />
      <nz-avatar nzShape="square" nzSize="large" nzIcon="user" />
      <nz-avatar nzShape="square" nzIcon="user" />
      <nz-avatar nzShape="square" nzSize="small" nzIcon="user" />
    </div>
  `,
  styles: `
    nz-avatar {
      margin-top: 16px;
      margin-right: 16px;
    }
  `
})
export class NzDemoAvatarBasicComponent {}
