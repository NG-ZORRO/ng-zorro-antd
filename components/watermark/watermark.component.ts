/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { isPlatformServer } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  DOCUMENT,
  ElementRef,
  inject,
  Input,
  numberAttribute,
  OnChanges,
  OnInit,
  PLATFORM_ID,
  SimpleChanges
} from '@angular/core';

import { FontType, MarkStyleType } from './typings';
import { getPixelRatio, getStyleStr, reRendering, rotateWatermark } from './util';

/**
 * Base size of the canvas, 1 for parallel layout and 2 for alternate layout
 * Only alternate layout is currently supported
 */
const BaseSize = 2;
const FontGap = 3;

@Component({
  selector: 'nz-watermark',
  exportAs: 'nzWatermark',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
  styles: `
    :host {
      position: relative;
      display: block;
      overflow: hidden;
    }
  `
})
export class NzWatermarkComponent implements OnInit, OnChanges {
  private isServer = isPlatformServer(inject(PLATFORM_ID));
  private document = inject(DOCUMENT);
  private el: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  @Input({ transform: numberAttribute }) nzWidth: number = 120;
  @Input({ transform: numberAttribute }) nzHeight: number = 64;
  @Input({ transform: numberAttribute }) nzRotate: number = -22;
  @Input({ transform: numberAttribute }) nzZIndex: number = 9;
  @Input() nzImage: string = '';
  @Input() nzContent: string | string[] = '';
  @Input() nzFont: FontType = {};
  @Input() nzGap: [number, number] = [100, 100];
  @Input() nzOffset: [number, number] = [this.nzGap[0] / 2, this.nzGap[1] / 2];

  watermarkElement: HTMLDivElement = this.document.createElement('div');
  stopObservation: boolean = false;
  private observer: MutationObserver | null = null;

  constructor() {
    if (this.isServer) {
      return;
    }

    const observer = (this.observer = new MutationObserver(mutations => {
      if (this.stopObservation) {
        return;
      }
      mutations.forEach(mutation => {
        if (reRendering(mutation, this.watermarkElement)) {
          this.destroyWatermark();
          this.renderWatermark();
        }
      });
    }));

    afterNextRender(() => this.renderWatermark());

    inject(DestroyRef).onDestroy(() => observer.disconnect());
  }

