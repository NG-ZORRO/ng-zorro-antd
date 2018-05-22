import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-slider-icon-slider',
  template: `
    <div class="icon-wrapper test-class">
      <i [ngClass]="preIconClassMap"></i>
      <nz-slider [nzMin]="0" [nzMax]="20" [(ngModel)]="sliderValue"></nz-slider>
      <i [ngClass]="nextIconClassMap"></i>
    </div>
  `,
  styles  : [
      `
      .icon-wrapper {
        position: relative;
        padding: 0px 30px;
      }

      .icon-wrapper ::ng-deep .anticon {
        position: absolute;
        top: -2px;
        width: 16px;
        height: 16px;
        line-height: 1;
        font-size: 16px;
        color: rgba(0, 0, 0, .25);
      }

      .icon-wrapper ::ng-deep .anticon:first-child {
        left: 0;
      }

      .icon-wrapper ::ng-deep .anticon:last-child {
        right: 0;
      }
    `
  ]
})
export class NzDemoSliderIconSliderComponent implements OnInit {

  min = 0;
  max = 20;
  mid = parseFloat(((this.max - this.min) / 2).toFixed(5));
  preIconClassMap = {
    'anticon'        : true,
    'anticon-frown-o': true
  };
  nextIconClassMap = {
    'anticon'        : true,
    'anticon-smile-o': true
  };

  _sliderValue;
  set sliderValue(value: number) {
    this._sliderValue = value;
    this.highlightIcon();
  }

  get sliderValue() {
    return this._sliderValue;
  }

  ngOnInit() {
    this.sliderValue = 0;
  }

  highlightIcon() {
    const lower = this._sliderValue >= this.mid;
    this.preIconClassMap[ 'anticon-highlight' ] = !lower;
    this.nextIconClassMap[ 'anticon-highlight' ] = lower;
  }

}
