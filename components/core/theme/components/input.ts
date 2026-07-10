/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzAliasToken } from '../interfaces';
import { lessRound } from './global';

export interface NzInputComponentToken {
  controlHeight: number;
  controlHeightLG: number;
  controlHeightSM: number;
  paddingBlock: number;
  paddingBlockLG: number;
  paddingBlockSM: number;
  paddingInline: number;
  paddingInlineSM: number;
  addonSelectMarginBlock: number;
  addonSelectMarginInline: number;
  color: string;
  bg: string;
  borderColor: string;
  hoverBorderColor: string;
  placeholderColor: string;
  iconColor: string;
  iconHoverColor: string;
  disabledColor: string;
  disabledBg: string;
  addonBg: string;
  suffixMarginInline: number;
  feedbackPaddingInlineEnd: number;
  /** Unitless (v4: `@line-height-base - 0.0002`). */
  searchLineHeight: number;
}

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

/**
 * The vertical padding formulas of `@input-padding-vertical-*` in
 * `components/style/themes/default.less`.
 */
export function inputPaddingBlock(height: number, fontSize: number, lineHeight: number, lineWidth: number): number {
  return Math.max(round1(Math.round(((height - fontSize * lineHeight) / 2) * 10) / 10 - lineWidth), 3);
}

export function inputPaddingBlockSM(height: number, fontSize: number, lineHeight: number, lineWidth: number): number {
  return Math.max(round1(Math.round(((height - fontSize * lineHeight) / 2) * 10) / 10 - lineWidth), 0);
}

export function inputPaddingBlockLG(height: number, fontSize: number, lineHeight: number, lineWidth: number): number {
  return round1(Math.ceil(((height - fontSize * lineHeight) / 2) * 10) / 10 - lineWidth);
}

/**
 * Derives the input component tokens from alias tokens, reproducing the
 * `@input-*` variable formulas of `components/style/themes/default.less`.
 */
export function genInputToken(token: NzAliasToken): NzInputComponentToken {
  const { controlHeight, controlHeightLG, controlHeightSM, fontSize, fontSizeLG, lineHeight, lineWidth } = token;
  const paddingBlock = inputPaddingBlock(controlHeight, fontSize, lineHeight, lineWidth);
  const paddingInline = token.controlPaddingHorizontal - lineWidth;

  return {
    controlHeight,
    controlHeightLG,
    controlHeightSM,
    paddingBlock,
    paddingBlockLG: inputPaddingBlockLG(controlHeightLG, fontSizeLG, lineHeight, lineWidth),
    paddingBlockSM: inputPaddingBlockSM(controlHeightSM, fontSize, lineHeight, lineWidth),
    paddingInline,
    paddingInlineSM: token.controlPaddingHorizontalSM - lineWidth,
    addonSelectMarginBlock: -(paddingBlock + 1),
    addonSelectMarginInline: -paddingInline,
    color: token.colorText,
    bg: token.colorBgContainer,
    borderColor: token.colorBorder,
    hoverBorderColor: token.colorPrimaryTextHover, // @input-hover-border-color: @primary-5
    placeholderColor: token.colorTextPlaceholder,
    iconColor: token.colorIcon,
    iconHoverColor: token.colorText, // fade(@black, 85%) / dark fade(@white, 85%)
    disabledColor: token.colorTextDisabled,
    disabledBg: token.colorBgContainerDisabled,
    addonBg: token.colorFillAlter, // @input-addon-bg: @background-color-light
    suffixMarginInline: -token.controlPaddingHorizontal,
    feedbackPaddingInlineEnd: token.paddingLG + token.paddingXXS,
    searchLineHeight: lessRound(token.lineHeight - 0.0002)
  };
}
