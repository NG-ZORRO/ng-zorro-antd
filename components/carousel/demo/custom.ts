import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  NZ_CAROUSEL_CUSTOM_STRATEGIES,
  NzCarouselFlipStrategy,
  NzCarouselModule,
  NzCarouselTransformNoLoopStrategy
} from 'ng-zorro-antd/carousel';
import { NzRadioModule } from 'ng-zorro-antd/radio';

@Component({
  selector: 'nz-demo-carousel-custom',
  imports: [FormsModule, NzCarouselModule, NzRadioModule],
  template: `
    <nz-radio-group [(ngModel)]="strategy">
      <label nz-radio-button nzValue="transform-no-loop">Transform No Loop</label>
      <label nz-radio-button nzValue="flip">Flip</label>
      <label nz-radio-button nzValue="fade">Fade (built-in)</label>
    </nz-radio-group>
    <nz-carousel [nzEffect]="strategy">
      @for (index of array; track index) {
        <div nz-carousel-content>
          <h3>{{ index }}</h3>
        </div>
      }
    </nz-carousel>
  `,
  styles: `
    nz-radio-group {
      margin-bottom: 8px;
    }

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
  `,
  providers: [
    {
      provide: NZ_CAROUSEL_CUSTOM_STRATEGIES,
      useValue: [
        { name: 'transform-no-loop', strategy: NzCarouselTransformNoLoopStrategy },
        { name: 'flip', strategy: NzCarouselFlipStrategy }
      ]
    }
  ]
})
export class NzDemoCarouselCustomComponent {
  strategy = 'transform-no-loop';
  array = [1, 2, 3, 4];
}
