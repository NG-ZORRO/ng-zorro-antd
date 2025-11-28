/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { MarkStyleCanvasType } from './typings';

/** Returns the ratio of the device's physical pixel resolution to the css pixel resolution */
export function getPixelRatio(): number {
  return window.devicePixelRatio || 1;
}

export function toLowercaseSeparator(key: keyof MarkStyleCanvasType): string {
  return key.replace(/([A-Z])/g, '-$1').toLowerCase();
}

export function getStyleStr(style: MarkStyleCanvasType): string {
  const keys = Object.keys(style) as Array<keyof MarkStyleCanvasType>;
  const styleCss: string[] = keys.map(
    (key: keyof MarkStyleCanvasType) => `${toLowercaseSeparator(key)}: ${style[key]};`
  );
  return styleCss.join(' ');
}

/** Whether to re-render the watermark */
export function reRendering(mutation: MutationRecord, watermarkElement?: HTMLElement): boolean {
  let flag = false;
  // Whether to delete the watermark node
  if (mutation.removedNodes.length) {
    flag = Array.from(mutation.removedNodes).some(node => node === watermarkElement);
  }
  // Whether the watermark dom property value has been modified
  if (mutation.type === 'attributes' && mutation.target === watermarkElement) {
    flag = true;
  }
  return flag;
}

/** Rotate with the watermark as the center point */
export function rotateWatermark(ctx: CanvasRenderingContext2D, rotateX: number, rotateY: number, rotate: number): void {
  ctx.translate(rotateX, rotateY);
  ctx.rotate((Math.PI / 180) * Number(rotate));
  ctx.translate(-rotateX, -rotateY);
}
