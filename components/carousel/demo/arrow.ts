import { Component } from '@angular/core';

import { NzCarouselModule } from 'ng-zorro-antd/carousel';

@Component({
  selector: 'nz-demo-carousel-arrow',
  imports: [NzCarouselModule],
  template: ` <nz-carousel [nzEffect]="effect" nzArrows>
    @for (index of array; track index) {
      <div nz-carousel-content>
        <h3>{{ index }}</h3>
      </div>
    }
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
        user-select: none;
      }
    `
  ]
})
export class NzDemoCarouselArrowComponent {
  array = [1, 2, 3, 4];
  effect = 'scrollx';
}
