/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
  numberAttribute,
  inject,
  DestroyRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { NzConfigKey, onConfigChangeEventForComponent, WithConfig } from 'ng-zorro-antd/core/config';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NgStyleInterface } from 'ng-zorro-antd/core/types';
import { isNotNil, numberAttributeWithZeroFallback } from 'ng-zorro-antd/core/util';
import { NzIconModule } from 'ng-zorro-antd/icon';

import {
  NzProgressCirclePath,
  NzProgressColorGradient,
  NzProgressFormatter,
  NzProgressGapPositionType,
  NzProgressGradientProgress,
  NzProgressStatusType,
  NzProgressStepItem,
  NzProgressStrokeColorType,
  NzProgressStrokeLinecapType,
  NzProgressTypeType
} from './typings';
import { handleCircleGradient, handleLinearGradient } from './utils';

let gradientIdSeed = 0;

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'progress';
const statusIconNameMap = new Map([
  ['success', 'check'],
  ['exception', 'close']
]);
const statusColorMap = new Map([
  ['normal', '#108ee9'],
  ['exception', '#ff5500'],
  ['success', '#87d068']
]);
const defaultFormatter: NzProgressFormatter = (p: number): string => `${p}%`;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-progress',
  exportAs: 'nzProgress',
  imports: [NzIconModule, NzOutletModule, NgTemplateOutlet],
  template: `
    <ng-template #progressInfoTemplate>
      @if (nzShowInfo) {
        <span class="ant-progress-text">
          @if ((status === 'exception' || status === 'success') && !nzFormat) {
            <nz-icon [nzType]="icon" />
          } @else {
            <ng-container *nzStringTemplateOutlet="formatter; context: { $implicit: nzPercent }; let formatter">
              {{ formatter(nzPercent) }}
            </ng-container>
          }
        </span>
      }
    </ng-template>

    <div
      [class]="'ant-progress ant-progress-status-' + status"
      [class.ant-progress-line]="nzType === 'line'"
      [class.ant-progress-small]="nzSize === 'small'"
      [class.ant-progress-default]="nzSize === 'default'"
      [class.ant-progress-show-info]="nzShowInfo"
      [class.ant-progress-circle]="isCircleStyle"
      [class.ant-progress-steps]="isSteps"
      [class.ant-progress-rtl]="dir === 'rtl'"
    >
      @if (nzType === 'line') {
        <div>
          <!-- normal line style -->
          @if (isSteps) {
            <div class="ant-progress-steps-outer">
              @for (step of steps; track $index) {
                <div class="ant-progress-steps-item" [style]="step"></div>
              }
              <ng-template [ngTemplateOutlet]="progressInfoTemplate" />
            </div>
          } @else {
            <div class="ant-progress-outer">
              <div class="ant-progress-inner">
                <div
                  class="ant-progress-bg"
                  [style.width.%]="nzPercent"
                  [style.border-radius]="nzStrokeLinecap === 'round' ? '100px' : '0'"
                  [style.background]="!isGradient ? nzStrokeColor : null"
                  [style.background-image]="isGradient ? lineGradient : null"
                  [style.height.px]="strokeWidth"
                ></div>
                @if (nzSuccessPercent || nzSuccessPercent === 0) {
                  <div
                    class="ant-progress-success-bg"
                    [style.width.%]="nzSuccessPercent"
                    [style.border-radius]="nzStrokeLinecap === 'round' ? '100px' : '0'"
                    [style.height.px]="strokeWidth"
                  ></div>
                }
              </div>
            </div>
            <ng-template [ngTemplateOutlet]="progressInfoTemplate" />
          }
        </div>
      }
      <!-- line progress -->

      <!-- circle / dashboard progress -->

      @if (isCircleStyle) {
        <div
          [style.width.px]="this.nzWidth"
          [style.height.px]="this.nzWidth"
          [style.fontSize.px]="this.nzWidth * 0.15 + 6"
          class="ant-progress-inner"
          [class.ant-progress-circle-gradient]="isGradient"
        >
          <svg class="ant-progress-circle " viewBox="0 0 100 100">
            @if (isGradient) {
              <defs>
                <linearGradient [id]="'gradient-' + gradientId" x1="100%" y1="0%" x2="0%" y2="0%">
                  @for (i of circleGradient; track $index) {
                    <stop [attr.offset]="i.offset" [attr.stop-color]="i.color" />
                  }
                </linearGradient>
              </defs>
            }

            <path
              class="ant-progress-circle-trail"
              stroke="#f3f3f3"
              fill-opacity="0"
              [attr.stroke-width]="strokeWidth"
              [attr.d]="pathString"
              [style]="trailPathStyle"
            />
            @for (p of progressCirclePath; track $index) {
              <path
                class="ant-progress-circle-path"
                fill-opacity="0"
                [attr.d]="pathString"
                [attr.stroke-linecap]="nzStrokeLinecap"
                [attr.stroke]="p.stroke"
                [attr.stroke-width]="nzPercent ? strokeWidth : 0"
                [style]="p.strokePathStyle"
              />
            }
          </svg>
          <ng-template [ngTemplateOutlet]="progressInfoTemplate" />
        </div>
      }
    </div>
  `
})
export class NzProgressComponent implements OnChanges, OnInit {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly directionality = inject(Directionality);
  private readonly destroyRef = inject(DestroyRef);

