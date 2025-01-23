/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import qrcodegen from './qrcodegen';

export const ERROR_LEVEL_MAP: Record<'L' | 'M' | 'Q' | 'H', qrcodegen.QrCode.Ecc> = {
  L: qrcodegen.QrCode.Ecc.LOW,
  M: qrcodegen.QrCode.Ecc.MEDIUM,
  Q: qrcodegen.QrCode.Ecc.QUARTILE,
  H: qrcodegen.QrCode.Ecc.HIGH
} as const;

const DEFAULT_SIZE = 160;
const DEFAULT_SCALE = 10;
const DEFAULT_PADDING = 10;
const DEFAULT_COLOR = '#000000';
const DEFAULT_BACKGROUND_COLOR = '#FFFFFF';
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
  padding: number | number[] = DEFAULT_PADDING,
  color = DEFAULT_COLOR,
  backgroundColor = DEFAULT_BACKGROUND_COLOR,
  iconSize = DEFAULT_ICONSIZE,
  icon?: string
): void {
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const formattedPadding = formatPadding(padding);
  canvas.style.width = `${size}px`;
  canvas.style.height = `${size}px`;
  if (!value) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return;
  }
  canvas.width = value.size * scale + formattedPadding[1] + formattedPadding[3];
  canvas.height = value.size * scale + formattedPadding[0] + formattedPadding[2];
  if (!icon) {
    drawCanvasBackground(ctx, canvas.width, canvas.height, scale, backgroundColor);
    drawCanvasColor(ctx, value, scale, formattedPadding, backgroundColor, color);
  } else {
    const iconImg = new Image();
    iconImg.src = icon;
    iconImg.crossOrigin = 'anonymous';
    iconImg.width = iconSize * (canvas.width / size);
    iconImg.height = iconSize * (canvas.width / size);

    const onLoad = (): void => {
      cleanup();
      drawCanvasBackground(ctx, canvas.width, canvas.height, scale, backgroundColor);
      drawCanvasColor(ctx, value!, scale, formattedPadding, backgroundColor, color);
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

    const onError = (): void => {
      cleanup();
      drawCanvasBackground(ctx, canvas.width, canvas.height, scale, backgroundColor);
      drawCanvasColor(ctx, value, scale, formattedPadding, backgroundColor, color);
    };

    const cleanup = (): void => {
      iconImg.removeEventListener('load', onLoad);
      iconImg.removeEventListener('error', onError);
    };

    iconImg.addEventListener('load', onLoad);
    iconImg.addEventListener('error', onError);
  }
}

export function drawCanvasColor(
  ctx: CanvasRenderingContext2D,
  value: qrcodegen.QrCode,
  scale: number,
  padding: number[],
  backgroundColor: string,
  color: string
): void {
  for (let y = 0; y < value.size; y++) {
    for (let x = 0; x < value.size; x++) {
      ctx.fillStyle = value.getModule(x, y) ? color : backgroundColor;
      ctx.fillRect(padding[3] + x * scale, padding[0] + y * scale, scale, scale);
    }
  }
}

export function drawCanvasBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  scale: number,
  backgroundColor: string
): void {
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width * scale, height * scale);
}

export function formatPadding(padding: number | number[]): number[] {
  if (Array.isArray(padding)) {
    // Build an array of 4 elements and repeat values from padding as necessary to set the value of the array
    return Array(4)
      .fill(0)
      .map((_, index) => padding[index % padding.length]);
  } else {
    return [padding, padding, padding, padding];
  }
}
