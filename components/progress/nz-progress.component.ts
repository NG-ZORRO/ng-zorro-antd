import {
  Component,
  Input,
  OnInit
} from '@angular/core';

export type NzProgressGapPositionType = 'top' | 'bottom' | 'left' | 'right';
export type NzProgressStatusType = 'success' | 'exception' | 'active' | 'normal';
export type NzProgressTypeType = 'line' | 'circle' | 'dashboard';
import { isNotNil } from '../core/util/check';

@Component({
  selector           : 'nz-progress',
  preserveWhitespaces: false,
  template           : `
    <ng-template #progressInfoTemplate>
      <span class="ant-progress-text" *ngIf="nzShowInfo">
        <ng-container *ngIf="(nzStatus=='exception')||(nzStatus=='success')&&(!isFormatSet); else formatTemplate">
          <i class="anticon" [ngClass]="iconClassMap"></i>
        </ng-container>
        <ng-template #formatTemplate>
          {{ nzFormat(nzPercent) }}
        </ng-template>
      </span>
    </ng-template>
    <div [ngClass]="'ant-progress ant-progress-status-'+nzStatus"
      [class.ant-progress-line]="nzType=='line'"
      [class.ant-progress-small]="nzSize=='small'"
      [class.ant-progress-show-info]="nzShowInfo"
      [class.ant-progress-circle]="isCirCleStyle">
      <div *ngIf="nzType=='line'">
        <div class="ant-progress-outer">
          <div class="ant-progress-inner">
            <div class="ant-progress-bg" [style.width.%]="nzPercent" [style.height.px]="nzStrokeWidth"></div>
            <div class="ant-progress-success-bg" [style.width.%]="nzSuccessPercent" [style.height.px]="nzStrokeWidth"></div>
          </div>
        </div>
        <ng-template [ngTemplateOutlet]="progressInfoTemplate"></ng-template>
      </div>
      <div
        [style.width.px]="this.nzWidth"
        [style.height.px]="this.nzWidth"
        [style.fontSize.px]="this.nzWidth*0.15+6"
        class="ant-progress-inner"
        *ngIf="isCirCleStyle">
        <svg class="ant-progress-circle " viewBox="0 0 100 100">
          <path
            class="ant-progress-circle-trail"
            stroke="#f3f3f3"
            fill-opacity="0"
            [attr.stroke-width]="nzStrokeWidth"
            [ngStyle]="trailPathStyle"
            [attr.d]="pathString">
          </path>
          <path
            class="ant-progress-circle-path"
            [attr.d]="pathString"
            stroke-linecap="round"
            fill-opacity="0"
            [attr.stroke]="statusColorMap[nzStatus]"
            [attr.stroke-width]="nzPercent?nzStrokeWidth:0"
            [ngStyle]="strokePathStyle">
          </path>
        </svg>
        <ng-template [ngTemplateOutlet]="progressInfoTemplate"></ng-template>
      </div>
    </div>
  `
})
export class NzProgressComponent implements OnInit {
  private _gapDegree = 0;
  private _gapPosition: NzProgressGapPositionType = 'top';
  private _percent = 0;
  private _status: NzProgressStatusType = 'normal';
  private _cacheStatus: NzProgressStatusType = 'normal';
  private _strokeWidth = 8;
  private _size = 'default';
  private _type: NzProgressTypeType = 'line';
  private _format = (percent: number): string => `${percent}%`;
  trailPathStyle: { [key: string]: string };
  strokePathStyle: { [key: string]: string };
  pathString: string;
  iconClassMap;
  isStatusSet = false;
  isStrokeWidthSet = false;
  isFormatSet = false;
  isGapDegreeSet = false;
  isGapPositionSet = false;
  statusColorMap = {
    normal   : '#108ee9',
    exception: '#ff5500',
    success  : '#87d068'
  };
  @Input() nzShowInfo = true;
  @Input() nzWidth = 132;
  @Input() nzSuccessPercent = 0;

  @Input()
  set nzSize(value: string) {
    this._size = value;
    if (this.nzSize === 'small' && !this.isStrokeWidthSet) {
      this._strokeWidth = 6;
    }
  }

  get nzSize(): string {
    return this._size;
  }

  @Input()
  set nzFormat(value: (percent: number) => string) {
    if (isNotNil(value)) {
      this._format = value;
      this.isFormatSet = true;
    }
  }

  get nzFormat(): (percent: number) => string {
    return this._format;
  }

