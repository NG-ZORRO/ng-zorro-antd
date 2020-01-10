import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-slider-tooltip',
  template: `
    <nz-slider [nzTooltipVisible]="'always'"></nz-slider>
    <nz-slider [nzTooltipVisible]="'never'"></nz-slider>
  `
})
export class NzDemoSliderTooltipComponent {}
