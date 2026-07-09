/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { nzCompactAlgorithm } from './algorithms/compact';
import { nzDarkAlgorithm } from './algorithms/dark';
import { nzDefaultAlgorithm } from './algorithms/default';
import { formatToken } from './alias';
import { genButtonToken, NzButtonComponentToken } from './components/button';
import {
  genDatePickerToken,
  genFormToken,
  genInputNumberToken,
  genMentionToken,
  genRadioToken,
  genSegmentedToken,
  genSelectToken,
  genTypographyToken
} from './components/controls';
import {
  genAlertToken,
  genCalendarToken,
  genDropdownToken,
  genFloatButtonToken,
  genMenuToken,
  genModalToken,
  genPaginationToken,
  genSkeletonToken,
  genSpinToken,
  genStepsToken,
  genSwitchToken,
  genTableToken,
  genTabsToken,
  genTimelineToken,
  genTransferToken,
  genTreeToken,
  genUploadToken
} from './components/global';
import { genInputToken } from './components/input';
import { NzComponentTokens } from './components/token';
import { tokenToCssVars } from './css-variables';
import { NzAliasToken } from './interfaces';
import { nzDefaultSeedToken } from './seed';

function defaultAlias(): NzAliasToken {
  return formatToken(nzDefaultAlgorithm(nzDefaultSeedToken));
}

