/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzMapToken, NzSeedToken, NzThemeAlgorithm } from '../interfaces';
import { nzDefaultAlgorithm } from './default';
import { assignStatusColors, fade, genDarkStatusColor } from './shared';

const DARK_COMPONENT_BACKGROUND = '#141414';
const DARK_TEXT_BASE = '#fff';

/**
 * Derives dark map tokens, reproducing `components/style/themes/dark.less`:
 * status palettes are mixed with the dark component background, text colors
 * become white alpha steps, and the neutral/background/shadow overrides match
 * the v4 dark literals.
 */
export const nzDarkAlgorithm: NzThemeAlgorithm = (seed: NzSeedToken, map?: NzMapToken): NzMapToken => {
  const token = { ...(map ?? nzDefaultAlgorithm(seed)) };

  // Custom bases are respected; the v4 defaults flip to the dark literals.
  const backgroundColor = seed.colorBgBase === '#fff' ? DARK_COMPONENT_BACKGROUND : seed.colorBgBase;
  const textBase = seed.colorTextBase === '#000' ? DARK_TEXT_BASE : seed.colorTextBase;

  assignStatusColors(token, 'Primary', genDarkStatusColor(seed.colorPrimary, backgroundColor));
  assignStatusColors(token, 'Success', genDarkStatusColor(seed.colorSuccess, backgroundColor));
  assignStatusColors(token, 'Warning', genDarkStatusColor(seed.colorWarning, backgroundColor));
  // v4 quirk: `@error-color` is `@red-5` — one step BELOW the palette base
  // `@red-6` (#f5222d). The dark red palette is generated from the base, so
  // for the default seed the dark error color is its step 5 (dark `@red-5`,
  // #a61d24) and the bg/border variants are dark `@red-1`/`@red-3`.
  assignStatusColors(
    token,
    'Error',
    seed.colorError === '#ff4d4f'
      ? genDarkStatusColor('#f5222d', backgroundColor, 4)
      : genDarkStatusColor(seed.colorError, backgroundColor)
  );
  assignStatusColors(token, 'Info', genDarkStatusColor(seed.colorInfo, backgroundColor));

  return {
    ...token,

    colorText: fade(textBase, 0.85),
    colorTextSecondary: fade(textBase, 0.45),
    colorTextTertiary: fade(textBase, 0.45),
    colorTextQuaternary: fade(textBase, 0.3), // @disabled-color (dark): fade(@white, 30%)
    colorTextPlaceholder: fade(textBase, 0.3), // @input-placeholder-color (dark)
    colorIcon: fade(textBase, 0.3), // @input-icon-color (dark)

    colorBgContainer: backgroundColor, // @component-background: #141414
    colorBgElevated: '#1f1f1f', // @popover-background
    colorBgLayout: '#000', // @body-background: @black
    colorBgMask: 'rgba(0, 0, 0, 0.45)',

    colorBorder: '#434343', // @border-color-base
    colorSplit: '#303030', // @border-color-split
    colorFillAlter: fade(textBase, 0.04), // @background-color-light: fade(@white, 4%)
    colorFillContent: fade(textBase, 0.08), // @background-color-base: fade(@white, 8%)
    colorBgTextHover: 'rgba(255, 255, 255, 0.03)', // @btn-text-hover-bg (dark)
    colorBgTextActive: 'rgba(255, 255, 255, 0.04)', // fadein(@btn-text-hover-bg, 1%)

    controlItemBgHover: fade(textBase, 0.08), // @item-hover-bg (dark)
    controlItemBgActive: token.colorPrimaryBg, // @item-active-bg: @primary-1

    // Dark @shadow-2 / @shadow-1-down
    boxShadow:
      '0 3px 6px -4px rgba(0, 0, 0, 0.48), 0 6px 16px 0 rgba(0, 0, 0, 0.32), 0 9px 28px 8px rgba(0, 0, 0, 0.2)',
    boxShadowSecondary:
      '0 6px 16px -8px rgba(0, 0, 0, 0.32), 0 9px 28px 0 rgba(0, 0, 0, 0.2), 0 12px 48px 16px rgba(0, 0, 0, 0.12)'
  };
};
