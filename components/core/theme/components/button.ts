/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TinyColor } from '@ctrl/tinycolor';

import { fade } from '../algorithms/shared';
import { NzAliasToken } from '../interfaces';

export interface NzButtonComponentToken {
  fontWeight: number;
  defaultShadow: string;
  primaryShadow: string;
  textShadow: string;
  primaryColor: string;
  defaultColor: string;
  defaultBg: string;
  defaultBorderColor: string;
  dangerColor: string;
  ghostColor: string;
  ghostBg: string;
  ghostBorderColor: string;
  disabledColor: string;
  disabledBg: string;
  disabledBorderColor: string;
  textHoverBg: string;
  textActiveBg: string;
  linkHoverBg: string;
  groupBorderColor: string;
  contentFontSize: number;
  contentFontSizeLG: number;
  contentFontSizeSM: number;
  paddingInline: number;
  paddingInlineLG: number;
  paddingInlineSM: number;
  paddingBlock: number;
  paddingBlockLG: number;
  paddingBlockSM: number;
  onlyIconSize: number;
  onlyIconSizeLG: number;
  onlyIconSizeSM: number;
  onlyIconPaddingBlock: number;
  onlyIconPaddingBlockLG: number;
  onlyIconPaddingBlockSM: number;
  circlePaddingInline: number;
  circlePaddingInlineLG: number;
  circlePaddingInlineSM: number;
  controlHeight: number;
  controlHeightLG: number;
  controlHeightSM: number;
  borderRadius: number;
  borderRadiusSM: number;
  lineHeight: number;
  /** Line height of `<a nz-button>` (v4: `@btn-height-base - 2px`). */
  anchorLineHeight: number;
  anchorLineHeightLG: number;
  anchorLineHeightSM: number;
}

/**
 * The vertical padding formula from `.button-size()` in
 * `components/button/style/mixin.less`:
 * `max((round(((@height - @font-size * @line-height-base) / 2) * 10) / 10) - @border-width-base, 0)`
 */
function buttonPaddingBlock(height: number, fontSize: number, lineHeight: number, lineWidth: number): number {
  const rounded = Math.round(((height - fontSize * lineHeight) / 2) * 10) / 10;
  return Math.max(Math.round((rounded - lineWidth) * 10) / 10, 0);
}

/**
 * Derives the button component tokens from alias tokens, reproducing the
 * `@btn-*` variable formulas of `components/style/themes/default.less`.
 */
export function genButtonToken(token: NzAliasToken): NzButtonComponentToken {
  const { controlHeight, controlHeightLG, controlHeightSM, fontSize, fontSizeLG, lineHeight, lineWidth } = token;
  // v4 quirks: @btn-font-size-sm is @font-size-base, and square-only icon
  // sizes derive from the content font sizes.
  const contentFontSizeSM = fontSize;
  const onlyIconSize = fontSize + 2;
  const onlyIconSizeLG = fontSizeLG + 2;
  const onlyIconSizeSM = fontSize;
  // Ghost buttons sit on the container background: on light themes v4 uses
  // the container color itself (#fff); the dark theme overrides to the text
  // color with a translucent white border.
  const containerIsDark = new TinyColor(token.colorBgContainer).isDark();

  return {
    fontWeight: 400,
    defaultShadow: '0 2px 0 rgba(0, 0, 0, 0.015)', // @btn-shadow
    primaryShadow: '0 2px 0 rgba(0, 0, 0, 0.045)', // @btn-primary-shadow
    textShadow: '0 -1px 0 rgba(0, 0, 0, 0.12)', // @btn-text-shadow
    primaryColor: '#fff',
    defaultColor: token.colorText,
    defaultBg: token.colorBgContainer,
    defaultBorderColor: token.colorBorder,
    dangerColor: '#fff',
    ghostColor: containerIsDark ? token.colorText : token.colorBgContainer,
    ghostBg: 'transparent',
    ghostBorderColor: containerIsDark ? fade('#fff', 0.25) : token.colorBgContainer,
    disabledColor: token.colorTextDisabled,
    disabledBg: token.colorBgContainerDisabled,
    disabledBorderColor: token.colorBorder,
    textHoverBg: token.colorBgTextHover,
    textActiveBg: token.colorBgTextActive,
    linkHoverBg: 'transparent',
    groupBorderColor: token.colorPrimaryTextHover, // @btn-group-border: @primary-5
    contentFontSize: fontSize,
    contentFontSizeLG: fontSizeLG,
    contentFontSizeSM,
    // @btn-padding-horizontal-base: @padding-md - 1px; the button basis sits one
    // size step above @control-padding-horizontal in both default and compact.
    paddingInline: token.controlPaddingHorizontal + token.sizeUnit - lineWidth,
    paddingInlineLG: token.controlPaddingHorizontal + token.sizeUnit - lineWidth,
    paddingInlineSM: token.controlPaddingHorizontalSM - lineWidth, // @padding-xs - 1px
    paddingBlock: buttonPaddingBlock(controlHeight, fontSize, lineHeight, lineWidth),
    paddingBlockLG: buttonPaddingBlock(controlHeightLG, fontSizeLG, lineHeight, lineWidth),
    paddingBlockSM: buttonPaddingBlock(controlHeightSM, contentFontSizeSM, lineHeight, lineWidth),
    onlyIconSize,
    onlyIconSizeLG,
    onlyIconSizeSM,
    onlyIconPaddingBlock: buttonPaddingBlock(controlHeight, onlyIconSize, lineHeight, lineWidth),
    onlyIconPaddingBlockLG: buttonPaddingBlock(controlHeightLG, onlyIconSizeLG, lineHeight, lineWidth),
    onlyIconPaddingBlockSM: buttonPaddingBlock(controlHeightSM, onlyIconSizeSM, lineHeight, lineWidth),
    circlePaddingInline: controlHeight / 2,
    circlePaddingInlineLG: controlHeightLG / 2,
    circlePaddingInlineSM: controlHeightSM / 2,
    controlHeight,
    controlHeightLG,
    controlHeightSM,
    borderRadius: token.borderRadius,
    borderRadiusSM: token.borderRadius, // @btn-border-radius-sm: @border-radius-base
    lineHeight,
    anchorLineHeight: controlHeight - 2,
    anchorLineHeightLG: controlHeightLG - 2,
    anchorLineHeightSM: controlHeightSM - 2
  };
}
