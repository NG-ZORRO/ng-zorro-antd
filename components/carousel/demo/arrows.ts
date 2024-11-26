import { Component } from '@angular/core';

import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzFlexDirective } from 'ng-zorro-antd/flex';

@Component({
  selector: 'nz-demo-carousel-arrows',
  standalone: true,
  imports: [NzCarouselModule, NzFlexDirective],
  template: `
    <nz-flex nzVertical nzGap="middle">
      <nz-carousel [nzEnableSwipe]="false" [nzArrows]="true">
        @for (index of array; track index) {
          <div nz-carousel-content>
            <h3>{{ index }}</h3>
          </div>
        }
      </nz-carousel>

      <nz-carousel [nzEnableSwipe]="false" [nzDotPosition]="'left'" [nzArrows]="true">
        @for (index of array; track index) {
          <div nz-carousel-content>
            <h3>{{ index }}</h3>
          </div>
        }
      </nz-carousel>
    </nz-flex>
  `,
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
export class NzDemoCarouselArrowsComponent {
  array = [1, 2, 3, 4];
}
