/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import qrcodegen from './qrcodegen';

export const ERROR_LEVEL_MAP: { [index in 'L' | 'M' | 'Q' | 'H']: qrcodegen.QrCode.Ecc } = {
  L: qrcodegen.QrCode.Ecc.LOW,
  M: qrcodegen.QrCode.Ecc.MEDIUM,
  Q: qrcodegen.QrCode.Ecc.QUARTILE,
  H: qrcodegen.QrCode.Ecc.HIGH
} as const;

const DEFAULT_SIZE = 160;
const DEFAULT_SCALE = 10;
const DEFAULT_COLOR = '#000000';
const DEFAULT_ICONSIZE = 40;
const DEFAULT_LEVEL: keyof typeof ERROR_LEVEL_MAP = 'M';

export const plotQRCodeData = (
  value: string,
  level: keyof typeof ERROR_LEVEL_MAP = DEFAULT_LEVEL
): qrcodegen.QrCode | null => {
  if (!value) {
    return null;
  }
  return qrcodegen.QrCode.encodeText(value, ERROR_LEVEL_MAP[level]);
};

export function drawCanvas(
  canvas: HTMLCanvasElement,
  value: qrcodegen.QrCode | null,
  size = DEFAULT_SIZE,
  scale = DEFAULT_SCALE,
  color = DEFAULT_COLOR,
  iconSize = DEFAULT_ICONSIZE,
  icon?: string
): void {
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  canvas.style.width = `${size}px`;
  canvas.style.height = `${size}px`;
  if (!value) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return;
  }
  canvas.width = value.size * scale;
  canvas.height = value.size * scale;
  if (!icon) {
    drawCanvasColor(ctx, value, scale, color);
  } else {
    const iconImg = new Image();
    iconImg.src = icon;
    iconImg.crossOrigin = 'anonymous';
    iconImg.width = iconSize * (canvas.width / size);
    iconImg.height = iconSize * (canvas.width / size);
    iconImg.onload = () => {
      drawCanvasColor(ctx, value, scale, color);
      const iconCoordinate = canvas.width / 2 - (iconSize * (canvas.width / size)) / 2;

      ctx.fillRect(iconCoordinate, iconCoordinate, iconSize * (canvas.width / size), iconSize * (canvas.width / size));
      ctx.drawImage(
        iconImg,
        iconCoordinate,
        iconCoordinate,
        iconSize * (canvas.width / size),
        iconSize * (canvas.width / size)
      );
    };
    iconImg.onerror = () => drawCanvasColor(ctx, value, scale, color);
  }
}

export function drawCanvasColor(
  ctx: CanvasRenderingContext2D,
  value: qrcodegen.QrCode,
  scale: number,
  color: string
): void {
  for (let y = 0; y < value.size; y++) {
    for (let x = 0; x < value.size; x++) {
      ctx.fillStyle = value.getModule(x, y) ? color : 'rgba(0, 0, 0, 0)';
      ctx.fillRect(x * scale, y * scale, scale, scale);
    }
  }
}
