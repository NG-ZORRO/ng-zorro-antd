/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TinyColor } from '@ctrl/tinycolor';

import { generate } from 'ng-zorro-antd/core/color';

import { NzComponentTokens } from './components/token';
import { NzAliasToken } from './interfaces';

/** Tokens that are numeric but must not get a `px` unit. */
const UNITLESS_TOKENS = new Set<string>([
  'lineHeight',
  'lineHeightLG',
  'fontWeight',
  'fontWeightStrong',
  'zIndexBase',
  'zIndexPopupBase',
  'opacityImage',
  'sizeUnit',
  'sizeStep',
  'motionUnit',
  'motionBase',
  'searchLineHeight',
  'expandIconScale'
]);

/** Tokens that carry no CSS-consumable value. */
const NON_CSS_TOKENS = new Set<string>(['wireframe', 'motion', 'sizeUnit', 'sizeStep', 'motionUnit', 'motionBase']);

function kebabCase(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, '$1-$2')
    .toLowerCase();
}

/** `colorPrimary` -> `color-primary`, `fontSizeHeading1` -> `font-size-heading1`. */
export function tokenToCssVarName(token: string, prefix: string): string {
  return `--${prefix}-${kebabCase(token)}`;
}

function serializeTokenValue(key: string, value: string | number | boolean | null | undefined): string | null {
  if (value === null || value === undefined || typeof value === 'boolean' || NON_CSS_TOKENS.has(key)) {
    return null;
  }
  if (typeof value === 'number') {
    return UNITLESS_TOKENS.has(key) ? `${value}` : `${value}px`;
  }
  return value;
}

/**
 * Serializes alias tokens and component tokens into CSS custom property
 * declarations, e.g. `--ant-color-primary: #1890ff`. Component tokens are
 * namespaced: `--ant-button-padding-inline: 15px`.
 */
export function tokenToCssVars(
  alias: NzAliasToken,
  components: NzComponentTokens,
  prefix: string
): Record<string, string> {
  const vars: Record<string, string> = {};

  for (const [key, value] of Object.entries(alias)) {
    const serialized = serializeTokenValue(key, value as string | number | boolean);
    if (serialized !== null) {
      vars[tokenToCssVarName(key, prefix)] = serialized;
    }
  }

  // Derived alias values consumed by `themes/token.less` (the guarded
  // `.control-derived-theme-variables()` formulas of the Less themes).
  const derivedAlias: Record<string, number> = {
    paddingXSHalf: alias.paddingXS / 2,
    marginXSHalf: alias.marginXS / 2,
    marginSMHalf: alias.marginSM / 2,
    fontHeight: Math.floor(alias.fontSize * alias.lineHeight)
  };
  for (const [key, value] of Object.entries(derivedAlias)) {
    vars[tokenToCssVarName(key, prefix)] = `${value}px`;
  }

  for (const [component, token] of Object.entries(components)) {
    for (const [key, value] of Object.entries(token) as Array<[string, string | number]>) {
      const serialized = serializeTokenValue(key, value);
      if (serialized !== null) {
        vars[tokenToCssVarName(key, `${prefix}-${kebabCase(component)}`)] = serialized;
      }
    }
  }

  Object.assign(vars, legacyBridgeCssVars(alias, prefix));

  return vars;
}

/**
 * Emits the legacy CSS variables used by the `ng-zorro-antd.variable.css`
 * bundle and by `registerTheme` (see `core/config/css-variables.ts`), so apps
 * on the existing variable theme are retinted by `provideNzTheme` too.
 *
 * The palette steps come from the alias token rather than `generate(base)`,
 * so an algorithm's palettes carry through — under `nzDarkAlgorithm` the
 * steps are the background-mixed dark palettes (e.g. `--ant-primary-1` is
 * `#111d2c`, not the light `#e6f7ff`). With the default algorithm the values
 * are identical to `generate(base)`, so providing the default theme leaves
 * the stylesheet values unchanged.
 *
 * One deliberate difference to `registerTheme`: `-color-active` uses palette
 * step 7 (like `themes/variable.less` and `themes/default.less`) rather than
 * step 8.
 */
export function legacyBridgeCssVars(alias: NzAliasToken, prefix: string): Record<string, string> {
  const vars: Record<string, string> = {};
  const aliasColors = alias as unknown as Record<string, string>;

  const fillColor = (type: 'primary' | 'success' | 'warning' | 'error' | 'info', key: string): void => {
    const base = aliasColors[`color${key}`];
    vars[`--${prefix}-${type}-color`] = base;
    vars[`--${prefix}-${type}-color-disabled`] = aliasColors[`color${key}BgHover`]; // palette step 2
    vars[`--${prefix}-${type}-color-hover`] = aliasColors[`color${key}Hover`]; // palette step 5
    vars[`--${prefix}-${type}-color-active`] = aliasColors[`color${key}Active`]; // palette step 7
    vars[`--${prefix}-${type}-color-outline`] = new TinyColor(base).setAlpha(0.2).toRgbString();
    vars[`--${prefix}-${type}-color-deprecated-bg`] = aliasColors[`color${key}Bg`]; // palette step 1
    vars[`--${prefix}-${type}-color-deprecated-border`] = aliasColors[`color${key}Border`]; // palette step 3
  };

  fillColor('primary', 'Primary');
  fillColor('success', 'Success');
  fillColor('warning', 'Warning');
  fillColor('error', 'Error');
  fillColor('info', 'Info');

  // `@primary-1` .. `@primary-7` as the themes derive them; 8-10 have no
  // alias-level counterpart (and no var() consumer) and stay light-generated.
  const primaryPalette = [
    alias.colorPrimaryBg,
    alias.colorPrimaryBgHover,
    alias.colorPrimaryBorder,
    alias.colorPrimaryBorderHover,
    alias.colorPrimaryTextHover,
    alias.colorPrimary,
    alias.colorPrimaryActive,
    ...generate(new TinyColor(alias.colorPrimary).toRgbString()).slice(7)
  ];
  primaryPalette.forEach((color, index) => {
    vars[`--${prefix}-primary-${index + 1}`] = color;
  });

  const primary = new TinyColor(alias.colorPrimary);
  const primaryActive = new TinyColor(alias.colorPrimaryBg);
  vars[`--${prefix}-primary-color-deprecated-l-35`] = primary.clone().lighten(35).toRgbString();
  vars[`--${prefix}-primary-color-deprecated-l-20`] = primary.clone().lighten(20).toRgbString();
  vars[`--${prefix}-primary-color-deprecated-t-20`] = primary.clone().tint(20).toRgbString();
  vars[`--${prefix}-primary-color-deprecated-t-50`] = primary.clone().tint(50).toRgbString();
  vars[`--${prefix}-primary-color-deprecated-f-12`] = primary
    .clone()
    .setAlpha(primary.getAlpha() * 0.12)
    .toRgbString();
  vars[`--${prefix}-primary-color-active-deprecated-f-30`] = primaryActive
    .clone()
    .setAlpha(primaryActive.getAlpha() * 0.3)
    .toRgbString();
  vars[`--${prefix}-primary-color-active-deprecated-d-02`] = primaryActive.clone().darken(2).toRgbString();

  return vars;
}
