import { Component } from '@angular/core';

import { NzCarouselTransformNoLoopStrategy, NZ_CAROUSEL_CUSTOM_STRATEGIES } from 'ng-zorro-antd/carousel';

@Component({
  selector: 'nz-demo-carousel-custom',
  template: `<nz-carousel nzEffect="transform-no-loop">
    <div nz-carousel-content *ngFor="let index of array">
      <h3>{{ index }}</h3>
    </div>
  </nz-carousel>`,
  styles: [
    `
      [nz-carousel-content] {
        text-align: center;
        height: 160px;
        line-height: 160px;
        background: #364d79;
        color: #fff;
        overflow: hidden;
      }

      h3 {
        color: #fff;
        margin-bottom: 0;
      }
    `
  ],
  providers: [
    {
      provide: NZ_CAROUSEL_CUSTOM_STRATEGIES,
      useValue: [{ name: 'transform-no-loop', strategy: NzCarouselTransformNoLoopStrategy }]
    }
  ]
})
export class NzDemoCarouselCustomComponent {
  public array = [1, 2, 3, 4];
}
