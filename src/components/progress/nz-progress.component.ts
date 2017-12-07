import {
  forwardRef,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector     : 'nz-progress',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div [ngClass]="'ant-progress ant-progress-status-'+nzStatus"
      [class.ant-progress-line]="nzType=='line'"
      [class.ant-progress-show-info]="nzShowInfo"
      [class.ant-progress-circle]="nzType=='circle'">
      <div *ngIf="nzType=='line'">
        <div class="ant-progress-outer"><!----><div class="ant-progress-inner"><!----><div class="ant-progress-bg" [style.width.%]="_percent" [style.height.px]="nzStrokeWidth"></div><!----></div><!----></div><!----><span class="ant-progress-text" *ngIf="nzShowInfo"><ng-template [ngIf]="(nzStatus=='active')||(nzStatus=='normal')||(_hasFormat)">{{ _format(_percent) }}</ng-template><ng-template [ngIf]="(nzStatus=='exception')||(nzStatus=='success')&&(!_hasFormat)"><i class="anticon" [ngClass]="{'anticon-check-circle':nzStatus=='success','anticon-cross-circle':nzStatus=='exception'}"></i></ng-template></span>
      </div>
      <div class="ant-progress-inner" *ngIf="nzType=='circle'" [ngStyle]="_circleStyle">
        <svg class="rc-progress-circle " viewBox="0 0 100 100" *ngIf="nzType=='circle'">
          <path class="rc-progress-circle-trail" [attr.d]="_pathString" stroke="#f3f3f3" [attr.stroke-width]="nzStrokeWidth" fill-opacity="0"></path>
          <path class="rc-progress-circle-path" [attr.d]="_pathString" stroke-linecap="round" [attr.stroke]="_statusColorMap[nzStatus]" stroke-width="6" fill-opacity="0" [ngStyle]="_pathStyle"></path>
        </svg>
        <span class="ant-progress-text" *ngIf="nzShowInfo"><ng-template [ngIf]="(nzStatus=='active')||(nzStatus=='normal')||(_hasFormat)">{{ _format(_percent) }}</ng-template><ng-template [ngIf]="(nzStatus=='exception')||(nzStatus=='success')&&!(_hasFormat)"><i class="anticon" [ngClass]="{'anticon-check':nzStatus=='success','anticon-cross':nzStatus=='exception'}"></i></ng-template></span>
      </div>
    </div>
  `,
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzProgressComponent),
      multi      : true
    }
  ],
  styleUrls    : [
    './style/index.less'
  ]
})
export class NzProgressComponent implements ControlValueAccessor, OnInit {
  _statusColorMap = {
    normal   : '#108ee9',
    exception: '#ff5500',
    success  : '#87d068',
  };

  _pathString = '';
  _pathStyle = {};
  _circleStyle = {};
  _percent = 0;
  _hasFormat = false;
  _rawStatus = 'normal';
  // ngModel Access
  onChange: (value: number) => void = () => null;
  onTouched: () => void = () => null;

  @Input() nzType = 'line';
  @Input() nzStrokeWidth: number = this.nzType === 'line' ? 10 : 6;
  @Input() nzWidth = 132;
  @Input() nzShowInfo = true;
  @Input() nzStatus = 'normal';

  @Input('nzFormat')
  set _setFormat(value: (input: number) => string) {
    this._format = value;
    this._hasFormat = true;
  }

  _format = (percent: number) => percent + '%';

  updateCircleStatus(): void {
    const circleSize = this.nzWidth || 132;
    this._circleStyle = {
      'width.px'    : circleSize,
      'height.px'   : circleSize,
      'font-size.px': circleSize * 0.16 + 6,
    };
    const radius = 50 - this.nzStrokeWidth / 2;
    const len = Math.PI * 2 * radius;
    this._pathString = `M 50,50 m 0,-${radius}\n     a ${radius},${radius} 0 1 1 0,${radius * 2}\n     a ${radius},${radius} 0 1 1 0,-${radius * 2}`;
    this._pathStyle = {
      'stroke-dasharray' : `${len}px ${len}px`,
      'stroke-dashoffset': (100 - this._percent) / 100 * len + 'px',
      'transition'       : 'stroke-dashoffset 0.3s ease 0s, stroke 0.3s ease'
    };
  }

  writeValue(value: number): void {
    this._percent = value;
    if (this._percent === 100) {
      this.nzStatus = 'success';
    } else {
      this.nzStatus = this._rawStatus;
    }
    if (this.nzType === 'circle') {
      this.updateCircleStatus();
    }
  }

  registerOnChange(fn: (_: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    this._rawStatus = this.nzStatus;
  }

}
