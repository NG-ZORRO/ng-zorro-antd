/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Token namespaces for components that derive metrics from the input control
 * metrics (see `.input-derived-theme-variables()` in the Less themes). These
 * components are partially token-aware: only the derived metrics respond to
 * the theme so far; their full migration lands in later milestones.
 */

import { NzAliasToken } from '../interfaces';
import { lessRound } from './global';
import { NzInputComponentToken } from './input';

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

export interface NzSelectComponentToken {
  multipleItemHeight: number;
  multipleItemHeightSM: number;
  multipleItemSpacingHalf: number;
  singleContentHeight: number;
  singleContentHeightSM: number;
  smallArrowPaddingInlineEnd: number;
  iconMarginTop: number;
  groupedPaddingInlineStart: number;
  showArrowItemPaddingInlineEnd: number;
  singleArrowPadding: number;
  singleArrowPaddingLG: number;
}

export function genSelectToken(token: NzAliasToken, input: NzInputComponentToken): NzSelectComponentToken {
  return {
    multipleItemHeight: token.controlHeight - input.paddingBlock * 2,
    multipleItemHeightSM: token.controlHeightSM - input.paddingBlock * 2,
    multipleItemSpacingHalf: Math.ceil(input.paddingBlock / 2),
    singleContentHeight: token.controlHeight - 2 * token.lineWidth,
    singleContentHeightSM: token.controlHeightSM - 2 * token.lineWidth,
    smallArrowPaddingInlineEnd: round2(input.paddingInlineSM + token.fontSize * 1.5),
    iconMarginTop: -token.fontSizeIcon / 2,
    groupedPaddingInlineStart: token.controlPaddingHorizontal * 2,
    showArrowItemPaddingInlineEnd: round2(token.fontSize * 1.5),
    singleArrowPadding: Math.ceil(token.fontSize * 1.25),
    singleArrowPaddingLG: Math.ceil(token.fontSizeLG * 1.25)
  };
}

// v4 component constants not (yet) part of the token system; values from
// `components/style/themes/default.less`.
const PICKER_PANEL_CELL_WIDTH = 36; // @picker-panel-cell-width
const PICKER_YEAR_MONTH_CELL_WIDTH = 60; // @picker-year-month-cell-width
const PICKER_TEXT_HEIGHT = 40; // @picker-text-height

export interface NzDatePickerComponentToken {
  paddingBlockStart: number;
  paddingBlockEnd: number;
  paddingBlockStartLG: number;
  paddingBlockEndLG: number;
  paddingBlockStartSM: number;
  paddingBlockEndSM: number;
  presetOffset: number;
  panelWidth: number;
  yearMonthCellMargin: number;
  footerExtraLineHeight: number;
}

/** The `.picker-padding()` formulas from `date-picker/style/index.less`. */
function pickerPaddings(height: number, fontSize: number, lineHeight: number): [number, number] {
  const fontHeight = Math.floor(fontSize * lineHeight) + 2;
  const top = Math.max((height - fontHeight) / 2, 0);
  const bottom = Math.max(height - fontHeight - top, 0);
  return [round2(top), round2(bottom)];
}

export function genDatePickerToken(token: NzAliasToken, input: NzInputComponentToken): NzDatePickerComponentToken {
  const [paddingBlockStart, paddingBlockEnd] = pickerPaddings(token.controlHeight, token.fontSize, token.lineHeight);
  const [paddingBlockStartLG, paddingBlockEndLG] = pickerPaddings(
    token.controlHeightLG,
    token.fontSizeLG,
    token.lineHeight
  );
  const [paddingBlockStartSM, paddingBlockEndSM] = pickerPaddings(
    token.controlHeightSM,
    token.fontSize,
    token.lineHeight
  );
  const panelWidth = PICKER_PANEL_CELL_WIDTH * 7 + token.paddingSM * 2 + 4;
  return {
    paddingBlockStart,
    paddingBlockEnd,
    paddingBlockStartLG,
    paddingBlockEndLG,
    paddingBlockStartSM,
    paddingBlockEndSM,
    presetOffset: round2(input.paddingInline * 1.5),
    panelWidth,
    yearMonthCellMargin: round2(((panelWidth - token.paddingXS * 2) / 3 - PICKER_YEAR_MONTH_CELL_WIDTH) / 2),
    footerExtraLineHeight: PICKER_TEXT_HEIGHT - 2 * token.lineWidth - token.paddingXS / 2
  };
}

export interface NzInputNumberComponentToken {
  innerHeight: number;
  innerHeightLG: number;
  innerHeightSM: number;
}

export function genInputNumberToken(token: NzAliasToken): NzInputNumberComponentToken {
  return {
    innerHeight: token.controlHeight - 2,
    innerHeightLG: token.controlHeightLG - 2,
    innerHeightSM: token.controlHeightSM - 2
  };
}

export interface NzMentionComponentToken {
  editorMinHeight: number;
}

export function genMentionToken(token: NzAliasToken): NzMentionComponentToken {
  return { editorMinHeight: token.controlHeight - 2 };
}

export interface NzRadioComponentToken {
  buttonLineHeightLG: number;
  buttonLineHeightSM: number;
  buttonPaddingInline: number;
}

export function genRadioToken(token: NzAliasToken): NzRadioComponentToken {
  return {
    buttonLineHeightLG: token.controlHeightLG - 2,
    buttonLineHeightSM: token.controlHeightSM - 2,
    // v4 subtracts a literal 1px here, not @border-width-base.
    buttonPaddingInline: token.padding - 1
  };
}

export interface NzSegmentedComponentToken {
  itemMinHeight: number;
  itemMinHeightLG: number;
  itemMinHeightSM: number;
}

export function genSegmentedToken(token: NzAliasToken): NzSegmentedComponentToken {
  // @segmented-container-padding (2px) * 2
  return {
    itemMinHeight: token.controlHeight - 4,
    itemMinHeightLG: token.controlHeightLG - 4,
    itemMinHeightSM: token.controlHeightSM - 4
  };
}

export interface NzTypographyComponentToken {
  editContentInset: number;
  editContentMarginBlockStart: number;
}

export function genTypographyToken(token: NzAliasToken, input: NzInputComponentToken): NzTypographyComponentToken {
  return {
    editContentInset: -(input.paddingInline + 1),
    editContentMarginBlockStart: -(input.paddingBlock + 1)
  };
}

export interface NzFormComponentToken {
  rtlFeedbackPaddingLeft: number;
  rtlFeedbackPaddingLeftLG: number;
  rtlFeedbackPaddingLeftSM: number;
  /** `em` length (v4: `@line-height-base - 0.25em`), e.g. `1.3215em`. */
  labelWrapLineHeight: string;
}

export function genFormToken(token: NzAliasToken, input: NzInputComponentToken): NzFormComponentToken {
  const feedbackWidth = token.fontSize * 1.3;
  return {
    rtlFeedbackPaddingLeft: round2(input.paddingInline + feedbackWidth),
    rtlFeedbackPaddingLeftLG: round2(input.paddingInline + feedbackWidth),
    rtlFeedbackPaddingLeftSM: round2(input.paddingInlineSM + feedbackWidth),
    labelWrapLineHeight: `${lessRound(token.lineHeight - 0.25)}em`
  };
}
