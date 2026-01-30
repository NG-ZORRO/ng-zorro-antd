import { Component } from '@angular/core';

import { NzSliderModule } from 'ng-zorro-antd/slider';

@Component({
  selector: 'nz-demo-slider-tooltip',
  imports: [NzSliderModule],
  template: `
    <nz-slider nzTooltipVisible="always" />
    <nz-slider nzTooltipVisible="never" />
  `
})
export class NzDemoSliderTooltipComponent {}
