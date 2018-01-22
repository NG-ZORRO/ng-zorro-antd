import {
  forwardRef,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector           : 'nz-progress',
  preserveWhitespaces: false,
  template           : `
    <div [ngClass]="'ant-progress ant-progress-status-'+nzStatus"
      [class.ant-progress-line]="nzType=='line'"
      [class.ant-progress-show-info]="nzShowInfo"
      [class.ant-progress-circle]="isCircleOrDashboard">
      <div *ngIf="nzType=='line'">
        <div class="ant-progress-outer"><!---->
          <div class="ant-progress-inner"><!---->
            <div class="ant-progress-bg" [style.width.%]="_percent" [style.height.px]="nzStrokeWidth"></div><!---->
          </div><!----></div><!----><span class="ant-progress-text" *ngIf="nzShowInfo"><ng-template [ngIf]="(nzStatus=='active')||(nzStatus=='normal')||(_hasFormat)">{{ _format(_percent) }}</ng-template><ng-template [ngIf]="(nzStatus=='exception')||(nzStatus=='success')&&(!_hasFormat)"><i class="anticon" [ngClass]="{'anticon-check-circle':nzStatus=='success','anticon-cross-circle':nzStatus=='exception'}"></i></ng-template></span>
      </div>
      <div class="ant-progress-inner" *ngIf="isCircleOrDashboard" [ngStyle]="_circleStyle">
        <svg class="ant-progress-circle " viewBox="0 0 100 100">
          <path class="ant-progress-circle-trail" [attr.d]="_pathString" stroke="#f3f3f3" [attr.stroke-width]="nzStrokeWidth" fill-opacity="0" [ngStyle]="_trailPath"></path>
          <path class="ant-progress-circle-path" [attr.d]="_pathString" stroke-linecap="round" [attr.stroke]="_statusColorMap[nzStatus]" [attr.stroke-width]="_percent?6:0" fill-opacity="0" [ngStyle]="_pathStyle"></path>
        </svg>
        <span class="ant-progress-text" *ngIf="nzShowInfo"><ng-template [ngIf]="(nzStatus=='active')||(nzStatus=='normal')||(_hasFormat)">{{ _format(_percent) }}</ng-template><ng-template [ngIf]="(nzStatus=='exception')||(nzStatus=='success')&&!(_hasFormat)"><i class="anticon" [ngClass]="{'anticon-check':nzStatus=='success','anticon-cross':nzStatus=='exception'}"></i></ng-template></span>
      </div>
    </div>
  `,
  providers          : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzProgressComponent),
      multi      : true
    }
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
  _trailPath = {};
  _circleStyle = {};
  _percent = 0;
  _hasFormat = false;
  _rawStatus = 'normal';
  _type = 'line';
  // ngModel Access
  onChange: (value: number) => void = () => null;
  onTouched: () => void = () => null;

  @Input() nzStrokeWidth = 8;
  @Input() nzWidth = 120;
  @Input() nzShowInfo = true;
  @Input() nzStatus = 'normal';

  @Input()
  set nzType(value: string) {
    this._type = value;
    this.nzStrokeWidth = (this._type === 'line' ? 8 : 6);
  }

  get nzType(): string {
    return this._type;
  }

  @Input('nzFormat')
  set _setFormat(value: (input: number) => string) {
    this._format = value;
    this._hasFormat = true;
  }

  _format = (percent: number) => percent + '%';

  get isDashboard(): boolean {
    return this.nzType === 'dashboard';
  }

  get isCircleOrDashboard(): boolean {
    return (this.nzType === 'circle') || (this.nzType === 'dashboard');
  }

  updateCircleStatus(): void {
    const circleSize = this.nzWidth;
    this._circleStyle = {
      'width.px'    : circleSize,
      'height.px'   : circleSize,
      'font-size.px': circleSize * 0.15 + 6,
    };
    const radius = 50 - this.nzStrokeWidth / 2;
    const len = Math.PI * 2 * radius;
    if (!this.isDashboard) {
      this._pathString = `M 50,50 m 0,-${radius}\n     a ${radius},${radius} 0 1 1 0,${radius * 2}\n     a ${radius},${radius} 0 1 1 0,-${radius * 2}`;
      this._pathStyle = {
        'stroke-dasharray' : `${this._percent / 100 * len}px ${len}px`,
        'stroke-dashoffset': `0px`,
        'transition'       : `stroke-dashoffset 0.3s ease 0s, stroke-dasharray 0.3s ease 0s, stroke 0.3s, stroke-width 0.06s ease 0.3s`
      };
      this._trailPath = {
        'stroke-dasharray' : `${len}px ${len}px`,
        'stroke-dashoffset': `0px`,
        'transition'       : 'stroke-dashoffset 0.3s ease 0s, stroke-dasharray 0.3s ease 0s, stroke 0.3s'
      };
    } else {
      this._pathString = `M 50,50 m 0,${radius}\n     a ${radius},${radius} 0 1 1 0,-${radius * 2}\n     a ${radius},${radius} 0 1 1 0,${radius * 2}`;
      this._pathStyle = {
        'stroke-dasharray' : `${this._percent / 100 * (len - 70)}px ${len}px`,
        'stroke-dashoffset': `-37.5px`,
        'transition'       : `stroke-dashoffset 0.3s ease 0s, stroke-dasharray 0.3s ease 0s, stroke 0.3s, stroke-width 0.06s ease 0.3s`
      };
      this._trailPath = {
        'stroke-dasharray' : `${len - 70}px ${len}px`,
        'stroke-dashoffset': `-37.5px`,
        'transition'       : 'stroke-dashoffset 0.3s ease 0s, stroke-dasharray 0.3s ease 0s, stroke 0.3s'
      };
    }

  }

  writeValue(value: number): void {
    this._percent = value;
    if (this._percent === 100) {
      this.nzStatus = 'success';
    } else {
      this.nzStatus = this._rawStatus;
    }
    if (this.isCircleOrDashboard) {
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
