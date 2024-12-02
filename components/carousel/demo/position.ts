import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzRadioModule } from 'ng-zorro-antd/radio';

@Component({
  selector: 'nz-demo-carousel-position',
  imports: [FormsModule, NzCarouselModule, NzRadioModule],
  template: `
    <nz-radio-group [(ngModel)]="dotPosition">
      <label nz-radio-button nzValue="bottom">Bottom</label>
      <label nz-radio-button nzValue="top">Top</label>
      <label nz-radio-button nzValue="left">Left</label>
      <label nz-radio-button nzValue="right">Right</label>
    </nz-radio-group>
    <nz-carousel [nzDotPosition]="dotPosition">
      @for (index of array; track index) {
        <div nz-carousel-content>
          <h3>{{ index }}</h3>
        </div>
      }
    </nz-carousel>
  `,
  styles: [
    `
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
    `
  ]
})
export class NzDemoCarouselPositionComponent {
  array = [1, 2, 3, 4];
  dotPosition = 'bottom';
}
