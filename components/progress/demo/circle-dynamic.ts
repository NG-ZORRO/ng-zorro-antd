import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzProgressModule } from 'ng-zorro-antd/progress';

@Component({
  selector: 'nz-demo-progress-circle-dynamic',
  standalone: true,
  imports: [NzButtonModule, NzIconModule, NzProgressModule],
  template: `
    <nz-progress [nzPercent]="percent" nzType="circle"></nz-progress>
    <nz-button-group>
      <button nz-button (click)="decline()"><span nz-icon nzType="minus"></span></button>
      <button nz-button (click)="increase()"><span nz-icon nzType="plus"></span></button>
    </nz-button-group>
  `,
  styles: [
    `
      nz-progress {
        margin-right: 8px;
      }
    `
  ]
})
export class NzDemoProgressCircleDynamicComponent {
  percent = 0;

  increase(): void {
    this.percent = this.percent + 10;
    if (this.percent > 100) {
      this.percent = 100;
    }
  }

  decline(): void {
    this.percent = this.percent - 10;
    if (this.percent < 0) {
      this.percent = 0;
    }
  }
}
