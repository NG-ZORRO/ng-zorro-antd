import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-avatar-basic',
  template: `
  <div>
    <nz-avatar nzSize="large" nzIcon="anticon anticon-user"></nz-avatar>
    <nz-avatar nzIcon="anticon anticon-user"></nz-avatar>
    <nz-avatar nzSize="small" nzIcon="anticon anticon-user"></nz-avatar>
  </div>
  <div>
    <nz-avatar [nzShape]="'square'" [nzSize]="'large'" [nzIcon]="'anticon anticon-user'"></nz-avatar>
    <nz-avatar [nzShape]="'square'" [nzIcon]="'anticon anticon-user'"></nz-avatar>
    <nz-avatar [nzShape]="'square'" [nzSize]="'small'" [nzIcon]="'anticon anticon-user'"></nz-avatar>
  </div>
  `,
  styles: [`
    :host ::ng-deep .ant-avatar {
      margin-top: 16px;
      margin-right: 16px;
    }
  `]
})
export class NzDemoAvatarBasicComponent { }
