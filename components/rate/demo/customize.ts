import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRateModule } from 'ng-zorro-antd/rate';

@Component({
  selector: 'nz-demo-rate-customize',
  standalone: true,
  imports: [FormsModule, NzIconModule, NzRateModule],
  template: `
    <nz-rate [ngModel]="2" [nzCharacter]="characterNumber"></nz-rate>
    <br />
    <nz-rate [ngModel]="3" [nzCharacter]="characterIcon"></nz-rate>
    <br />
    <ng-template #characterNumber let-index>
      {{ index + 1 }}
    </ng-template>
    <ng-template #characterIcon let-index>
      @switch (index) {
        @case (0) {
          <span nz-icon nzType="frown"></span>
        }
        @case (1) {
          <span nz-icon nzType="frown"></span>
        }
        @case (2) {
          <span nz-icon nzType="meh"></span>
        }
        @case (3) {
          <span nz-icon nzType="smile"></span>
        }
        @case (4) {
          <span nz-icon nzType="smile"></span>
        }
      }
    </ng-template>
  `,
  styles: [
    `
      .large ::ng-deep .ant-rate-star {
        font-size: 36px;
      }
    `
  ]
})
export class NzDemoRateCustomizeComponent {}
