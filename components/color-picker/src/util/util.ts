/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Color } from '../interfaces/color';
import type { ColorGenInput, HsbaColorType, TransformOffset } from '../interfaces/type';

export const generateColor = (color: ColorGenInput): Color => {
  if (color instanceof Color) {
    return color;
  }
  return new Color(color);
};

export const defaultColor = generateColor('#1677ff');

export function calculateColor(
  offset: TransformOffset,
  containerRef: HTMLDivElement,
  targetRef: HTMLDivElement,
  color?: Color | null,
  type?: HsbaColorType
): Color {
  const { width, height } = containerRef.getBoundingClientRect();
  const { width: targetWidth, height: targetHeight } = targetRef.getBoundingClientRect();
  const centerOffsetX = targetWidth / 2;
  const centerOffsetY = targetHeight / 2;
  const saturation = (offset.x + centerOffsetX) / width;
  const bright = 1 - (offset.y + centerOffsetY) / height;
  const hsb = color?.toHsb() || { a: 0, h: 0, s: 0, b: 0 };
  const alphaOffset = saturation;
  const hueOffset = ((offset.x + centerOffsetX) / width) * 360;

  if (type) {
    switch (type) {
      case 'hue':
        return generateColor({
          ...hsb,
          h: hueOffset <= 0 ? 0 : hueOffset
        });
      case 'alpha':
        return generateColor({
          ...hsb,
          a: alphaOffset <= 0 ? 0 : alphaOffset
        });
    }
  }

  return generateColor({
    h: hsb.h,
    s: saturation <= 0 ? 0 : saturation,
    b: bright >= 1 ? 1 : bright,
    a: hsb.a
  });
}

export const calculateOffset = (
  containerRef: HTMLDivElement,
  targetRef: HTMLDivElement,
  color?: Color | null,
  type?: HsbaColorType
): TransformOffset | null => {
  const { width, height } = containerRef.getBoundingClientRect();
  const { width: targetWidth, height: targetHeight } = targetRef.getBoundingClientRect();
  const centerOffsetX = targetWidth / 2;
  const centerOffsetY = targetHeight / 2;
  const hsb = color?.toHsb() || { a: 0, h: 0, s: 0, b: 0 };

  // Exclusion of boundary cases
  if ((targetWidth === 0 && targetHeight === 0) || targetWidth !== targetHeight) {
    return null;
  }

  if (type) {
    switch (type) {
      case 'hue':
        return {
          x: (hsb.h / 360) * width - centerOffsetX,
          y: -centerOffsetY / 3
        };
      case 'alpha':
        return {
          x: hsb.a * width - centerOffsetX,
          y: -centerOffsetY / 3
        };
    }
  }
  return {
    x: hsb.s * width - centerOffsetX,
    y: (1 - hsb.b) * height - centerOffsetY
  };
};
