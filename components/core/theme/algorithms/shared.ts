/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TinyColor } from '@ctrl/tinycolor';

import { generate } from 'ng-zorro-antd/core/color';

import { NzMapToken, NzSeedToken } from '../interfaces';

export interface StatusColorVariants {
  base: string;
  bg: string;
  bgHover: string;
  border: string;
  borderHover: string;
  hover: string;
  active: string;
  /** Step 5 of the palette (v4 `@primary-5` and friends). */
  textHover: string;
}

/**
 * Light-theme variants of a status color, matching the v4 Less formulas:
 * hover = colorPalette(c, 5), active = colorPalette(c, 7),
 * bg/bgHover/border/borderHover = colorPalette(c, 1/2/3/4).
 */
export function genLightStatusColor(base: string): StatusColorVariants {
  const palette = generate(base);
  return {
    base,
    bg: palette[0],
    bgHover: palette[1],
    border: palette[2],
    borderHover: palette[3],
    hover: palette[4],
    active: palette[6],
    textHover: palette[4]
  };
}

/**
 * Dark-theme variants, matching `themes/dark.less`: the palette is mixed with
 * the dark component background (`generate(c, { theme: 'dark' })` reproduces
 * the exact `mix(..., @component-background, N%)` formulas), the base becomes
 * step 6 of that palette, and hover/active are the light palette steps 5/7 of
 * the dark base (as `@primary-color-hover` resolves in the dark theme).
 *
 * `baseIndex` selects which dark palette step is the status color itself —
 * v4's `@error-color` is `@red-5` (index 4), not the palette base.
 */
export function genDarkStatusColor(base: string, backgroundColor: string, baseIndex: number = 5): StatusColorVariants {
  const darkPalette = generate(base, { theme: 'dark', backgroundColor });
  const darkBase = darkPalette[baseIndex];
  const lightPaletteOfDarkBase = generate(darkBase);
  return {
    base: darkBase,
    bg: darkPalette[0],
    bgHover: darkPalette[1],
    border: darkPalette[2],
    borderHover: darkPalette[3],
    hover: lightPaletteOfDarkBase[4],
    active: lightPaletteOfDarkBase[6],
    textHover: darkPalette[4]
  };
}

export function fade(color: string, alpha: number): string {
  return new TinyColor(color).setAlpha(alpha).toRgbString();
}

export function assignStatusColors(
  token: Partial<NzMapToken>,
  status: 'Primary' | 'Success' | 'Warning' | 'Error' | 'Info',
  variants: StatusColorVariants
): void {
  const t = token as Record<string, string>;
  t[`color${status}`] = variants.base;
  t[`color${status}Bg`] = variants.bg;
  t[`color${status}BgHover`] = variants.bgHover;
  t[`color${status}Border`] = variants.border;
  t[`color${status}BorderHover`] = variants.borderHover;
  t[`color${status}Hover`] = variants.hover;
  t[`color${status}Active`] = variants.active;
  t[`color${status}TextHover`] = variants.textHover;
}

/** Font scale shared by all algorithms; heading sizes use the v4 `ceil()` formulas. */
export function genFontSizes(
  fontSize: number
): Pick<
  NzMapToken,
  | 'fontSizeSM'
  | 'fontSizeLG'
  | 'fontSizeIcon'
  | 'fontSizeHeading1'
  | 'fontSizeHeading2'
  | 'fontSizeHeading3'
  | 'fontSizeHeading4'
  | 'fontSizeHeading5'
> {
  const fontSizeSM = Math.max(12, fontSize - 2);
  return {
    fontSizeSM,
    fontSizeLG: fontSize + 2,
    fontSizeIcon: fontSizeSM,
    fontSizeHeading1: Math.ceil(fontSize * 2.71),
    fontSizeHeading2: Math.ceil(fontSize * 2.14),
    fontSizeHeading3: Math.ceil(fontSize * 1.71),
    fontSizeHeading4: Math.ceil(fontSize * 1.42),
    fontSizeHeading5: Math.ceil(fontSize * 1.14)
  };
}

export function genMotion(
  seed: NzSeedToken
): Pick<
  NzMapToken,
  | 'motionDurationFast'
  | 'motionDurationMid'
  | 'motionDurationSlow'
  | 'motionEaseInOut'
  | 'motionEaseOut'
  | 'motionEaseIn'
  | 'motionEaseOutBack'
  | 'motionEaseInBack'
  | 'motionEaseOutCirc'
  | 'motionEaseInOutCirc'
  | 'motionEaseOutQuint'
  | 'motionEaseInQuint'
> {
  const duration = (n: number): string => `${(seed.motionBase + seed.motionUnit * n).toFixed(1)}s`;
  return {
    motionDurationFast: duration(1),
    motionDurationMid: duration(2),
    motionDurationSlow: duration(3),
    motionEaseInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    motionEaseOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    motionEaseIn: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    motionEaseOutBack: 'cubic-bezier(0.12, 0.4, 0.29, 1.46)',
    motionEaseInBack: 'cubic-bezier(0.71, -0.46, 0.88, 0.6)',
    motionEaseOutCirc: 'cubic-bezier(0.08, 0.82, 0.17, 1)',
    motionEaseInOutCirc: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
    motionEaseOutQuint: 'cubic-bezier(0.23, 1, 0.32, 1)',
    motionEaseInQuint: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)'
  };
}
