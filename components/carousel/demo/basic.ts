import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-carousel-basic',
  template: `
    <nz-carousel>
      <div nz-carousel-content *ngFor="let index of array"><h3>{{index}}</h3></div>
    </nz-carousel>`,
  styles  : [
      `:host ::ng-deep .ant-carousel .slick-slide {
      text-align: center;
      height: 160px;
      line-height: 160px;
      background: #364d79;
      color: #fff;
      overflow: hidden;
    }

    h3 {
      color: #fff;
    }
    `
  ]
})
export class NzDemoCarouselBasicComponent {
  array = [ 1, 2, 3, 4 ];
}
