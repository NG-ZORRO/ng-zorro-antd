import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'nz-demo-badge-dynamic',
  imports: [FormsModule, NzBadgeModule, NzButtonModule, NzFlexModule, NzIconModule, NzSwitchModule, NzSpaceModule],
  template: `
    <div nz-flex nzVertical nzGap="middle">
      <div nz-flex nzGap="large" nzAlign="center">
        <nz-badge [nzCount]="count()">
          <a class="head-example"></a>
        </nz-badge>
        <nz-space-compact>
          <button nz-button (click)="minusCount()"><nz-icon nzType="minus" /></button>
          <button nz-button (click)="addCount()"><nz-icon nzType="plus" /></button>
          <button nz-button (click)="random()"><nz-icon nzType="question" /></button>
        </nz-space-compact>
      </div>
      <div nz-flex nzGap="large" nzAlign="center">
        <nz-badge [nzDot]="dot()">
          <a class="head-example"></a>
        </nz-badge>
        <nz-switch [ngModel]="dot()" (ngModelChange)="dot.set($event)" />
      </div>
    </div>
  `,
  styles: `
    .head-example {
      width: 42px;
      height: 42px;
      border-radius: 4px;
      background: #eee;
      display: inline-block;
      vertical-align: middle;
    }
  `
})
export class NzDemoBadgeDynamicComponent {
  readonly count = signal(5);
  readonly dot = signal(true);

  addCount(): void {
    this.count.update(count => count + 1);
  }

  minusCount(): void {
    this.count.update(count => Math.max(0, count - 1));
  }

  random(): void {
    this.count.set(Math.floor(Math.random() * 100));
  }
}
