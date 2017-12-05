import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-carousel',
  templateUrl  : './nz-demo-carousel.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls    : [
    './nz-demo-carousel.less'
  ]
})
export class NzDemoCarouselComponent {
  NzDemoCarouselBasicCode = require('!!raw-loader!./nz-demo-carousel-basic.component');
  NzDemoCarouselVerticalCode = require('!!raw-loader!./nz-demo-carousel-vertical.component');
  NzDemoCarouselFadeCode = require('!!raw-loader!./nz-demo-carousel-fade.component');
  NzDemoCarouselAutoCode = require('!!raw-loader!./nz-demo-carousel-auto.component');
}
