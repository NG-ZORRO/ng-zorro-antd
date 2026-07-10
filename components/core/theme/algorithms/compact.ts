/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzMapToken, NzSeedToken, NzThemeAlgorithm } from '../interfaces';
import { nzDefaultAlgorithm } from './default';
import { genFontSizes } from './shared';

/**
 * Derives compact map tokens, reproducing `components/style/themes/compact.less`
 * with the default seeds: fontSize 12, lineHeight 1.66667, heights 28/32/22,
 * paddings 0/4/8/8/16. Composable after other algorithms, e.g.
 * `[nzDarkAlgorithm, nzCompactAlgorithm]`.
 */
export const nzCompactAlgorithm: NzThemeAlgorithm = (seed: NzSeedToken, map?: NzMapToken): NzMapToken => {
  const token = { ...(map ?? nzDefaultAlgorithm(seed)) };

  const fontSize = seed.fontSize - 2; // @font-size-base: 12px
  // v4 compact: 1.66667 = round((fontSize + 8) / fontSize, 5 decimals) for 12px
  const lineHeight = Math.round(((fontSize + 8) / fontSize) * 100000) / 100000;

  return {
    ...token,

    fontSize,
    lineHeight,
    lineHeightLG: seed.lineHeight, // @line-height-lg: 1.5715
    ...genFontSizes(fontSize),

    controlHeight: seed.controlHeight - 4, // @height-base: 28px
    controlHeightLG: seed.controlHeight, // @height-lg: 32px
    controlHeightSM: seed.controlHeight - 10, // @height-sm: 22px

    // @padding-xss/xs/sm/md/lg: 0/4/8/8/16
    sizeXXS: 0,
    sizeXS: seed.sizeUnit,
    sizeSM: seed.sizeUnit * 2,
    size: seed.sizeUnit * 2,
    sizeLG: seed.sizeUnit * 4,

    // @control-padding-horizontal: @padding-sm (8),
    // @control-padding-horizontal-sm: @default-padding-xs (8)
    controlPaddingHorizontal: seed.sizeUnit * 2,
    controlPaddingHorizontalSM: seed.sizeUnit * 2
  };
};
