/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Token namespaces for components that derive metrics from the global size
 * primitives (see `.control-derived-theme-variables()` in the Less themes).
 * These components are partially token-aware: only the derived metrics respond
 * to the theme so far; their full migration lands in later milestones.
 */

import { NzAliasToken } from '../interfaces';

/**
 * Reproduces how Less prints numbers (`toFixed(8)` with trailing zeros
 * trimmed), so emitted values match the `themes/token.less` defaults exactly.
 */
export function lessRound(value: number): number {
  return parseFloat(value.toFixed(8));
}

// v4 component constants not (yet) part of the token system; values from
// `components/style/themes/default.less`.
const FLOAT_BUTTON_SIZE = 40; // @float-button-size
const MODAL_HEADER_TITLE_LINE_HEIGHT = 22; // @modal-header-title-line-height
const SPIN_DOT_SIZE = 20; // @spin-dot-size
const SPIN_DOT_SIZE_SM = 14; // @spin-dot-size-sm
const SPIN_DOT_SIZE_LG = 32; // @spin-dot-size-lg
const SWITCH_HEIGHT = 22; // @switch-height
const CHECKBOX_SIZE = 16; // @checkbox-size
const TABLE_PADDING_HORIZONTAL = 16; // @table-padding-horizontal
const TABS_CARD_HEIGHT = 40; // @tabs-card-height
const TRANSFER_ITEM_PADDING_VERTICAL = 6; // @transfer-item-padding-vertical
const TRANSFER_HEADER_HEIGHT = 40; // @transfer-header-height

export interface NzAlertComponentToken {
  paddingInline: number;
  withDescriptionPaddingBlock: number;
  iconTop: number;
  descriptionLineHeight: number;
}

export function genAlertToken(token: NzAliasToken): NzAlertComponentToken {
  // v4 subtracts a literal 1px here, not @border-width-base.
  return {
    paddingInline: token.padding - 1,
    withDescriptionPaddingBlock: token.padding - 1,
    iconTop: lessRound(8 + token.fontSize * (token.lineHeight / 2) - token.fontSize / 2),
    descriptionLineHeight: token.fontSize + 8
  };
}

export interface NzCalendarComponentToken {
  inputPaddingInline: number;
}

export function genCalendarToken(token: NzAliasToken): NzCalendarComponentToken {
  return { inputPaddingInline: token.controlPaddingHorizontal - 2 };
}

export interface NzDropdownComponentToken {
  selectedPaddingInlineEnd: number;
}

export function genDropdownToken(token: NzAliasToken): NzDropdownComponentToken {
  return { selectedPaddingInlineEnd: token.controlPaddingHorizontal + token.fontSizeSM };
}

export interface NzFloatButtonComponentToken {
  groupMarginOffset: number;
  badgeOffset: number;
  badgeInset: number;
  groupBadgeInset: number;
  bodySize: number;
  iconSize: number;
}

export function genFloatButtonToken(token: NzAliasToken): NzFloatButtonComponentToken {
  return {
    groupMarginOffset: -token.padding,
    badgeOffset: token.paddingXXS * 1.5,
    badgeInset: -token.paddingXXS * 1.5,
    groupBadgeInset: -(token.paddingXXS + token.paddingXXS * 1.5),
    bodySize: FLOAT_BUTTON_SIZE - token.paddingXXS * 2,
    iconSize: token.fontSizeSM * 1.5
  };
}

export interface NzMenuComponentToken {
  itemHeight: number;
  inlineToplevelItemHeight: number;
  horizontalLineHeight: number;
  itemPaddingInline: number;
  itemVerticalMargin: number;
  itemBoundaryMargin: number;
  iconMarginInlineEnd: number;
}

/**
 * The menu metrics are independent literals per theme in v4 (default.less vs
 * compact.less); these formulas reproduce both value sets exactly
 * (default/compact): 40/32, 46/38, 20/12, 4/0, 8/0, 10/8.
 */
export function genMenuToken(token: NzAliasToken): NzMenuComponentToken {
  return {
    itemHeight: token.controlHeightLG,
    inlineToplevelItemHeight: token.controlHeightLG,
    horizontalLineHeight: token.controlHeightLG + 6,
    itemPaddingInline: token.controlPaddingHorizontal + token.paddingXS,
    itemVerticalMargin: token.paddingXXS,
    itemBoundaryMargin: token.paddingXXS * 2,
    iconMarginInlineEnd: token.fontSize - 4
  };
}

export interface NzModalComponentToken {
  headerCloseSize: number;
}

export function genModalToken(token: NzAliasToken): NzModalComponentToken {
  return { headerCloseSize: MODAL_HEADER_TITLE_LINE_HEIGHT + 2 * token.padding };
}

export interface NzPaginationComponentToken {
  itemLineHeight: number;
}

export function genPaginationToken(token: NzAliasToken): NzPaginationComponentToken {
  return { itemLineHeight: token.controlHeight - 2 };
}

export interface NzSkeletonComponentToken {
  buttonWidth: number;
  buttonWidthLG: number;
  buttonWidthSM: number;
  inputWidth: number;
  inputWidthLG: number;
  inputWidthSM: number;
}