  @Input() @WithConfig() nzShowInfo: boolean = true;
  @Input() nzWidth = 132;
  @Input() @WithConfig() nzStrokeColor?: NzProgressStrokeColorType = undefined;
  @Input() @WithConfig() nzSize: 'default' | 'small' = 'default';
  @Input() nzFormat?: NzProgressFormatter;
  @Input({ transform: numberAttributeWithZeroFallback }) nzSuccessPercent?: number;
  @Input({ transform: numberAttribute }) nzPercent: number = 0;
  @Input({ transform: numberAttributeWithZeroFallback }) @WithConfig() nzStrokeWidth?: number;
  @Input({ transform: numberAttributeWithZeroFallback }) @WithConfig() nzGapDegree?: number;
  @Input() nzStatus?: NzProgressStatusType;
  @Input() nzType: NzProgressTypeType = 'line';
  @Input() @WithConfig() nzGapPosition: NzProgressGapPositionType = 'top';
  @Input() @WithConfig() nzStrokeLinecap: NzProgressStrokeLinecapType = 'round';

  @Input({ transform: numberAttribute }) nzSteps: number = 0;

  steps: NzProgressStepItem[] = [];

  /** Gradient style when `nzType` is `line`. */
  lineGradient: string | null = null;

  /** If user uses gradient color. */
  isGradient = false;

  /** If the linear progress is a step progress. */
  isSteps = false;

  /**
   * Each progress whose `nzType` is circle or dashboard should have unique id to
   * define `<linearGradient>`.
   */
  gradientId = gradientIdSeed++;

  /** Paths to rendered in the template. */
  progressCirclePath: NzProgressCirclePath[] = [];
  circleGradient?: Array<{ offset: string; color: string }>;
  trailPathStyle: NgStyleInterface | null = null;
  pathString?: string;
  icon!: string;

  dir: Direction = 'ltr';

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

  constructor() {
    onConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME, () => {
      this.updateIcon();
      this.setStrokeColor();
      this.getCirclePaths();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {
      nzSteps,
      nzGapPosition,
      nzStrokeLinecap,
      nzStrokeColor,
      nzGapDegree,
      nzType,
      nzStatus,
      nzPercent,
      nzSuccessPercent,
      nzStrokeWidth
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

    if (nzStatus || nzPercent || nzSuccessPercent || nzStrokeColor) {
      this.updateIcon();
    }

    if (nzStrokeColor) {
      this.setStrokeColor();
    }

    if (nzGapPosition || nzStrokeLinecap || nzGapDegree || nzType || nzPercent || nzStrokeColor || nzStrokeColor) {
      this.getCirclePaths();
    }

    if (nzPercent || nzSteps || nzStrokeWidth) {
      this.isSteps = this.nzSteps > 0;
      if (this.isSteps) {
        this.getSteps();
      }
    }
  }

  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(direction => {
      this.dir = direction;
      this.cdr.detectChanges();
    });
    this.dir = this.directionality.value;
  }

  private updateIcon(): void {
    const ret = statusIconNameMap.get(this.status);
    this.icon = ret ? ret + (this.isCircleStyle ? '-o' : '-circle-fill') : '';
  }

  /**
   * Calculate step render configs.
   */
  private getSteps(): void {
    const current = Math.floor(this.nzSteps * (this.nzPercent / 100));
    const stepWidth = this.nzSize === 'small' ? 2 : 14;

    const steps = [];

    for (let i = 0; i < this.nzSteps; i++) {
      let color;
      if (i <= current - 1) {
        color = this.nzStrokeColor;
      }
      const stepStyle = {
        backgroundColor: `${color}`,
        width: `${stepWidth}px`,
        height: `${this.strokeWidth}px`
      };
      steps.push(stepStyle);
    }

    this.steps = steps;
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
