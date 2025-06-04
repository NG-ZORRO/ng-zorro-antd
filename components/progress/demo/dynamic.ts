import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'nz-demo-progress-dynamic',
  imports: [NzButtonModule, NzIconModule, NzFlexModule, NzProgressModule, NzSpaceModule],
  template: `
    <div nz-flex nzVertical nzGap="small">
      <nz-progress [nzPercent]="percent"></nz-progress>
      <nz-progress [nzPercent]="percent" nzType="circle"></nz-progress>
      <nz-space-compact>
        <button nz-button (click)="decline()"><nz-icon nzType="minus" /></button>
        <button nz-button (click)="increase()"><nz-icon nzType="plus" /></button>
      </nz-space-compact>
    </div>
  `
})
export class NzDemoProgressDynamicComponent {
  percent = 0;

  increase(): void {
    this.percent = Math.min(this.percent + 10, 100);
  }

  decline(): void {
    this.percent = Math.max(this.percent - 10, 0);
  }
}
