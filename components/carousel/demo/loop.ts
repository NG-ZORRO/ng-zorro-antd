import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-carousel-loop',
  template: `
    <nz-carousel nzAutoPlay [nzEffect]="effect" [nzLoop]="false">
      @for (index of array; track index) {
        <div nz-carousel-content>
          <h3>{{ index }}</h3>
        </div>
      }
    </nz-carousel>
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
export class NzDemoCarouselLoopComponent {
  array = [1, 2, 3, 4];
  effect = 'scrollx';
}
