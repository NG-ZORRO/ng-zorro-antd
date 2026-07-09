/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzComponentTokenMap } from './components/token';

/**
 * Seed tokens are the origin of the whole token system: every other token is
 * derived from them by an algorithm. Default values reproduce the current
 * (Ant Design v4 era) visual style of ng-zorro-antd, NOT Ant Design v5 defaults.
 */
export interface NzSeedToken {
  colorPrimary: string;
  colorSuccess: string;
  colorWarning: string;
  colorError: string;
  colorInfo: string;
  /** Base color from which text colors are derived by alpha steps. */
  colorTextBase: string;
  /** Base color from which background colors are derived. */
  colorBgBase: string;
  fontFamily: string;
  codeFamily: string;
  fontSize: number;
  /**
   * Kept as a seed (unlike Ant Design v5, which derives it) so the v4 value
   * `1.5715` can be reproduced exactly.
   */
  lineHeight: number;
  borderRadius: number;
  controlHeight: number;
  lineWidth: number;
  lineType: string;
  sizeUnit: number;
  sizeStep: number;
  motionUnit: number;
  motionBase: number;
  zIndexBase: number;
  zIndexPopupBase: number;
  opacityImage: number;
  /** Reserved for future v5/v6 visual presets. The v4 look is wireframe-like. */
  wireframe: boolean;
  motion: boolean;
}

/**
 * Map tokens are derived from seed tokens by algorithms (default/dark/compact)
 * and are gradient values: palettes, size scales, font scales.
 */
export interface NzMapToken extends NzSeedToken {
  // ======== Primary palette ========
  colorPrimaryBg: string;
  colorPrimaryBgHover: string;
  colorPrimaryBorder: string;
  colorPrimaryBorderHover: string;
  colorPrimaryHover: string;
  colorPrimaryActive: string;
  /** Step 5 of the palette (v4 `@primary-5`); differs from `colorPrimaryHover` in dark themes. */
  colorPrimaryTextHover: string;

  // ======== Success palette ========
  colorSuccessBg: string;
  colorSuccessBgHover: string;
  colorSuccessBorder: string;
  colorSuccessBorderHover: string;
  colorSuccessHover: string;
  colorSuccessActive: string;
  colorSuccessTextHover: string;

  // ======== Warning palette ========
  colorWarningBg: string;
  colorWarningBgHover: string;
  colorWarningBorder: string;
  colorWarningBorderHover: string;
  colorWarningHover: string;
  colorWarningActive: string;
  colorWarningTextHover: string;

  // ======== Error palette ========
  colorErrorBg: string;
  colorErrorBgHover: string;
  colorErrorBorder: string;
  colorErrorBorderHover: string;
  colorErrorHover: string;
  colorErrorActive: string;
  colorErrorTextHover: string;

  // ======== Info palette ========
  colorInfoBg: string;
  colorInfoBgHover: string;
  colorInfoBorder: string;
  colorInfoBorderHover: string;
  colorInfoHover: string;
  colorInfoActive: string;
  colorInfoTextHover: string;

  // ======== Neutral text ========
  colorText: string;
  colorTextSecondary: string;
  colorTextTertiary: string;
  colorTextQuaternary: string;
  colorTextPlaceholder: string;
  colorIcon: string;

  // ======== Neutral background ========
  colorBgContainer: string;
  colorBgElevated: string;
  colorBgLayout: string;
  colorBgMask: string;

  // ======== Neutral border/fill ========
  colorBorder: string;
  colorSplit: string;
  colorFillAlter: string;
  colorFillContent: string;
  colorBgTextHover: string;
  colorBgTextActive: string;

  // ======== Item states ========
  controlItemBgHover: string;
  controlItemBgActive: string;

  // ======== Size scale ========
  sizeXXS: number;
  sizeXS: number;
  sizeSM: number;
  size: number;
  sizeLG: number;

  // ======== Control heights & paddings ========
  controlHeightSM: number;
  controlHeightLG: number;
  /** v4 `@control-padding-horizontal`: basis for horizontal paddings of form controls. */
  controlPaddingHorizontal: number;
  /** v4 `@control-padding-horizontal-sm`. */
  controlPaddingHorizontalSM: number;

  // ======== Radius scale ========
  borderRadiusXS: number;
  borderRadiusSM: number;
  borderRadiusLG: number;

  // ======== Font scale ========
  fontSizeSM: number;
  fontSizeLG: number;
  fontSizeIcon: number;
  fontSizeHeading1: number;
  fontSizeHeading2: number;
  fontSizeHeading3: number;
  fontSizeHeading4: number;
  fontSizeHeading5: number;
  lineHeightLG: number;

  // ======== Motion ========
  motionDurationFast: string;
  motionDurationMid: string;
  motionDurationSlow: string;
  motionEaseInOut: string;
  motionEaseOut: string;
  motionEaseIn: string;
  motionEaseOutBack: string;
  motionEaseInBack: string;
  motionEaseOutCirc: string;
  motionEaseInOutCirc: string;
  motionEaseOutQuint: string;
  motionEaseInQuint: string;

  // ======== Shadow ========
  boxShadow: string;
  boxShadowSecondary: string;
}

/**
 * Alias tokens are the layer components consume. They are derived from map
 * tokens by {@link formatToken} and can be overridden individually via
 * `NzThemeConfig.token`.
 */
export interface NzAliasToken extends NzMapToken {
  colorTextHeading: string;
  colorTextDisabled: string;
  colorTextDescription: string;
  colorLink: string;
  colorLinkHover: string;
  colorLinkActive: string;
  colorHighlight: string;
  colorBgContainerDisabled: string;
  controlOutline: string;
  controlOutlineWidth: number;
  fontWeightStrong: number;
  paddingXXS: number;
  paddingXS: number;
  paddingSM: number;
  padding: number;
  paddingLG: number;
  marginXXS: number;
  marginXS: number;
  marginSM: number;
  margin: number;
  marginLG: number;
}

/**
 * An algorithm derives map tokens from seed tokens. Algorithms are composable:
 * when chained (e.g. `[nzDarkAlgorithm, nzCompactAlgorithm]`), each receives
 * the map produced by the previous one as the second argument.
 */
export type NzThemeAlgorithm = (seed: NzSeedToken, map?: NzMapToken) => NzMapToken;

export interface NzThemeConfig {
  /**
   * Token overrides. Seed-level keys (e.g. `colorPrimary`) feed the algorithms;
   * map/alias-level keys are applied on top of the derived result.
   */
  token?: Partial<NzAliasToken>;
  /** Derivation algorithm(s). Defaults to `nzDefaultAlgorithm`. */
  algorithm?: NzThemeAlgorithm | NzThemeAlgorithm[];
  /** Per-component token overrides. */
  components?: NzComponentTokenMap;
  /** Prefix for the emitted CSS custom properties. Defaults to `ant`. */
  cssVarPrefix?: string;
}
