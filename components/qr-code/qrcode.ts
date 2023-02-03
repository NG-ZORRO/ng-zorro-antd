/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ElementRef } from '@angular/core';

import qrcodegen from './qrcodegen';

const ERROR_LEVEL_MAP: { [index: string]: qrcodegen.QrCode.Ecc } = {
  L: qrcodegen.QrCode.Ecc.LOW,
  M: qrcodegen.QrCode.Ecc.MEDIUM,
  Q: qrcodegen.QrCode.Ecc.QUARTILE,
  H: qrcodegen.QrCode.Ecc.HIGH
};

const DEFAULT_SIZE = 160;
const DEFAULT_SCALE = 10;
const DEFAULT_BGCOLOR = '#FFFFFF';
const DEFAULT_FGCOLOR = '#000000';
const DEFAULT_ICONSIZE = 40;
const DEFAULT_LEVEL = 'L';

export const plotQrCodeData = (value: string, level = DEFAULT_LEVEL): qrcodegen.QrCode => {
  return qrcodegen.QrCode.encodeText(value, ERROR_LEVEL_MAP[level]);
};

export function drawCanvas(
  canvas: ElementRef,
  value: qrcodegen.QrCode,
  size = DEFAULT_SIZE,
  scale = DEFAULT_SCALE,
  lightColor = DEFAULT_BGCOLOR,
  darkColor = DEFAULT_FGCOLOR,
  iconSize = DEFAULT_ICONSIZE,
  icon?: string
): void {
  const ctx = canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
  canvas.nativeElement.width = value.size * scale;
  canvas.nativeElement.height = value.size * scale;
  canvas.nativeElement.style.width = `${size}px`;
  canvas.nativeElement.style.height = `${size}px`;
  if (!icon) {
    for (let y = 0; y < value.size; y++) {
      for (let x = 0; x < value.size; x++) {
        ctx.fillStyle = value.getModule(x, y) ? darkColor : lightColor;
        ctx.fillRect(x * scale, y * scale, scale, scale);
      }
    }
  } else {
    const iconImg = new Image();
    iconImg.src = icon;
    iconImg.crossOrigin = 'anonymous';
    iconImg.width = iconSize * (canvas.nativeElement.width / size);
    iconImg.height = iconSize * (canvas.nativeElement.width / size);
    iconImg.onload = () => {
      for (let y = 0; y < value.size; y++) {
        for (let x = 0; x < value.size; x++) {
          ctx.fillStyle = value.getModule(x, y) ? darkColor : lightColor;
          ctx.fillRect(x * scale, y * scale, scale, scale);
        }
      }
      const iconCoordinate = canvas.nativeElement.width / 2 - (iconSize * (canvas.nativeElement.width / size)) / 2;

      ctx.fillStyle = lightColor;
      ctx.fillRect(
        iconCoordinate,
        iconCoordinate,
        iconSize * (canvas.nativeElement.width / size),
        iconSize * (canvas.nativeElement.width / size)
      );
      ctx.drawImage(
        iconImg,
        iconCoordinate,
        iconCoordinate,
        iconSize * (canvas.nativeElement.width / size),
        iconSize * (canvas.nativeElement.width / size)
      );
    };
  }
}
