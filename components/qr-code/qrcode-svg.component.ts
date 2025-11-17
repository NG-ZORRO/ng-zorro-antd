/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';

import { CrossOrigin, Excavation, ImageSettings, Modules } from './typing';
import { DEFAULT_BACKGROUND_COLOR, DEFAULT_FRONT_COLOR, excavateModules, generatePath } from './utils';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nz-qrcode-svg',
  exportAs: 'nzQRCodeSVG',
  template: `
    <svg [attr.height]="size()" [attr.width]="size()" [attr.viewBox]="viewBox" role="img">
      <path [attr.fill]="bgColor()" [attr.d]="backgroundPath" shapeRendering="crispEdges" />
      <path [attr.fill]="color()" [attr.d]="foregroundPath" shapeRendering="crispEdges" />
      @if (shouldShowIcon()) {
        <image
          [attr.href]="imageSettings()?.src"
          [attr.height]="calculatedImageSettings()?.h"
          [attr.width]="calculatedImageSettings()?.w"
          [attr.x]="getImageX()"
          [attr.y]="getImageY()"
          preserveAspectRatio="none"
          [attr.opacity]="calculatedImageSettings()?.opacity"
          [attr.crossOrigin]="calculatedImageSettings()?.crossOrigin"
        />
      }
    </svg>
  `,
  styles: `
    :host {
      display: block;
      line-height: 0;
    }
  `
})
export class NzQrcodeSvgComponent {
  readonly icon = input<string>('');
  readonly color = input<string>(DEFAULT_FRONT_COLOR);
  readonly bgColor = input<string>(DEFAULT_BACKGROUND_COLOR);
  readonly imageSettings = input<ImageSettings>();
  readonly size = input<number>(160);
  readonly margin = input<number>(0);
  readonly calculatedImageSettings = input<{
    x: number;
    y: number;
    h: number;
    w: number;
    excavation: Excavation | null;
    opacity: number;
    crossOrigin: CrossOrigin;
  } | null>(null);
  readonly cells = input<Modules>([]);
  readonly numCells = input<number>(0);

  viewBox: string = '';
  backgroundPath: string = '';
  foregroundPath: string = '';

  constructor() {
    effect(() => {
      this.initializeViewBox();
      this.generatePaths();
    });
  }

  private initializeViewBox(): void {
    this.viewBox = `0 0 ${this.numCells()} ${this.numCells()}`;
    this.backgroundPath = `M0,0 h${this.numCells()}v${this.numCells()}H0z`;
  }

  private generatePaths(): void {
    const cellsToDraw = this.getCellsToDraw();
    this.foregroundPath = generatePath(cellsToDraw, this.margin());
  }

  private getCellsToDraw(): Modules {
    if (this.shouldExcavateCells()) {
      return excavateModules(this.cells(), this.calculatedImageSettings()!.excavation!);
    }
    return this.cells();
  }

  private shouldExcavateCells(): boolean {
    const settings = this.calculatedImageSettings();
    return settings !== null && !!this.icon() && settings.excavation !== null;
  }

  protected shouldShowIcon(): boolean {
    return !!this.icon() && this.calculatedImageSettings() != null;
  }

  protected getImageX(): number {
    return (this.calculatedImageSettings()?.x || 0) + this.margin();
  }

  protected getImageY(): number {
    return (this.calculatedImageSettings()?.y || 0) + this.margin();
  }
}
