import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-slider-tooltip',
  template: `
    <nz-slider [ngModel]="value" [nzShowTooltip]="'always'"></nz-slider>
    <nz-slider [nzShowTooltip]="'never'"></nz-slider>
  `
})
export class NzDemoSliderTooltipComponent {
  value = 30;
}
