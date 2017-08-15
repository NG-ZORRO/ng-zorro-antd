import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'nz-demo-carousel-auto',
  template: `
    <nz-carousel [nzAutoPlay]="true">
      <div nz-carousel-content><h3>1</h3></div>
      <div nz-carousel-content><h3>2</h3></div>
      <div nz-carousel-content><h3>3</h3></div>
      <div nz-carousel-content><h3>4</h3></div>
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
export class NzDemoCarouselAutoComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
