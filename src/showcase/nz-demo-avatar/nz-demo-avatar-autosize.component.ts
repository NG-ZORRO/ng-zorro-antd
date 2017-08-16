import { Component } from '@angular/core';

const UserList = ['U', 'Lucy', 'Tom', 'Edward'];
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

@Component({
  selector: 'nz-demo-avatar-autosize',
  template: `
  <nz-avatar [nzText]="text" nzSize="large" [ngStyle]="{'background-color':color}"></nz-avatar>
  <button nz-button [nzType]="'dashed'" (click)="change()">
      <span>Change</span>
  </button>
  `,
  styles: [`
    :host ::ng-deep .ant-avatar {
      margin-top: 16px;
      margin-right: 16px;
    }
  `]
})
export class NzDemoAvatarAutoSizeComponent {
  text: string = UserList[3];
  color: string = ColorList[3];

  change() {
    let idx = UserList.indexOf(this.text);
    ++idx;
    if (idx == UserList.length) idx = 0;
    this.text = UserList[idx];
    this.color = ColorList[idx];
  }
}
