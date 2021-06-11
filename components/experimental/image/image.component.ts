/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { warn } from 'ng-zorro-antd/core/logger';
import { ImagePreloadService, PreloadDisposeHandle } from 'ng-zorro-antd/core/services';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { defaultImageSrcLoader } from './image-loader';
import { NzImageSrcLoader } from './typings';
import { isFixedSize } from './utils';

export const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'imageExperimental';
const sizeBreakpoints = [16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840];

@Component({
  selector: 'nz-image',
  exportAs: 'nzImage',
  template: `
    <img
      #imageRef
      nz-image
      [nzSrc]="src"
      [nzSrcset]="srcset"
      [nzDisablePreview]="nzDisablePreview"
      [nzFallback]="nzFallback"
      [nzPlaceholder]="nzPlaceholder"
      [attr.width]="width"
      [attr.height]="height"
      [attr.srcset]="srcset"
      [attr.alt]="nzAlt || null"
    />
  `,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NzImageViewComponent implements OnInit, OnChanges, OnDestroy {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;
  static ngAcceptInputType_nzAutoSrcset: BooleanInput;
  static ngAcceptInputType_nzPriority: BooleanInput;
  static ngAcceptInputType_nzDisablePreview: BooleanInput;

  @Input() nzSrc: string = '';
  @Input() nzAlt: string = '';
  @Input() nzWidth: string | number = 'auto';
  @Input() nzHeight: string | number = 'auto';
  @Input() @WithConfig() nzSrcLoader: NzImageSrcLoader = defaultImageSrcLoader;
  @Input() @InputBoolean() @WithConfig() nzAutoSrcset: boolean = false;
  @Input() @InputBoolean() nzPriority: boolean = false;
  @Input() @WithConfig() nzFallback: string | null = null;
  @Input() @WithConfig() nzPlaceholder: string | null = null;
  @Input() @InputBoolean() @WithConfig() nzDisablePreview: boolean = false;
  @ViewChild('imageRef') imageRef!: ElementRef<HTMLImageElement>;

  src = '';

  width: string | number = 'auto';
  height: string | number = 'auto';
  srcset = '';
  internalImage!: HTMLImageElement;

  private destroy$ = new Subject<void>();
  private reloadDisposeHandler: PreloadDisposeHandle = () => void 0;

  constructor(
    private cdr: ChangeDetectorRef,
    public nzConfigService: NzConfigService,
    private imagePreloadService: ImagePreloadService
  ) {
    this.nzConfigService
      .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.composeImageAttrs();
        this.cdr.markForCheck();
      });
  }

  ngOnInit(): void {
    if (this.nzPriority) {
      this.preload();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzLoader, nzSrc, nzOptimize } = changes;

    if (nzSrc || nzLoader || nzOptimize) {
      this.composeImageAttrs();
    }
  }

  ngOnDestroy(): void {
    this.reloadDisposeHandler();
    this.destroy$.next();
    this.destroy$.complete();
  }

  private preload(): void {
    this.reloadDisposeHandler = this.imagePreloadService.addPreload({
      src: this.src,
      srcset: this.srcset
    });
  }

  private optimizable(): boolean {
    if (this.nzAutoSrcset) {
      if (!isFixedSize(this.nzWidth) || !isFixedSize(this.nzHeight)) {
        warn(
          `When using "nzAutoSrcset" you should use a fixed size width and height, for more information please refer to CLS (https://web.dev/cls/) performance metrics`
        );
        return false;
      }
      if (this.nzSrc.endsWith('.svg')) {
        warn(`SVG does not need to be optimized`);
        return false;
      }
      if (this.nzSrc.startsWith('data:')) {
        warn(`Data URLs cannot be optimized`);
        return false;
      }
      return true;
    }
    return false;
  }

  private composeImageAttrs(): void {
    const loader = this.getLoader();
    if (!this.optimizable()) {
      this.src = loader({ src: this.nzSrc });
      this.width = this.nzWidth;
      this.height = this.nzHeight;
      return;
    }
    this.width = typeof this.nzWidth === 'number' ? this.nzWidth : parseInt(this.nzWidth, 10);
    this.height = typeof this.nzHeight === 'number' ? this.nzHeight : parseInt(this.nzHeight, 10);
    const widths = this.convertWidths(this.width, sizeBreakpoints);
    this.src = loader({ src: this.nzSrc, width: widths[0] });
    this.srcset = widths
      .map(
        (w, i) =>
          `${loader({
            src: this.nzSrc,
            width: w
          })} ${i + 1}x`
      )
      .join(', ');
  }

  private getLoader(): NzImageSrcLoader {
    return this.nzSrcLoader || defaultImageSrcLoader;
  }

  private convertWidths(width: number, optimizeSizes: number[]): number[] {
    const allSizes = [...optimizeSizes].sort((a, b) => a - b);
    return [
      ...new Set(
        // 2x scale is sufficient
        // https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices.html
        [width, width * 2].map(w => allSizes.find(p => p >= w) || w)
      )
    ];
  }
}
