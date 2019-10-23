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
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

import { isNotNil, InputNumber, NgStyleInterface, NzConfigService, WithConfig } from 'ng-zorro-antd/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { handleCircleGradient, handleLinearGradient } from './nz-progress-utils';
import {
  NzProgressCirclePath,
  NzProgressColorGradient,
  NzProgressFormatter,
  NzProgressGapPositionType,
  NzProgressGradientProgress,
  NzProgressStatusType,
  NzProgressStrokeColorType,
  NzProgressStrokeLinecapType,
  NzProgressTypeType
} from './nz-progress.definitions';

let gradientIdSeed = 0;

const NZ_CONFIG_COMPONENT_NAME = 'progress';
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
export class NzProgressComponent implements OnChanges, OnInit, OnDestroy {
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, true) nzShowInfo: boolean;
  @Input() nzWidth = 132;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) nzStrokeColor: NzProgressStrokeColorType;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, 'default') nzSize: 'default' | 'small';
  @Input() nzFormat?: NzProgressFormatter;
  @Input() @InputNumber() nzSuccessPercent?: number;
  @Input() @InputNumber() nzPercent: number = 0;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) @InputNumber() nzStrokeWidth: number;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) @InputNumber() nzGapDegree: number;
  @Input() nzStatus: NzProgressStatusType;
  @Input() nzType: NzProgressTypeType = 'line';
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, 'top') nzGapPosition: NzProgressGapPositionType;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, 'round') nzStrokeLinecap: NzProgressStrokeLinecapType;

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

  circleGradient: Array<{ offset: string; color: string }>;

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
  private destroy$ = new Subject<void>();

  constructor(public nzConfigService: NzConfigService) {}

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

    if (nzGapPosition || nzStrokeLinecap || nzGapDegree || nzType || nzPercent || nzStrokeColor) {
      this.getCirclePaths();
    }
  }

  ngOnInit(): void {
    this.nzConfigService
      .getConfigChangeEventForComponent(NZ_CONFIG_COMPONENT_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateIcon();
        this.setStrokeColor();
        this.getCirclePaths();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateIcon(): void {
    const ret = statusIconNameMap.get(this.status);
    this.icon = ret ? ret + (this.isCircleStyle ? '-o' : '-circle-fill') : '';
  }

  /**
   * Calculate paths when the type is circle or dashboard.
   */
  private getCirclePaths(): void {
    if (!this.isCircleStyle) {
      return;
    }

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
    } else if (isGradient && this.isCircleStyle) {
      this.circleGradient = handleCircleGradient(this.nzStrokeColor as NzProgressGradientProgress);
    } else {
      this.lineGradient = null;
      this.circleGradient = [];
    }
  }
}