  ngOnInit(): void {
    this.observer?.observe(this.el, {
      subtree: true,
      childList: true,
      attributeFilter: ['style', 'class']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzRotate, nzZIndex, nzWidth, nzHeight, nzImage, nzContent, nzFont, gapX, gapY, offsetLeft, offsetTop } =
      changes;

    if (
      nzRotate ||
      nzZIndex ||
      nzWidth ||
      nzHeight ||
      nzImage ||
      nzContent ||
      nzFont ||
      gapX ||
      gapY ||
      offsetLeft ||
      offsetTop
    ) {
      this.renderWatermark();
    }
  }

  getFont(): void {
    const font: FontType = {
      color: 'rgba(0,0,0,.15)',
      fontSize: 16,
      fontWeight: 'normal',
      fontFamily: 'sans-serif',
      fontStyle: 'normal'
    };

    this.nzFont = { ...font, ...this.nzFont };
    this.cdr.markForCheck();
  }

  getMarkStyle(): MarkStyleType {
    const markStyle: MarkStyleType = {
      zIndex: this.nzZIndex,
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      backgroundRepeat: 'repeat',
      visibility: 'visible'
    };

    /** Calculate the style of the nzOffset */
    let positionLeft = (this.nzOffset?.[0] ?? this.nzGap[0] / 2) - this.nzGap[0] / 2;
    let positionTop = (this.nzOffset?.[1] ?? this.nzGap[1] / 2) - this.nzGap[1] / 2;
    if (positionLeft > 0) {
      markStyle.left = `${positionLeft}px`;
      markStyle.width = `calc(100% - ${positionLeft}px)`;
      positionLeft = 0;
    }
    if (positionTop > 0) {
      markStyle.top = `${positionTop}px`;
      markStyle.height = `calc(100% - ${positionTop}px)`;
      positionTop = 0;
    }
    markStyle.backgroundPosition = `${positionLeft}px ${positionTop}px`;

    return markStyle;
  }

  destroyWatermark(): void {
    if (this.watermarkElement) {
      this.watermarkElement.remove();
    }
  }

  appendWatermark(base64Url: string, markWidth: number): void {
    this.stopObservation = true;
    this.watermarkElement.setAttribute(
      'style',
      getStyleStr({
        ...this.getMarkStyle(),
        backgroundImage: `url('${base64Url}')`,
        backgroundSize: `${(this.nzGap[0] + markWidth) * BaseSize}px`
      })
    );
    this.el.append(this.watermarkElement);
    this.cdr.markForCheck();

    // Delayed execution
    setTimeout(() => {
      this.stopObservation = false;
      this.cdr.markForCheck();
    });
  }

  getMarkSize(ctx: CanvasRenderingContext2D): [number, number] {
    let defaultWidth = 120;
    let defaultHeight = 64;
    if (!this.nzImage && ctx.measureText) {
      ctx.font = `${Number(this.nzFont.fontSize)}px ${this.nzFont.fontFamily}`;
      const contents = Array.isArray(this.nzContent) ? this.nzContent : [this.nzContent];
      const widths = contents.map(item => ctx.measureText(item!).width);
      defaultWidth = Math.ceil(Math.max(...widths));
      defaultHeight = Number(this.nzFont.fontSize) * contents.length + (contents.length - 1) * FontGap;
    }
    return [this.nzWidth ?? defaultWidth, this.nzHeight ?? defaultHeight];
  }

  fillTexts(ctx: CanvasRenderingContext2D, drawX: number, drawY: number, drawWidth: number, drawHeight: number): void {
    const ratio = getPixelRatio();
    const mergedFontSize = Number(this.nzFont.fontSize) * ratio;
    ctx.font = `${this.nzFont.fontStyle} normal ${this.nzFont.fontWeight} ${mergedFontSize}px/${drawHeight}px ${this.nzFont.fontFamily}`;
    if (this.nzFont.color) ctx.fillStyle = this.nzFont.color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.translate(drawWidth / 2, 0);
    const contents = Array.isArray(this.nzContent) ? this.nzContent : [this.nzContent];
    contents?.forEach((item, index) => {
      ctx.fillText(item ?? '', drawX, drawY + index * (mergedFontSize + FontGap * ratio));
    });
  }

  drawText(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    drawX: number,
    drawY: number,
    drawWidth: number,
    drawHeight: number,
    alternateRotateX: number,
    alternateRotateY: number,
    alternateDrawX: number,
    alternateDrawY: number,
    markWidth: number
  ): void {
    this.fillTexts(ctx, drawX, drawY, drawWidth, drawHeight);

    /** Fill the interleaved text after rotation */
    ctx.restore();
    rotateWatermark(ctx, alternateRotateX, alternateRotateY, this.nzRotate);
    this.fillTexts(ctx, alternateDrawX, alternateDrawY, drawWidth, drawHeight);
    this.appendWatermark(canvas.toDataURL(), markWidth);
  }

  renderWatermark(): void {
    if (this.isServer) {
      return;
    }

    if (!this.nzContent && !this.nzImage) {
      return;
    }
    const canvas: HTMLCanvasElement = this.document.createElement('canvas');
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    if (ctx) {
      if (!this.watermarkElement) {
        this.watermarkElement = this.document.createElement('div');
      }
      this.getFont();
      const ratio = getPixelRatio();
      const [markWidth, markHeight] = this.getMarkSize(ctx);
      const canvasWidth = (this.nzGap[0] + markWidth) * ratio;
      const canvasHeight = (this.nzGap[1] + markHeight) * ratio;
      canvas.setAttribute('width', `${canvasWidth * BaseSize}px`);
      canvas.setAttribute('height', `${canvasHeight * BaseSize}px`);

      const drawX = (this.nzGap[0] * ratio) / 2;
      const drawY = (this.nzGap[1] * ratio) / 2;
      const drawWidth = markWidth * ratio;
      const drawHeight = markHeight * ratio;
      const rotateX = (drawWidth + this.nzGap[0] * ratio) / 2;
      const rotateY = (drawHeight + this.nzGap[1] * ratio) / 2;

      /** Alternate drawing parameters */
      const alternateDrawX = drawX + canvasWidth;
      const alternateDrawY = drawY + canvasHeight;
      const alternateRotateX = rotateX + canvasWidth;
      const alternateRotateY = rotateY + canvasHeight;

      ctx.save();
      rotateWatermark(ctx, rotateX, rotateY, this.nzRotate);

      if (this.nzImage) {
        const img = new Image();

        const onLoad = (): void => {
          cleanup();

          ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

          /** Draw interleaved pictures after rotation */
          ctx.restore();
          rotateWatermark(ctx, alternateRotateX, alternateRotateY, this.nzRotate);
          ctx.drawImage(img, alternateDrawX, alternateDrawY, drawWidth, drawHeight);
          this.appendWatermark(canvas.toDataURL(), markWidth);
        };

        const onError = (): void => {
          cleanup();

          this.drawText(
            canvas,
            ctx,
            drawX,
            drawY,
            drawWidth,
            drawHeight,
            alternateRotateX,
            alternateRotateY,
            alternateDrawX,
            alternateDrawY,
            markWidth
          );
        };

        const cleanup = (): void => {
          img.removeEventListener('load', onLoad);
          img.removeEventListener('error', onError);
        };

        img.addEventListener('load', onLoad);
        img.addEventListener('error', onError);

        img.crossOrigin = 'anonymous';
        img.referrerPolicy = 'no-referrer';
        img.src = this.nzImage;
      } else {
        this.drawText(
          canvas,
          ctx,
          drawX,
          drawY,
          drawWidth,
          drawHeight,
          alternateRotateX,
          alternateRotateY,
          alternateDrawX,
          alternateDrawY,
          markWidth
        );
      }
    }
  }
}
