/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';

import { isNotNil, InputNumber, NgStyleInterface } from 'ng-zorro-antd/core';

import { handleLinearGradient } from './nz-progress-utils';
import {
  NzProgressCirclePath,
  NzProgressColorGradient,
  NzProgressFormatter,
  NzProgressGapPositionType,
  NzProgressStatusType,
  NzProgressStrokeColorType,
  NzProgressStrokeLinecapType,
  NzProgressTypeType
} from './nz-progress.definitions';

let gradientIdSeed = 0;

const statusIconNameMap = new Map([['success', 'check'], ['exception', 'close']]);

const statusColorMap = new Map([['normal', '#108ee9'], ['exception', '#ff5500'], ['success', '#87d068']]);

const defaultFormatter: NzProgressFormatter = (p: number): string => `${p}%`;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-progress',
  exportAs: 'nzProgress',
  preserveWhitespaces: false,
  templateUrl: './nz-progress.component.html'
})
export class NzProgressComponent implements OnChanges {
  @Input() nzShowInfo = true;
  @Input() nzWidth = 132;
  @Input() nzSize: string;
  @Input() nzFormat?: NzProgressFormatter;
  @Input() @InputNumber() nzSuccessPercent?: number;
  @Input() @InputNumber() nzPercent: number = 0;
  @Input() @InputNumber() nzStrokeWidth: number;
  @Input() @InputNumber() nzGapDegree: number;
  @Input() nzStrokeColor: NzProgressStrokeColorType;
  @Input() nzStatus: NzProgressStatusType;
  @Input() nzType: NzProgressTypeType = 'line';
  @Input() nzGapPosition?: NzProgressGapPositionType;
  @Input() nzStrokeLinecap: NzProgressStrokeLinecapType = 'round';

  /** Gradient style when `nzType` is `line`. */
  lineGradient: string | null = null;

  /** If user uses gradient color. */
  isGradient = false;

  /**
   * Each progress whose `nzType` is circle or dashboard should have unique id to
   * define `<linearGradient>`.
   */
  gradientId = gradientIdSeed++;

  /** Paths to rendered in the template. */
  progressCirclePath: NzProgressCirclePath[] = [];

  trailPathStyle: NgStyleInterface;

  pathString: string;

  icon: string;

  trackByFn = (index: number) => `${index}`;

  get formatter(): NzProgressFormatter {
    return this.nzFormat || defaultFormatter;
  }

  get status(): NzProgressStatusType {
    return this.nzStatus || this.inferredStatus;
  }

  get strokeWidth(): number {
    return this.nzStrokeWidth || (this.nzType === 'line' && this.nzSize !== 'small' ? 8 : 6);
  }

  get isCircleStyle(): boolean {
    return this.nzType === 'circle' || this.nzType === 'dashboard';
  }

  private cachedStatus: NzProgressStatusType = 'normal';
  private inferredStatus: NzProgressStatusType = 'normal';

  ngOnChanges(changes: SimpleChanges): void {
    const {
      nzGapPosition,
      nzStrokeLinecap,
      nzStrokeColor,
      nzGapDegree,
      nzType,
      nzStatus,
      nzPercent,
      nzSuccessPercent
    } = changes;

    if (nzStatus) {
      this.cachedStatus = this.nzStatus || this.cachedStatus;
    }

    if (nzPercent || nzSuccessPercent) {
      const fillAll = parseInt(this.nzPercent.toString(), 10) >= 100;
      console.log(this.nzSuccessPercent);
      if (fillAll) {
        if ((isNotNil(this.nzSuccessPercent) && this.nzSuccessPercent! >= 100) || this.nzSuccessPercent === undefined) {
          this.inferredStatus = 'success';
        }
      } else {
        this.inferredStatus = this.cachedStatus;
      }
    }

    if (nzStatus || nzPercent || nzSuccessPercent) {
      this.updateIcon();
    }

    if (nzStrokeColor) {
      this.setStrokeColor();
    }

    if (this.isCircleStyle) {
      if (nzGapPosition || nzStrokeLinecap || nzGapDegree || nzType || nzPercent || nzStrokeColor) {
        this.getCirclePaths();
      }
    }
  }

  private updateIcon(): void {
    const ret = statusIconNameMap.get(this.status);
    this.icon = ret ? ret + (this.isCircleStyle ? '-o' : '-circle-fill') : '';
  }

  /**
   * Calculate paths when the type is circle or dashboard.
   */
  private getCirclePaths(): void {
    const values = isNotNil(this.nzSuccessPercent) ? [this.nzSuccessPercent!, this.nzPercent] : [this.nzPercent];

    // Calculate shared styles.
    const radius = 50 - this.strokeWidth / 2;
    const gapPosition = this.nzGapPosition || (this.nzType === 'circle' ? 'top' : 'bottom');
    const len = Math.PI * 2 * radius;
    const gapDegree = this.nzGapDegree || (this.nzType === 'circle' ? 0 : 75);

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

    this.trailPathStyle = {
      strokeDasharray: `${len - gapDegree}px ${len}px`,
      strokeDashoffset: `-${gapDegree / 2}px`,
      transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s'
    };

    // Calculate styles for each path.
    this.progressCirclePath = values
      .map((value, index) => {
        const isSuccessPercent = values.length === 2 && index === 0;
        return {
          stroke: this.isGradient && !isSuccessPercent ? `url(#gradient-${this.gradientId})` : null,
          strokePathStyle: {
            stroke: !this.isGradient
              ? isSuccessPercent
                ? statusColorMap.get('success')
                : (this.nzStrokeColor as string)
              : null,
            transition:
              'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s',
            strokeDasharray: `${((value || 0) / 100) * (len - gapDegree)}px ${len}px`,
            strokeDashoffset: `-${gapDegree / 2}px`
          }
        };
      })
      .reverse();
  }

  private setStrokeColor(): void {
    const color = this.nzStrokeColor;
    const isGradient = (this.isGradient = !!color && typeof color !== 'string');
    if (isGradient && !this.isCircleStyle) {
      this.lineGradient = handleLinearGradient(color as NzProgressColorGradient);
    } else {
      this.lineGradient = null;
    }
  }
}
