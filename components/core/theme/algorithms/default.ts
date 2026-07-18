/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzMapToken, NzSeedToken, NzThemeAlgorithm } from '../interfaces';
import { assignStatusColors, fade, genFontSizes, genLightStatusColor, genMotion } from './shared';

/**
 * Derives the default (light) map tokens from seed tokens. All values
 * reproduce the compiled output of `components/style/themes/default.less`.
 *
 * Note: the neutral greys (`colorBorder`, `colorSplit`, `colorFillAlter`,
 * `colorFillContent`) are literals in the v4 Less theme (`hsv(0, 0, N%)`),
 * so they are literals here too; deriving them from `colorBgBase` is part of
 * the future v5 preset work.
 */
export const nzDefaultAlgorithm: NzThemeAlgorithm = (seed: NzSeedToken): NzMapToken => {
  const token = { ...seed } as NzMapToken;

  assignStatusColors(token, 'Primary', genLightStatusColor(seed.colorPrimary));
  assignStatusColors(token, 'Success', genLightStatusColor(seed.colorSuccess));
  assignStatusColors(token, 'Warning', genLightStatusColor(seed.colorWarning));
  assignStatusColors(token, 'Error', genLightStatusColor(seed.colorError));
  assignStatusColors(token, 'Info', genLightStatusColor(seed.colorInfo));

  return {
    ...token,

    // Neutral text: fade(@black, 85% / 45% / 25%)
    colorText: fade(seed.colorTextBase, 0.85),
    colorTextSecondary: fade(seed.colorTextBase, 0.45),
    colorTextTertiary: fade(seed.colorTextBase, 0.45),
    colorTextQuaternary: fade(seed.colorTextBase, 0.25),
    colorTextPlaceholder: '#bfbfbf', // @input-placeholder-color: hsv(0, 0, 75%)
    colorIcon: fade(seed.colorTextBase, 0.85), // @input-icon-color: @input-color

    // Neutral background
    colorBgContainer: seed.colorBgBase, // @component-background
    colorBgElevated: seed.colorBgBase, // @popover-background
    colorBgLayout: '#f0f2f5', // @layout-body-background
    colorBgMask: 'rgba(0, 0, 0, 0.45)',

    // Neutral border/fill (v4 literals: hsv(0, 0, 85/94/98/96%))
    colorBorder: '#d9d9d9', // @border-color-base
    colorSplit: '#f0f0f0', // @border-color-split
    colorFillAlter: '#fafafa', // @background-color-light
    colorFillContent: '#f5f5f5', // @background-color-base
    colorBgTextHover: 'rgba(0, 0, 0, 0.018)', // @btn-text-hover-bg
    colorBgTextActive: 'rgba(0, 0, 0, 0.028)', // fadein(@btn-text-hover-bg, 1%)

    controlItemBgHover: '#f5f5f5', // @item-hover-bg
    controlItemBgActive: token.colorPrimaryBg, // @item-active-bg: @primary-1

    // Size scale: 4 / 8 / 12 / 16 / 24 (@padding-xss..lg)
    sizeXXS: seed.sizeUnit,
    sizeXS: seed.sizeUnit * 2,
    sizeSM: seed.sizeUnit * 3,
    size: seed.sizeUnit * seed.sizeStep,
    sizeLG: seed.sizeUnit * 6,

    controlHeightSM: seed.controlHeight - 8, // @height-sm: 24px
    controlHeightLG: seed.controlHeight + 8, // @height-lg: 40px
    controlPaddingHorizontal: seed.sizeUnit * 3, // @control-padding-horizontal: @padding-sm (12)
    controlPaddingHorizontalSM: seed.sizeUnit * 2, // @control-padding-horizontal-sm: @padding-xs (8)

    borderRadiusXS: seed.borderRadius,
    borderRadiusSM: seed.borderRadius, // @border-radius-sm: 2px
    borderRadiusLG: seed.borderRadius * 2, // @border-radius-lg: 4px

    ...genFontSizes(seed.fontSize),
    lineHeightLG: 1.5, // @line-height-lg

    ...genMotion(seed),

    // @shadow-2 / @shadow-1-down
    boxShadow:
      '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
    boxShadowSecondary:
      '0 6px 16px -8px rgba(0, 0, 0, 0.08), 0 9px 28px 0 rgba(0, 0, 0, 0.05), 0 12px 48px 16px rgba(0, 0, 0, 0.03)'
  };
};