  @Input()
  set nzPercent(value: number) {
    this._percent = value;
    if (isNotNil(value)) {
      const fillAll = parseInt(value.toString(), 10) >= 100;
      if (fillAll && !this.isStatusSet) {
        this._status = 'success';
      } else {
        this._status = this._cacheStatus;
      }
      this.updatePathStyles();
      this.updateIconClassMap();
    }
  }

  get nzPercent(): number {
    return this._percent;
  }

  @Input()
  set nzStrokeWidth(value: number) {
    if (isNotNil(value)) {
      this._strokeWidth = value;
      this.isStrokeWidthSet = true;
      this.updatePathStyles();
    }
  }

  get nzStrokeWidth(): number {
    return this._strokeWidth;
  }

  @Input()
  set nzStatus(value: NzProgressStatusType) {
    if (isNotNil(value)) {
      this._status = value;
      this._cacheStatus = value;
      this.isStatusSet = true;
      this.updateIconClassMap();
    }
  }

  get nzStatus(): NzProgressStatusType {
    return this._status;
  }

  @Input()
  set nzType(value: NzProgressTypeType) {
    this._type = value;
    if (!this.isStrokeWidthSet) {
      if (this.nzType !== 'line') {
        this._strokeWidth = 6;
      }
    }
    if (this.nzType === 'dashboard') {
      if (!this.isGapPositionSet) {
        this._gapPosition = 'bottom';
      }
      if (!this.isGapDegreeSet) {
        this._gapDegree = 75;
      }
    }
    this.updateIconClassMap();
    this.updatePathStyles();
  }

  get nzType(): NzProgressTypeType {
    return this._type;
  }

  @Input()
  set nzGapDegree(value: number) {
    if (isNotNil(value)) {
      this._gapDegree = value;
      this.isGapDegreeSet = true;
      this.updatePathStyles();
    }

  }

  get nzGapDegree(): number {
    return this._gapDegree;
  }

  @Input()
  set nzGapPosition(value: NzProgressGapPositionType) {
    if (isNotNil(value)) {
      this._gapPosition = value;
      this.isGapPositionSet = true;
      this.updatePathStyles();
    }
  }

  get nzGapPosition(): NzProgressGapPositionType {
    return this._gapPosition;
  }

  get isCirCleStyle(): boolean {
    return this.nzType === 'circle' || this.nzType === 'dashboard';
  }

  updatePathStyles(): void {
    const radius = 50 - (this.nzStrokeWidth / 2);
    let beginPositionX = 0;
    let beginPositionY = -radius;
    let endPositionX = 0;
    let endPositionY = radius * -2;
    switch (this.nzGapPosition) {
      case 'left':
        beginPositionX = -radius;
        beginPositionY = 0;
        endPositionX = radius * 2;
        endPositionY = 0;
        break;
      case 'right':
        beginPositionX = radius;
        beginPositionY = 0;
        endPositionX = radius * -2;
        endPositionY = 0;
        break;
      case 'bottom':
        beginPositionY = radius;
        endPositionY = radius * 2;
        break;
      default:
    }
    this.pathString = `M 50,50 m ${beginPositionX},${beginPositionY}
     a ${radius},${radius} 0 1 1 ${endPositionX},${-endPositionY}
     a ${radius},${radius} 0 1 1 ${-endPositionX},${endPositionY}`;
    const len = Math.PI * 2 * radius;
    this.trailPathStyle = {
      strokeDasharray : `${len - this.nzGapDegree}px ${len}px`,
      strokeDashoffset: `-${this.nzGapDegree / 2}px`,
      transition      : 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s'
    };
    this.strokePathStyle = {
      strokeDasharray : `${(this.nzPercent / 100) * (len - this.nzGapDegree)}px ${len}px`,
      strokeDashoffset: `-${this.nzGapDegree / 2}px`,
      transition      : 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s' // eslint-disable-line
    };
  }

  updateIconClassMap(): void {
    const isCircle = (this.nzType === 'circle' || this.nzType === 'dashboard');
    this.iconClassMap = {
      'anticon-check'       : (this.nzStatus === 'success') && isCircle,
      'anticon-cross'       : (this.nzStatus === 'exception') && isCircle,
      'anticon-check-circle': (this.nzStatus === 'success') && !isCircle,
      'anticon-cross-circle': (this.nzStatus === 'exception') && !isCircle
    };
  }

  ngOnInit(): void {
    this.updatePathStyles();
    this.updateIconClassMap();
  }

}
