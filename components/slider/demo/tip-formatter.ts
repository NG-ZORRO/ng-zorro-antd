import { Component } from '@angular/core';

import { NzSliderModule } from 'ng-zorro-antd/slider';

@Component({
  selector: 'nz-demo-slider-tip-formatter',
  imports: [NzSliderModule],
  template: `
    <nz-slider [nzTipFormatter]="formatter"></nz-slider>
    <nz-slider [nzTipFormatter]="null"></nz-slider>
    <nz-slider [nzTipFormatter]="titleTemplate"></nz-slider>
    <ng-template #titleTemplate let-value>
      <span>Slider value: {{ value }}</span>
    </ng-template>
  `
})
export class NzDemoSliderTipFormatterComponent {
  formatter(value: number): string {
    return `${value}%`;
  }
}
