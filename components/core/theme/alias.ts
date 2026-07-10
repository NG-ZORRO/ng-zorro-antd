/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { generate } from 'ng-zorro-antd/core/color';

import { fade } from './algorithms/shared';
import { NzAliasToken, NzMapToken } from './interfaces';

/**
 * Derives the alias layer from map tokens. Values reproduce the v4 Less
 * formulas (e.g. `@link-hover-color: colorPalette(@link-color, 5)`).
 */
export function formatToken(map: NzMapToken): NzAliasToken {
  const linkPalette = generate(map.colorPrimary);

  return {
    ...map,

    colorTextHeading: map.colorText, // @heading-color
    colorTextDisabled: map.colorTextQuaternary, // @disabled-color
    colorTextDescription: map.colorTextSecondary,

    colorLink: map.colorPrimary, // @link-color
    colorLinkHover: linkPalette[4], // colorPalette(@link-color, 5)
    colorLinkActive: linkPalette[6], // colorPalette(@link-color, 7)

    colorHighlight: map.colorError, // @highlight-color: @red-5
    colorBgContainerDisabled: map.colorFillContent, // @disabled-bg: @background-color-base

    controlOutline: fade(map.colorPrimary, 0.2), // fade(@primary-color, @outline-fade)
    controlOutlineWidth: map.lineWidth * 2, // @outline-width: 2px

    fontWeightStrong: 600,

    paddingXXS: map.sizeXXS,
    paddingXS: map.sizeXS,
    paddingSM: map.sizeSM,
    padding: map.size,
    paddingLG: map.sizeLG,
    marginXXS: map.sizeXXS,
    marginXS: map.sizeXS,
    marginSM: map.sizeSM,
    margin: map.size,
    marginLG: map.sizeLG
  };
}
