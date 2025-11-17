/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { AfterViewInit, ChangeDetectionStrategy, Component, effect, ElementRef, input, ViewChild } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { CrossOrigin, Excavation, Modules } from './typing';
import { DEFAULT_BACKGROUND_COLOR, DEFAULT_FRONT_COLOR, excavateModules, generatePath, isSupportPath2d } from './utils';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nz-qrcode-canvas',
  exportAs: 'nzQRCodeCanvas',
  template: `
    <canvas role="img" #canvas></canvas>
    @if (icon()) {
      <img style="display:none;" #image alt="QR-Code" [attr.src]="this.icon()" crossorigin="anonymous" />
    }
  `,
  styles: `
    :host {
      display: block;
      line-height: 0;
    }
  `,
  imports: [NzSpinModule, NzButtonModule, NzIconModule]
})
export class NzQrcodeCanvasComponent implements AfterViewInit {
  @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('image', { static: false }) image!: ElementRef<HTMLImageElement>;
  readonly icon = input<string>('');
  readonly margin = input<number>(0);
  readonly cells = input<Modules>([]);
  readonly numCells = input<number>(0);
  readonly calculatedImageSettings = input<{
    x: number;
    y: number;
    h: number;
    w: number;
    excavation: Excavation | null;
    opacity: number;
    crossOrigin: CrossOrigin;
  } | null>(null);
  readonly size = input<number>(160);
  readonly color = input<string>(DEFAULT_FRONT_COLOR);
  readonly bgColor = input<string>(DEFAULT_BACKGROUND_COLOR);

  constructor() {
    effect(() => {
      this.icon();
      this.margin();
      this.cells();
      this.numCells();
      this.calculatedImageSettings();
      this.size();
      this.color();
      this.bgColor();
      if (!this.canvas?.nativeElement) {
        return;
      }

      this.render();
    });
  }

  ngAfterViewInit(): void {
    this.render();
  }

  private render(): void {
    const ctx = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) {
      return;
    }

    this.setupCanvas(ctx);
    this.drawQRCode(ctx);
    this.handleImageLoading(ctx);
  }

  private setupCanvas(ctx: CanvasRenderingContext2D): void {
    const pixelRatio = window.devicePixelRatio || 1;
    this.canvas.nativeElement.height = this.canvas.nativeElement.width = this.size() * pixelRatio;
    this.canvas.nativeElement.style.width = this.canvas.nativeElement.style.height = `${this.size()}px`;

    const scale = (this.size() / this.numCells()) * pixelRatio;
    ctx.scale(scale, scale);

    ctx.fillStyle = this.bgColor();
    ctx.fillRect(0, 0, this.numCells(), this.numCells());
    ctx.fillStyle = this.color();
  }

  private drawQRCode(ctx: CanvasRenderingContext2D): void {
    const cellsToDraw = this.getCellsToDraw();
    const haveImageToRender = this.haveImageToRender();

    if (!haveImageToRender) {
      this.renderQRCode(ctx, cellsToDraw);
    }
  }

  private getCellsToDraw(): Modules {
    let cellsToDraw = this.cells();
    const imageSettings = this.calculatedImageSettings();
    if (this.haveImageToRender() && imageSettings && imageSettings.excavation) {
      cellsToDraw = excavateModules(this.cells(), imageSettings.excavation);
    }
    return cellsToDraw;
  }

  private haveImageToRender(): boolean {
    return this.calculatedImageSettings != null && !!this.image;
  }

  private renderQRCode(ctx: CanvasRenderingContext2D, cells: Modules): void {
    if (isSupportPath2d) {
      ctx.fill(new Path2D(generatePath(cells, this.margin())));
    } else {
      cells.forEach((row, rdx) => {
        row.forEach((cell, cdx) => {
          if (cell) {
            ctx.fillRect(cdx + this.margin(), rdx + this.margin(), 1, 1);
          }
        });
      });
    }
  }

  private handleImageLoading(ctx: CanvasRenderingContext2D): void {
    if (!this.haveImageToRender()) {
      return;
    }

    const onLoad = (): void => {
      this.cleanupImageListeners(onLoad, onError);
      this.onImageLoadSuccess(ctx);
    };

    const onError = (): void => {
      this.cleanupImageListeners(onLoad, onError);
      this.onImageLoadError(ctx);
    };

    this.image.nativeElement.addEventListener('load', onLoad);
    this.image.nativeElement.addEventListener('error', onError);
  }

  private onImageLoadSuccess(ctx: CanvasRenderingContext2D): void {
    const cellsToDraw = this.getCellsToDraw();
    this.renderQRCode(ctx, cellsToDraw);

    const imageSettings = this.calculatedImageSettings();
    if (imageSettings) {
      ctx.globalAlpha = imageSettings.opacity;
      ctx.drawImage(
        this.image.nativeElement,
        imageSettings.x + this.margin(),
        imageSettings.y + this.margin(),
        imageSettings.w,
        imageSettings.h
      );
    }
  }

  private onImageLoadError(ctx: CanvasRenderingContext2D): void {
    const cellsToDraw = this.getCellsToDraw();
    this.renderQRCode(ctx, cellsToDraw);
  }

  private cleanupImageListeners(onLoad: () => void, onError: () => void): void {
    if (this.image?.nativeElement) {
      this.image.nativeElement.removeEventListener('load', onLoad);
      this.image.nativeElement.removeEventListener('error', onError);
    }
  }
}