export function genSkeletonToken(token: NzAliasToken): NzSkeletonComponentToken {
  return {
    buttonWidth: token.controlHeight * 2,
    buttonWidthLG: token.controlHeightLG * 2,
    buttonWidthSM: token.controlHeightSM * 2,
    inputWidth: token.controlHeight * 5,
    inputWidthLG: token.controlHeightLG * 5,
    inputWidthSM: token.controlHeightSM * 5
  };
}

export interface NzSpinComponentToken {
  textPaddingTop: number;
  textPaddingTopSM: number;
  textPaddingTopLG: number;
}

export function genSpinToken(token: NzAliasToken): NzSpinComponentToken {
  return {
    textPaddingTop: (SPIN_DOT_SIZE - token.fontSize) / 2 + 2,
    textPaddingTopSM: (SPIN_DOT_SIZE_SM - token.fontSize) / 2 + 2,
    textPaddingTopLG: (SPIN_DOT_SIZE_LG - token.fontSize) / 2 + 2
  };
}

export interface NzStepsComponentToken {
  progressIconTop: number;
}

export function genStepsToken(token: NzAliasToken): NzStepsComponentToken {
  return { progressIconTop: token.controlHeight / 2 };
}

export interface NzSwitchComponentToken {
  loadingIconTop: number;
}

export function genSwitchToken(token: NzAliasToken): NzSwitchComponentToken {
  return { loadingIconTop: (SWITCH_HEIGHT - 4 - token.fontSize) / 2 };
}

export interface NzTableComponentToken {
  expandIconSize: number;
  expandIconOffset: number;
  /** Ratio scaling the expand icon down to the checkbox size (unitless). */
  expandIconScale: number;
  expandIconMarginTop: number;
  rtlExpandIconMarginInlineEnd: number;
}

export function genTableToken(token: NzAliasToken): NzTableComponentToken {
  const halfIconSize = Math.ceil((token.fontSizeSM * 1.4 - token.lineWidth * 3) / 2);
  const expandIconSize = halfIconSize * 2 + token.lineWidth * 3;
  return {
    expandIconSize,
    expandIconOffset: halfIconSize,
    expandIconScale: lessRound(CHECKBOX_SIZE / expandIconSize),
    expandIconMarginTop: lessRound((token.fontSize * token.lineHeight - token.lineWidth * 3) / 2 - halfIconSize),
    rtlExpandIconMarginInlineEnd: TABLE_PADDING_HORIZONTAL + Math.ceil(token.fontSizeSM * 1.4)
  };
}

export interface NzTabsComponentToken {
  /** Two-value padding shorthand of card tabs, e.g. `8px 16px`. */
  cardHorizontalPadding: string;
  cardTabLineHeight: number;
  cardTabLineHeightLG: number;
  cardTabLineHeightSM: number;
  removeMarginInlineEnd: number;
  editableCardPaddingInlineEnd: number;
}

export function genTabsToken(token: NzAliasToken): NzTabsComponentToken {
  const cardPaddingBlock = (TABS_CARD_HEIGHT - Math.floor(token.fontSize * token.lineHeight)) / 2 - token.lineWidth;
  return {
    cardHorizontalPadding: `${lessRound(cardPaddingBlock)}px ${token.padding}px`,
    cardTabLineHeight: lessRound(token.fontSize * token.lineHeight + token.paddingSM * 2),
    cardTabLineHeightLG: lessRound(token.fontSizeLG * token.lineHeight + token.padding * 2),
    cardTabLineHeightSM: lessRound(token.fontSize * token.lineHeight + token.paddingXS * 2),
    removeMarginInlineEnd: -token.paddingXXS,
    editableCardPaddingInlineEnd: token.padding + 2
  };
}

export interface NzTimelineComponentToken {
  customHeadTop: number;
  contentMarginInlineStart: number;
}

export function genTimelineToken(token: NzAliasToken): NzTimelineComponentToken {
  return {
    customHeadTop: lessRound(-(token.fontSize * token.lineHeight - token.fontSize) + 1),
    contentMarginInlineStart: token.paddingLG + 2
  };
}

export interface NzTransferComponentToken {
  itemLineHeight: number;
  headerPaddingBlock: number;
  headerPaddingBlockStart: number;
}

export function genTransferToken(token: NzAliasToken): NzTransferComponentToken {
  // v4 subtracts a literal 1px here, not @border-width-base.
  const headerPaddingBlock = Math.ceil((TRANSFER_HEADER_HEIGHT - 1 - token.fontSize * token.lineHeight) / 2);
  return {
    itemLineHeight: token.controlHeight - 2 * TRANSFER_ITEM_PADDING_VERTICAL,
    headerPaddingBlock,
    headerPaddingBlockStart: headerPaddingBlock - 1
  };
}

export interface NzTreeComponentToken {
  nodePaddingNegative: number;
}

export function genTreeToken(token: NzAliasToken): NzTreeComponentToken {
  return { nodePaddingNegative: -(token.paddingXS / 2) };
}

export interface NzUploadComponentToken {
  listItemHeight: number;
  listItemPaddingInlineStart: number;
  pictureItemPaddingInlineStart: number;
  actionIconTop: number;
}

export function genUploadToken(token: NzAliasToken): NzUploadComponentToken {
  return {
    listItemHeight: lessRound(token.lineHeight * token.fontSize),
    listItemPaddingInlineStart: token.fontSize + 8,
    pictureItemPaddingInlineStart: token.fontSize + 12,
    actionIconTop: token.fontSize / 2 - 2
  };
}
