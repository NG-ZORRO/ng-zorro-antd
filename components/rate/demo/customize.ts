import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRateModule } from 'ng-zorro-antd/rate';

@Component({
  selector: 'nz-demo-rate-customize',
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
          <nz-icon nzType="frown" />
        }
        @case (1) {
          <nz-icon nzType="frown" />
        }
        @case (2) {
          <nz-icon nzType="meh" />
        }
        @case (3) {
          <nz-icon nzType="smile" />
        }
        @case (4) {
          <nz-icon nzType="smile" />
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
