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
const DEFAULT_ICONBGCOLOR = '#FFFFFF';
const DEFAULT_ICONSIZE = 40;
const DEFAULT_LEVEL = 'L';

export const qrCode = (value: string, level = DEFAULT_LEVEL): qrcodegen.QrCode => {
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
  iconColor = DEFAULT_ICONBGCOLOR,
  icon?: string
): void {
  const ctx = canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;

  const canvasQRCode: HTMLCanvasElement = document.createElement('canvas');
  const ctxQRCode = canvasQRCode.getContext('2d') as CanvasRenderingContext2D;

  canvas.nativeElement.width = size;
  canvas.nativeElement.height = size;
  canvasQRCode.width = value.size * scale;
  canvasQRCode.height = value.size * scale;

  for (let y = 0; y < value.size; y++) {
    for (let x = 0; x < value.size; x++) {
      ctxQRCode.fillStyle = value.getModule(x, y) ? darkColor : lightColor;
      ctxQRCode.fillRect(x * scale, y * scale, scale, scale);
    }
  }

  const imgQRCode = new Image();
  imgQRCode.src = canvasQRCode.toDataURL('image/png');
  imgQRCode.crossOrigin = 'anonymous';
  imgQRCode.onload = () => {
    if (!!icon) {
      const iconImg = new Image();
      iconImg.src = icon;
      iconImg.crossOrigin = 'anonymous';
      iconImg.width = iconSize;
      iconImg.height = iconSize;
      iconImg.onload = () => {
        ctx.clearRect(0, 0, size, size);
        ctx.drawImage(imgQRCode, 0, 0, imgQRCode.width, imgQRCode.height, 0, 0, size, size);

        const iconCoordinate = size / 2 - iconSize / 2;

        ctx.fillStyle = iconColor;

        ctx.fillRect(iconCoordinate, iconCoordinate, iconSize, iconSize);
        ctx.drawImage(iconImg, iconCoordinate, iconCoordinate, iconSize, iconSize);
      };
    } else {
      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(imgQRCode, 0, 0, imgQRCode.width, imgQRCode.height, 0, 0, size, size);
    }
  };
}
