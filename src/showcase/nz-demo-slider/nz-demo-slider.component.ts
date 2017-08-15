import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nz-demo-slider',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './nz-demo-slider.html'
})
export class NzDemoSliderComponent {

  NzDemoSliderBasicCode = require('!!raw-loader!./nz-demo-slider-basic.component');
  NzDemoSliderInputNumberCode = require('!!raw-loader!./nz-demo-slider-input-number.component');
  NzDemoSliderIconCode = require('!!raw-loader!./nz-demo-slider-icon.component');
  NzDemoSliderEventCode = require('!!raw-loader!./nz-demo-slider-event.component');
  NzDemoSliderTipFormatterCode = require('!!raw-loader!./nz-demo-slider-tip-formatter.component');
  NzDemoSliderVerticalCode = require('!!raw-loader!./nz-demo-slider-vertical.component');
  NzDemoSliderMarkCode = require('!!raw-loader!./nz-demo-slider-mark.component');

}
