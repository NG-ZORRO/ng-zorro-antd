/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ColorInput, HSVA, Numberify, TinyColor } from '@ctrl/tinycolor';

import type { ColorGenInput, HSB, HSBA } from './type';

export const getRoundNumber = (value: number): number => Math.round(Number(value || 0));

const convertHsb2Hsv = (color: ColorGenInput): ColorInput => {
  if (color && typeof color === 'object' && 'h' in color && 'b' in color) {
    const { b, ...resets } = color as HSB;
    return {
      ...resets,
      v: b
    };
  }
  if (typeof color === 'string' && /hsb/.test(color)) {
    return color.replace(/hsb/, 'hsv');
  }
  return color as ColorInput;
};

export class Color extends TinyColor {
  constructor(color: ColorGenInput) {
    super(convertHsb2Hsv(color));
  }

  toHsbString(): string {
    const hsb = this.toHsb();
    const saturation = getRoundNumber(hsb.s * 100);
    const lightness = getRoundNumber(hsb.b * 100);
    const hue = getRoundNumber(hsb.h);
    const alpha = hsb.a;
    const hsbString = `hsb(${hue}, ${saturation}%, ${lightness}%)`;
    const hsbaString = `hsba(${hue}, ${saturation}%, ${lightness}%, ${alpha.toFixed(alpha === 0 ? 0 : 2)})`;
    return alpha === 1 ? hsbString : hsbaString;
  }

  toHsb(): Numberify<HSBA> {
    let hsv = this.toHsv();
    if (typeof this.originalInput === 'object' && this.originalInput) {
      if ('h' in this.originalInput) {
        hsv = this.originalInput as Numberify<HSVA>;
      }
    }

    const { v, ...resets } = hsv;
    return {
      ...resets,
      b: hsv.v
    };
  }
}
