import { Component, OnInit } from '@angular/core';

@Component({
  selector : 'nz-demo-slider-icon',
  template : `
    <div class="icon-wrapper test-class">
      <i [ngClass]="preIconClassMap"></i>
      <nz-slider [nzMin]="0" [nzMax]="20" [(ngModel)]="sliderValue"></nz-slider>
      <i [ngClass]="nextIconClassMap"></i>
    </div>
  `,
  styleUrls: [ './nz-demo-slider-icon.less' ]
})
export class NzDemoSliderIconComponent implements OnInit {

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
