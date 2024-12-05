import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzRateModule } from 'ng-zorro-antd/rate';

@Component({
  selector: 'nz-demo-rate-text',
  imports: [FormsModule, NzRateModule],
  template: `
    <nz-rate [(ngModel)]="value" [nzTooltips]="tooltips"></nz-rate>
    @if (value) {
      <span class="ant-rate-text">{{ value ? tooltips[value - 1] : '' }}</span>
    }
  `
})
export class NzDemoRateTextComponent {
  readonly tooltips = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
  value = 3;
}
