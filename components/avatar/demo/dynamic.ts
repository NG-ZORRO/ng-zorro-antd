import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

const userList = ['Lucy', 'U', 'Tom', 'Edward'];
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

@Component({
  selector: 'nz-demo-avatar-dynamic',
  imports: [FormsModule, NzAvatarModule, NzButtonModule, NzInputNumberModule],
  template: `
    <div>
      <label>Gap: </label>
      <nz-input-number [nzMin]="0" [nzMax]="16" [nzStep]="1" [(ngModel)]="gap" />
      <button nz-button (click)="change()">Change Text</button>
    </div>

    <nz-avatar [nzGap]="gap()" [nzText]="text()" nzSize="large" [style.background-color]="color()" />
  `,
  styles: `
    div {
      margin-bottom: 16px;
    }
    button {
      margin-left: 8px;
    }
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
}
