import { Component } from '@angular/core';

const userList = ['Lucy', 'U', 'Tom', 'Edward'];
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

@Component({
  selector: 'nz-demo-avatar-dynamic',
  template: `
    <div>
      <label>
        Gap:
        <nz-input-number [nzMin]="0" [nzMax]="16" [nzStep]="1" [(ngModel)]="gap"></nz-input-number>
      </label>
      <button nz-button (click)="change()">
        <span>Change Text</span>
      </button>
    </div>

    <nz-avatar
      [nzGap]="gap"
      [ngStyle]="{ 'background-color': color }"
      [nzText]="text"
      nzSize="large"
      style="vertical-align: middle;"
    ></nz-avatar>
  `,
  styles: [
    `
      div {
        margin-bottom: 16px;
      }
      button {
        margin-left: 8px;
      }
    `
  ]
})
export class NzDemoAvatarDynamicComponent {
  text: string = userList[3];
  color: string = colorList[3];
  gap = 4;
  change(): void {
    let idx = userList.indexOf(this.text);
    ++idx;
    if (idx === userList.length) {
      idx = 0;
    }
    this.text = userList[idx];
    this.color = colorList[idx];
  }
}
