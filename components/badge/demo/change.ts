import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'nz-demo-badge-change',
  imports: [FormsModule, NzBadgeModule, NzButtonModule, NzIconModule, NzSwitchModule],
  template: `
    <div>
      <nz-badge [nzCount]="count">
        <a class="head-example"></a>
      </nz-badge>
      <nz-button-group>
        <button nz-button (click)="minusCount()"><nz-icon nzType="minus" /></button>
        <button nz-button (click)="addCount()"><nz-icon nzType="plus" /></button>
      </nz-button-group>
    </div>
    <br />
    <div>
      <nz-badge [nzDot]="dot">
        <a class="head-example"></a>
      </nz-badge>
      <nz-switch [(ngModel)]="dot"></nz-switch>
    </div>
  `,
  styles: [
    `
      nz-badge {
        margin-right: 20px;
      }

      nz-badge.ant-badge-rtl {
        margin-right: 0;
        margin-left: 20px;
      }

      .head-example {
        width: 42px;
        height: 42px;
        border-radius: 4px;
        background: #eee;
        display: inline-block;
        vertical-align: middle;
      }
    `
  ]
})
export class NzDemoBadgeChangeComponent {
  count = 5;
  dot = true;

  addCount(): void {
    this.count++;
  }

  minusCount(): void {
    this.count = Math.max(0, this.count - 1);
  }
}