describe('design tokens', () => {
  describe('default algorithm (v4 parity)', () => {
    const map = nzDefaultAlgorithm(nzDefaultSeedToken);

    it('should derive the primary palette like colorPalette()', () => {
      expect(map.colorPrimary).toBe('#1890ff');
      expect(map.colorPrimaryHover).toBe('#40a9ff'); // colorPalette(5)
      expect(map.colorPrimaryActive).toBe('#096dd9'); // colorPalette(7)
      expect(map.colorPrimaryTextHover).toBe('#40a9ff'); // @primary-5
      expect(map.colorPrimaryBg).toBe('#e6f7ff'); // @primary-1
      expect(map.colorPrimaryBgHover).toBe('#bae7ff'); // @primary-2
      expect(map.colorPrimaryBorder).toBe('#91d5ff'); // @primary-3
      expect(map.colorPrimaryBorderHover).toBe('#69c0ff'); // @primary-4
    });

    it('should derive text colors as black alpha steps', () => {
      expect(map.colorText).toBe('rgba(0, 0, 0, 0.85)');
      expect(map.colorTextSecondary).toBe('rgba(0, 0, 0, 0.45)');
      expect(map.colorTextQuaternary).toBe('rgba(0, 0, 0, 0.25)');
    });

    it('should use the v4 neutral literals', () => {
      expect(map.colorBorder).toBe('#d9d9d9');
      expect(map.colorSplit).toBe('#f0f0f0');
      expect(map.colorFillAlter).toBe('#fafafa');
      expect(map.colorFillContent).toBe('#f5f5f5');
      expect(map.colorBgContainer).toBe('#fff');
      expect(map.colorBgLayout).toBe('#f0f2f5');
    });

    it('should derive sizes, heights, radius and fonts like default.less', () => {
      expect(map.controlHeight).toBe(32);
      expect(map.controlHeightSM).toBe(24);
      expect(map.controlHeightLG).toBe(40);
      expect(map.borderRadius).toBe(2);
      expect(map.borderRadiusSM).toBe(2);
      expect(map.borderRadiusLG).toBe(4);
      expect(map.fontSize).toBe(14);
      expect(map.fontSizeLG).toBe(16);
      expect(map.fontSizeSM).toBe(12);
      expect([
        map.fontSizeHeading1,
        map.fontSizeHeading2,
        map.fontSizeHeading3,
        map.fontSizeHeading4,
        map.fontSizeHeading5
      ]).toEqual([38, 30, 24, 20, 16]);
      expect(map.lineHeight).toBe(1.5715);
      expect(map.lineHeightLG).toBe(1.5);
      expect([map.sizeXXS, map.sizeXS, map.sizeSM, map.size, map.sizeLG]).toEqual([4, 8, 12, 16, 24]);
      expect(map.motionDurationSlow).toBe('0.3s');
    });
  });

  describe('dark algorithm (v4 dark.less parity)', () => {
    const map = nzDarkAlgorithm(nzDefaultSeedToken);

    it('should mix palettes with the dark component background', () => {
      expect(map.colorPrimary).toBe('#177ddc'); // dark @blue-6
      expect(map.colorPrimaryBg).toBe('#111d2c'); // dark @primary-1
      expect(map.colorPrimaryTextHover).toBe('#1765ad'); // dark @primary-5
    });

    it('should place the error color at dark @red-5, generated from the @red-6 base', () => {
      expect(map.colorError).toBe('#a61d24'); // dark @red-5: mix(#f5222d, #141414, 65%)
      expect(map.colorErrorBg).toBe('#2a1215'); // dark @red-1
      expect(map.colorErrorBorder).toBe('#58181c'); // dark @red-3
      expect(map.colorSuccess).toBe('#49aa19'); // dark @green-6 (palette bases stay at step 6)
    });

    it('should use the dark neutral overrides', () => {
      expect(map.colorBgContainer).toBe('#141414');
      expect(map.colorBgElevated).toBe('#1f1f1f');
      expect(map.colorBgLayout).toBe('#000');
      expect(map.colorBorder).toBe('#434343');
      expect(map.colorSplit).toBe('#303030');
      expect(map.colorText).toBe('rgba(255, 255, 255, 0.85)');
      expect(map.colorTextQuaternary).toBe('rgba(255, 255, 255, 0.3)');
      expect(map.colorFillContent).toBe('rgba(255, 255, 255, 0.08)');
      expect(map.colorBgTextHover).toBe('rgba(255, 255, 255, 0.03)');
    });
  });

  describe('compact algorithm (v4 compact.less parity)', () => {
    const map = nzCompactAlgorithm(nzDefaultSeedToken);

    it('should shrink fonts, heights and paddings', () => {
      expect(map.fontSize).toBe(12);
      expect(map.fontSizeLG).toBe(14);
      expect(map.lineHeight).toBe(1.66667);
      expect(map.lineHeightLG).toBe(1.5715);
      expect(map.controlHeight).toBe(28);
      expect(map.controlHeightLG).toBe(32);
      expect(map.controlHeightSM).toBe(22);
      expect([map.sizeXXS, map.sizeXS, map.sizeSM, map.size, map.sizeLG]).toEqual([0, 4, 8, 8, 16]);
    });

    it('should compose after the dark algorithm', () => {
      const composed = nzCompactAlgorithm(nzDefaultSeedToken, nzDarkAlgorithm(nzDefaultSeedToken));
      expect(composed.colorPrimary).toBe('#177ddc');
      expect(composed.colorBgContainer).toBe('#141414');
      expect(composed.controlHeight).toBe(28);
      expect(composed.fontSize).toBe(12);
    });
  });

  describe('alias layer', () => {
    const alias = defaultAlias();

    it('should derive the alias tokens like default.less', () => {
      expect(alias.colorLink).toBe('#1890ff');
      expect(alias.colorLinkHover).toBe('#40a9ff');
      expect(alias.colorLinkActive).toBe('#096dd9');
      expect(alias.colorTextDisabled).toBe('rgba(0, 0, 0, 0.25)');
      expect(alias.colorBgContainerDisabled).toBe('#f5f5f5');
      expect(alias.controlOutline).toBe('rgba(24, 144, 255, 0.2)');
      expect(alias.controlOutlineWidth).toBe(2);
      expect([alias.paddingXXS, alias.paddingXS, alias.paddingSM, alias.padding, alias.paddingLG]).toEqual([
        4, 8, 12, 16, 24
      ]);
    });
  });

  describe('button component token (v4 @btn-* parity)', () => {
    const button: NzButtonComponentToken = genButtonToken(defaultAlias());

    it('should reproduce the .button-size() padding math', () => {
      expect(button.paddingBlock).toBe(4);
      expect(button.paddingBlockLG).toBe(6.4);
      expect(button.paddingBlockSM).toBe(0);
      expect(button.paddingInline).toBe(15);
      expect(button.paddingInlineLG).toBe(15);
      expect(button.paddingInlineSM).toBe(7);
      expect(button.onlyIconPaddingBlock).toBe(2.4);
      expect(button.onlyIconPaddingBlockLG).toBe(4.9);
      expect(button.onlyIconPaddingBlockSM).toBe(0);
      expect([button.circlePaddingInline, button.circlePaddingInlineLG, button.circlePaddingInlineSM]).toEqual([
        16, 20, 12
      ]);
      expect([button.anchorLineHeight, button.anchorLineHeightLG, button.anchorLineHeightSM]).toEqual([30, 38, 22]);
    });

    it('should reproduce the @btn-* colors and fonts', () => {
      expect(button.fontWeight).toBe(400);
      expect(button.defaultColor).toBe('rgba(0, 0, 0, 0.85)');
      expect(button.defaultBg).toBe('#fff');
      expect(button.defaultBorderColor).toBe('#d9d9d9');
      expect(button.ghostColor).toBe('#fff');
      expect(button.groupBorderColor).toBe('#40a9ff');
      expect(button.textHoverBg).toBe('rgba(0, 0, 0, 0.018)');
      expect(button.textActiveBg).toBe('rgba(0, 0, 0, 0.028)');
      expect([button.contentFontSize, button.contentFontSizeLG, button.contentFontSizeSM]).toEqual([14, 16, 14]);
      expect([button.onlyIconSize, button.onlyIconSizeLG, button.onlyIconSizeSM]).toEqual([16, 18, 14]);
      expect(button.borderRadius).toBe(2);
      expect(button.borderRadiusSM).toBe(2);
    });

    it('should follow the compact algorithm', () => {
      const compactButton = genButtonToken(formatToken(nzCompactAlgorithm(nzDefaultSeedToken)));
      expect(compactButton.paddingBlock).toBe(3);
      expect(compactButton.paddingBlockLG).toBe(3.3);
      expect(compactButton.paddingBlockSM).toBe(0);
      expect(compactButton.paddingInline).toBe(11);
      expect(compactButton.paddingInlineSM).toBe(7);
      expect([compactButton.onlyIconSize, compactButton.onlyIconSizeLG, compactButton.onlyIconSizeSM]).toEqual([
        14, 16, 12
      ]);
    });

    it('should follow the dark algorithm', () => {
      const darkButton = genButtonToken(formatToken(nzDarkAlgorithm(nzDefaultSeedToken)));
      expect(darkButton.defaultColor).toBe('rgba(255, 255, 255, 0.85)');
      expect(darkButton.ghostColor).toBe('rgba(255, 255, 255, 0.85)');
      expect(darkButton.ghostBorderColor).toBe('rgba(255, 255, 255, 0.25)');
      expect(darkButton.groupBorderColor).toBe('#1765ad'); // dark @primary-5
      expect(darkButton.textHoverBg).toBe('rgba(255, 255, 255, 0.03)');
    });

    it('should follow seed overrides', () => {
      const seeded = genButtonToken(formatToken(nzDefaultAlgorithm({ ...nzDefaultSeedToken, controlHeight: 40 })));
      expect(seeded.controlHeight).toBe(40);
      expect(seeded.anchorLineHeight).toBe(38);
    });
  });

  describe('input component token (v4 @input-* parity)', () => {
    const input = genInputToken(defaultAlias());

    it('should reproduce the @input-padding-* formulas', () => {
      expect(input.paddingBlock).toBe(4);
      expect(input.paddingBlockLG).toBe(6.5);
      expect(input.paddingBlockSM).toBe(0);
      expect(input.paddingInline).toBe(11); // @control-padding-horizontal - @line-width
      expect(input.paddingInlineSM).toBe(7);
      expect(input.addonSelectMarginBlock).toBe(-5);
      expect(input.addonSelectMarginInline).toBe(-11);
      expect([input.controlHeight, input.controlHeightLG, input.controlHeightSM]).toEqual([32, 40, 24]);
    });

    it('should reproduce the @input-* colors', () => {
      expect(input.color).toBe('rgba(0, 0, 0, 0.85)');
      expect(input.bg).toBe('#fff');
      expect(input.borderColor).toBe('#d9d9d9');
      expect(input.hoverBorderColor).toBe('#40a9ff'); // @primary-5
      expect(input.placeholderColor).toBe('#bfbfbf'); // hsv(0, 0, 75%)
      expect(input.addonBg).toBe('#fafafa');
      expect(input.disabledBg).toBe('#f5f5f5');
    });

    it('should follow the compact algorithm', () => {
      const compact = genInputToken(formatToken(nzCompactAlgorithm(nzDefaultSeedToken)));
      expect(compact.paddingBlock).toBe(3);
      expect(compact.paddingBlockSM).toBe(0);
      expect(compact.paddingInline).toBe(7); // compact @control-padding-horizontal (8) - 1
      expect(compact.paddingInlineSM).toBe(7);
    });

    it('should follow the dark algorithm', () => {
      const dark = genInputToken(formatToken(nzDarkAlgorithm(nzDefaultSeedToken)));
      expect(dark.bg).toBe('#141414');
      expect(dark.borderColor).toBe('#434343');
      expect(dark.placeholderColor).toBe('rgba(255, 255, 255, 0.3)');
      expect(dark.iconColor).toBe('rgba(255, 255, 255, 0.3)');
      expect(dark.hoverBorderColor).toBe('#1765ad'); // dark @primary-5
    });
  });

  describe('input-derived control tokens', () => {
    const alias = defaultAlias();
    const input = genInputToken(alias);

    it('should reproduce the select derived metrics', () => {
      const select = genSelectToken(alias, input);
      expect(select.multipleItemHeight).toBe(24); // 32 - 4 * 2
      expect(select.multipleItemHeightSM).toBe(16);
      expect(select.multipleItemSpacingHalf).toBe(2); // ceil(4 / 2)
      expect(select.singleContentHeight).toBe(30);
      expect(select.singleContentHeightSM).toBe(22);
      expect(select.smallArrowPaddingInlineEnd).toBe(28); // 7 + 14 * 1.5
    });

    it('should reproduce the date-picker paddings', () => {
      const picker = genDatePickerToken(alias, input);
      expect([picker.paddingBlockStart, picker.paddingBlockEnd]).toEqual([4, 4]);
      expect([picker.paddingBlockStartLG, picker.paddingBlockEndLG]).toEqual([6.5, 6.5]);
      expect([picker.paddingBlockStartSM, picker.paddingBlockEndSM]).toEqual([0, 0]);
      expect(picker.presetOffset).toBe(16.5); // 11 * 1.5
    });

    it('should reproduce the remaining derived metrics', () => {
      expect(genInputNumberToken(alias)).toEqual({ innerHeight: 30, innerHeightLG: 38, innerHeightSM: 22 });
      expect(genMentionToken(alias)).toEqual({ editorMinHeight: 30 });
      expect(genRadioToken(alias)).toEqual({ buttonLineHeightLG: 38, buttonLineHeightSM: 22, buttonPaddingInline: 15 });
      expect(genSegmentedToken(alias)).toEqual({ itemMinHeight: 28, itemMinHeightLG: 36, itemMinHeightSM: 20 });
      expect(genTypographyToken(alias, input)).toEqual({ editContentInset: -12, editContentMarginBlockStart: -5 });
      expect(genFormToken(alias, input)).toEqual({
        rtlFeedbackPaddingLeft: 29.2, // 11 + 14 * 1.3
        rtlFeedbackPaddingLeftLG: 29.2,
        rtlFeedbackPaddingLeftSM: 25.2,
        labelWrapLineHeight: '1.3215em'
      });
    });
  });

  describe('global-size derived component tokens', () => {
    function componentTokens(alias: NzAliasToken): NzComponentTokens {
      const input = genInputToken(alias);
      return {
        button: genButtonToken(alias),
        input,
        select: genSelectToken(alias, input),
        datePicker: genDatePickerToken(alias, input),
        inputNumber: genInputNumberToken(alias),
        mention: genMentionToken(alias),
        radio: genRadioToken(alias),
        segmented: genSegmentedToken(alias),
        typography: genTypographyToken(alias, input),
        form: genFormToken(alias, input),
        alert: genAlertToken(alias),
        calendar: genCalendarToken(alias),
        dropdown: genDropdownToken(alias),
        floatButton: genFloatButtonToken(alias),
        menu: genMenuToken(alias),
        modal: genModalToken(alias),
        pagination: genPaginationToken(alias),
        skeleton: genSkeletonToken(alias),
        spin: genSpinToken(alias),
        steps: genStepsToken(alias),
        switch: genSwitchToken(alias),
        table: genTableToken(alias),
        tabs: genTabsToken(alias),
        timeline: genTimelineToken(alias),
        transfer: genTransferToken(alias),
        tree: genTreeToken(alias),
        upload: genUploadToken(alias)
      };
    }

    it('should reproduce the themes/token.less defaults exactly', () => {
      const alias = defaultAlias();
      const vars = tokenToCssVars(alias, componentTokens(alias), 'ant');

      // Expected values are the compiled `html {}` defaults of the token
      // bundle (`ng-zorro-antd.token.css`); see the guarded
      // `.control-derived-theme-variables()` formulas in the Less themes.
      const expected: Record<string, string> = {
        '--ant-padding-xs-half': '4px',
        '--ant-margin-xs-half': '4px',
        '--ant-margin-sm-half': '6px',
        '--ant-font-height': '22px',
        '--ant-radio-button-padding-inline': '15px',
        '--ant-tabs-card-horizontal-padding': '8px 16px',
        '--ant-alert-padding-inline': '15px',
        '--ant-alert-with-description-padding-block': '15px',
        '--ant-alert-icon-top': '12.0005px',
        '--ant-alert-description-line-height': '22px',
        '--ant-modal-header-close-size': '54px',
        '--ant-float-button-group-margin-offset': '-16px',
        '--ant-float-button-badge-offset': '6px',
        '--ant-float-button-badge-inset': '-6px',
        '--ant-float-button-group-badge-inset': '-10px',
        '--ant-float-button-body-size': '32px',
        '--ant-float-button-icon-size': '18px',
        '--ant-input-suffix-margin-inline': '-12px',
        '--ant-input-feedback-padding-inline-end': '28px',
        '--ant-input-search-line-height': '1.5713',
        '--ant-pagination-item-line-height': '30px',
        '--ant-steps-progress-icon-top': '16px',
        '--ant-tabs-remove-margin-inline-end': '-4px',
        '--ant-tabs-card-tab-line-height': '46.001px',
        '--ant-tabs-card-tab-line-height-lg': '57.144px',
        '--ant-tabs-card-tab-line-height-sm': '38.001px',
        '--ant-tabs-editable-card-padding-inline-end': '18px',
        '--ant-transfer-item-line-height': '20px',
        '--ant-transfer-header-padding-block-start': '8px',
        '--ant-transfer-header-padding-block': '9px',
        '--ant-calendar-input-padding-inline': '10px',
        '--ant-dropdown-selected-padding-inline-end': '24px',
        '--ant-form-label-wrap-line-height': '1.3215em',
        '--ant-date-picker-panel-width': '280px',
        '--ant-date-picker-year-month-cell-margin': '14px',
        '--ant-date-picker-footer-extra-line-height': '34px',
        '--ant-select-icon-margin-top': '-6px',
        '--ant-select-grouped-padding-inline-start': '24px',
        '--ant-select-show-arrow-item-padding-inline-end': '21px',
        '--ant-select-single-arrow-padding': '18px',
        '--ant-select-single-arrow-padding-lg': '20px',
        '--ant-skeleton-button-width': '64px',
        '--ant-skeleton-button-width-lg': '80px',
        '--ant-skeleton-button-width-sm': '48px',
        '--ant-skeleton-input-width': '160px',
        '--ant-skeleton-input-width-lg': '200px',
        '--ant-skeleton-input-width-sm': '120px',
        '--ant-table-expand-icon-size': '17px',
        '--ant-table-expand-icon-offset': '7px',
        '--ant-table-expand-icon-scale': '0.94117647',
        '--ant-table-expand-icon-margin-top': '2.5005px',
        '--ant-table-rtl-expand-icon-margin-inline-end': '33px',
        '--ant-timeline-custom-head-top': '-7.001px',
        '--ant-timeline-content-margin-inline-start': '26px',
        '--ant-upload-list-item-height': '22.001px',
        '--ant-upload-list-item-padding-inline-start': '22px',
        '--ant-upload-picture-item-padding-inline-start': '26px',
        '--ant-upload-action-icon-top': '5px',
        '--ant-spin-text-padding-top': '5px',
        '--ant-spin-text-padding-top-sm': '2px',
        '--ant-spin-text-padding-top-lg': '11px',
        '--ant-switch-loading-icon-top': '2px',
        '--ant-tree-node-padding-negative': '-4px',
        '--ant-menu-item-height': '40px',
        '--ant-menu-inline-toplevel-item-height': '40px',
        '--ant-menu-horizontal-line-height': '46px',
        '--ant-menu-item-padding-inline': '20px',
        '--ant-menu-item-vertical-margin': '4px',
        '--ant-menu-item-boundary-margin': '8px',
        '--ant-menu-icon-margin-inline-end': '10px'
      };
      for (const [name, value] of Object.entries(expected)) {
        expect(vars[name], name).toBe(value);
      }
    });

    it('should follow the compact algorithm', () => {
      const alias = formatToken(nzCompactAlgorithm(nzDefaultSeedToken));
      expect(genPaginationToken(alias).itemLineHeight).toBe(26); // 28 - 2
      expect(genStepsToken(alias).progressIconTop).toBe(14);
      expect(genSkeletonToken(alias).buttonWidth).toBe(56);
      expect(genDropdownToken(alias).selectedPaddingInlineEnd).toBe(20); // 8 + 12
      expect(genUploadToken(alias).listItemPaddingInlineStart).toBe(20);
      expect(genTabsToken(alias).cardHorizontalPadding).toBe('9px 8px'); // (40 - floor(12 * 1.66667)) / 2 - 1
      // The compact.less menu overrides: 32/32/38/12/0/0/8.
      expect(genMenuToken(alias)).toEqual({
        itemHeight: 32,
        inlineToplevelItemHeight: 32,
        horizontalLineHeight: 38,
        itemPaddingInline: 12,
        itemVerticalMargin: 0,
        itemBoundaryMargin: 0,
        iconMarginInlineEnd: 8
      });
    });
  });
});
