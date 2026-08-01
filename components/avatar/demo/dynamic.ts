import { Component, computed, signal } from '@angular/core';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';

const userList = ['Lucy', 'U', 'Tom', 'Edward'];
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

@Component({
  selector: 'nz-demo-avatar-dynamic',
  imports: [NzAvatarModule, NzButtonModule],
  template: `
    <nz-avatar [nzGap]="gap()" [nzText]="text()" nzSize="large" [style.background-color]="color()" />
    <button nz-button (click)="change()" [style.margin-inline.px]="16">Change Text</button>
    <button nz-button (click)="changeGap()">Change Gap</button>
  `
})
export class NzDemoAvatarDynamicComponent {
  readonly index = signal(3);
  readonly text = computed(() => userList[this.index()]);
  readonly color = computed(() => colorList[this.index()]);
  readonly gap = signal(4);

  change(): void {
    this.index.update(idx => (idx + 1) % userList.length);
  }

  changeGap(): void {
    this.gap.update(g => (g + 1) % 5);
  }
}
