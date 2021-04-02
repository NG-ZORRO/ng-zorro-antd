/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DOCUMENT, isPlatformServer } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { BooleanInput, NzSafeAny } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { defaultLoader, NzImageLoader } from './image-loader';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'image';

@Component({
  selector: 'nz-image',
  exportAs: 'nzImg',
  template: `
    <img [attr.src]="src" [attr.width]="width" [attr.height]="height" [attr.srcset]="srcSet" [attr.sizes]="sizes" [attr.alt]="nzAlt" />
  `,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NzImageComponent implements OnInit, OnChanges, OnDestroy {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;
  static ngAcceptInputType_nzOptimize: BooleanInput;
  static ngAcceptInputType_nzPreload: BooleanInput;

  @Input() nzSrc: string = '';
  @Input() nzAlt: string = '';
  @Input() nzWidth: string | number = 'auto';
  @Input() nzHeight: string | number = 'auto';
  @Input() @WithConfig() nzLoader: NzImageLoader = defaultLoader;
  @Input() @InputBoolean() @WithConfig() nzOptimize: boolean = false;
  @Input() @InputBoolean() @WithConfig() nzPreload: boolean = false;
  @Input() @WithConfig() nzOptimizeSizes: number[] = [16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840];

  get width(): number {
    return typeof this.nzWidth === 'number' ? this.nzWidth : parseInt(this.nzWidth, 10);
  }

  get height(): number {
    return typeof this.nzHeight === 'number' ? this.nzHeight : parseInt(this.nzHeight, 10);
  }

  src = '';
  sizes = '';
  srcSet = '';

  private destroy$ = new Subject<void>();

  constructor(
    private render: Renderer2,
    private cdr: ChangeDetectorRef,
    public nzConfigService: NzConfigService,
    @Inject(PLATFORM_ID) private platformId: NzSafeAny,
    @Inject(DOCUMENT) private document: NzSafeAny
  ) {
    this.nzConfigService
      .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }

  ngOnInit(): void {
    if (this.nzPreload) {
      this.preload();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzLoader, nzSrc, nzOptimized } = changes;
    if (nzLoader || nzSrc || nzOptimized) {
      this.genSrc();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private preload(): void {
    if (isPlatformServer(this.platformId)) {
      const linkNode = this.render.createElement('link') as HTMLLinkElement;
      linkNode.rel = 'preload';
      linkNode.as = 'image';
      linkNode.imageSizes = this.sizes;
      linkNode.imageSrcset = this.srcSet;
      linkNode.href = this.src;
      const headNode = this.document.getElementsByTagName('head')[0] as HTMLHeadElement;
      this.render.appendChild(headNode, linkNode);
    }
  }

  private genSrc(): void {
    if (!this.nzOptimize) {
      this.src = this.nzSrc;
      return;
    }
    const widths = this.convertWidths(this.width, this.nzOptimizeSizes);
    this.src = this.nzLoader({ src: this.nzSrc, width: widths[widths.length - 1] });
    this.sizes = '';
    this.srcSet = widths
      .map(
        (w, i) =>
          `${this.nzLoader({
            src: this.nzSrc,
            width: w
          })} ${i + 1}x`
      )
      .join(', ');
  }

  private convertWidths(width: number, optimizeSizes: number[]): number[] {
    const allSizes = [...optimizeSizes].sort((a, b) => a - b);
    return [
      ...new Set(
        // 2x scale is sufficient
        // https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices.html
        [width, width * 2].map(w => allSizes.find(p => p >= w) || allSizes[allSizes.length - 1])
      )
    ];
  }
}
