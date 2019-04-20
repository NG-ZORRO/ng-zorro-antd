/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

import { isNotNil, InputNumber } from 'ng-zorro-antd/core';

export type NzProgressGapPositionType = 'top' | 'bottom' | 'left' | 'right';
export type NzProgressStatusType = 'success' | 'exception' | 'active' | 'normal';
export type NzProgressTypeType = 'line' | 'circle' | 'dashboard';
export type NzProgressStrokeLinecapType = 'round' | 'square';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-progress',
  exportAs: 'nzProgress',
  preserveWhitespaces: false,
  templateUrl: './nz-progress.component.html'
})
export class NzProgressComponent implements OnInit, OnChanges {
  @Input() nzShowInfo = true;
  @Input() nzWidth = 132;
  @Input() nzStrokeColor: string;
  @Input() nzSize: string;
  @Input() nzFormat?: (percent: number) => string;
  @Input() @InputNumber() nzSuccessPercent?: number;
  @Input() @InputNumber() nzPercent: number;
  @Input() @InputNumber() nzStrokeWidth: number;
  @Input() @InputNumber() nzGapDegree: number;
  @Input() nzStatus: NzProgressStatusType;
  @Input() nzType: NzProgressTypeType = 'line';
  @Input() nzGapPosition?: NzProgressGapPositionType;
  @Input() nzStrokeLinecap: NzProgressStrokeLinecapType = 'round';

  trailPathStyle: { [key: string]: string };
  strokePathStyle: { [key: string]: string };
  pathString: string;
  icon: string;
  statusColorMap: { [key: string]: string } = {
    normal: '#108ee9',
    exception: '#ff5500',
    success: '#87d068'
  };

  private cachedStatus: NzProgressStatusType = 'normal';
  private inferredStatus: NzProgressStatusType = 'normal';
  private inferredStrokeWidth: number = 8;
  private inferredGapPosition: string;
  private inferredGapDegree: number;

  get formatter(): (percent: number) => string {
    return this.nzFormat || ((p: number): string => `${p}%`);
  }

  get status(): NzProgressStatusType {
    return this.nzStatus || this.inferredStatus;
  }

  get strokeWidth(): number {
    return this.nzStrokeWidth || this.inferredStrokeWidth;
  }

  get isCircleStyle(): boolean {
    return this.nzType === 'circle' || this.nzType === 'dashboard';
  }

  ngOnInit(): void {
    this.updatePathStyles();
    this.updateIcon();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {
      nzGapPosition,
      nzStrokeLinecap,
      nzGapDegree,
      nzType,
      nzSize,
      nzStatus,
      nzPercent,
      nzSuccessPercent
    } = changes;

    if (nzGapPosition || nzStrokeLinecap || nzGapDegree || nzType || nzPercent) {
      this.updatePathStyles();
    }

    if (nzSize) {
      if (this.nzSize === 'small') {
        this.inferredStrokeWidth = 6;
      }
    }

    if (nzStatus) {
      this.cachedStatus = this.nzStatus || this.cachedStatus;
      this.updateIcon();
    }

    if (nzPercent || nzSuccessPercent) {
      const fillAll = parseInt(this.nzPercent.toString(), 10) >= 100;
      if (fillAll) {
        if ((isNotNil(this.nzSuccessPercent) && this.nzSuccessPercent! >= 100) || this.nzSuccessPercent === undefined) {
          this.inferredStatus = 'success';
        }
      } else {
        this.inferredStatus = this.cachedStatus;
      }
      this.updateIcon();
    }

    if (nzType) {
      if (this.nzType !== 'line') {
        this.inferredStrokeWidth = 6;
      }
      if (this.nzType === 'dashboard') {
        this.inferredGapPosition = 'bottom';
        this.inferredGapDegree = 75;
      }
      if (this.nzType === 'circle') {
        this.inferredGapDegree = 0;
      }
    }
  }

  updatePathStyles(): void {
    const radius = 50 - this.strokeWidth / 2;
    const gapPosition = this.nzGapPosition || this.inferredGapPosition;
    let beginPositionX = 0;
    let beginPositionY = -radius;
    let endPositionX = 0;
    let endPositionY = radius * -2;

    switch (gapPosition) {
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
    const gapDegree = this.nzGapDegree || this.inferredGapDegree;

    this.trailPathStyle = {
      strokeDasharray: `${len - gapDegree}px ${len}px`,
      strokeDashoffset: `-${gapDegree / 2}px`,
      transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s'
    };
    this.strokePathStyle = {
      strokeDasharray: `${(this.nzPercent / 100) * (len - gapDegree)}px ${len}px`,
      strokeDashoffset: `-${gapDegree / 2}px`,
      transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s' // eslint-disable-line
    };
  }

  updateIcon(): void {
    const isCircle = this.nzType === 'circle' || this.nzType === 'dashboard';
    const ret = this.status === 'success' ? 'check' : this.status === 'exception' ? 'close' : '';

    this.icon = ret ? ret + (isCircle ? '-o' : '-circle-fill') : '';
  }
}
