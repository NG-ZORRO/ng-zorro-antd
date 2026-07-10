/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { readFileSync, writeFile } from 'fs-extra';
import less from 'less';
import LessPluginCleanCSS from 'less-plugin-clean-css';

import path from 'path';

import { darkPaletteLess } from '../build/dark-vars';

const themePath = path.join(__dirname, '../../site/styles.less');
const colorPalettePath = path.join(__dirname, '../../components/style/color/colorPalette.less');
const themeDirs = [
  path.join(__dirname, '../../components/style/themes/variable.less'),
  path.join(__dirname, '../../components/style/themes/token.less')
];

/**
 * Every variable the css-variable/token themes remap to a `var()` string.
 * Those stay runtime-driven (`NzThemeService`), so the dark overlay must not
 * re-declare them — and must not re-declare formulas that do Less math on
 * them (math cannot operate on `var()` strings).
 */
function collectRemappedNames(): Set<string> {
  const remapped = new Set<string>();
  for (const file of themeDirs) {
    const source = readFileSync(file, 'utf8');
    for (const match of source.matchAll(/^@([a-z0-9-]+):\s*~'var\(/gm)) {
      remapped.add(match[1]);
    }
  }
  return remapped;
}

/**
 * Variables declared inside the `.*-derived-theme-variables()` guarded mixins.
 * They do not exist at root scope in token mode (the guards are off), so the
 * overlay must not re-declare them or formulas referencing them.
 */
function collectGuardInternalNames(): Set<string> {
  const names = new Set<string>();
  for (const file of themeDirs) {
    const lines = readFileSync(file, 'utf8').split('\n');
    let depth = 0;
    for (const line of lines) {
      if (depth > 0) {
        const declaration = /^\s*@([a-z0-9-]+):/.exec(line);
        if (declaration) {
          names.add(declaration[1]);
        }
      } else if (/^\.[a-z0-9-]+-derived-theme-variables\(\)\s*when/.test(line)) {
        depth = 1;
        continue;
      } else {
        continue;
      }
      depth += (line.match(/\{/g) ?? []).length - (line.match(/\}/g) ?? []).length;
    }
  }
  return names;
}

function hasMathOnRemapped(value: string, remapped: Set<string>): boolean {
  let s = value;
  for (let i = 0; i < 4; i++) {
    s = s.replace(/calc\((?:[^()]|\([^()]*\))*\)/g, 'CALC');
  }
  for (const name of remapped) {
    const v = `@${name.replace(/-/g, '\\-')}(?![a-z0-9-])`;
    if (
      new RegExp(`(?:${v}\\s*[*/])|(?:[*/]\\s*${v})`).test(s) ||
      new RegExp(`(?:${v}\\s*[+\\-]\\s*[\\d@(])|(?:[\\d)]\\s*[+\\-]\\s*${v})`).test(s) ||
      new RegExp(
        `(?:ceil|floor|round|max|min|percentage|unit|fade|tint|shade|darken|lighten|fadein|fadeout|mix)\\([^)]*${v}`
      ).test(s) ||
      new RegExp(`-${v}`).test(s)
    ) {
      return true;
    }
  }
  return false;
}

/**
 * Control-flow flags of the theme files; re-declaring them via `modifyVars`
 * would disable the css-variable rules (`@theme`) or re-enable the derived
 * Less formulas that cannot operate on `var()` strings.
 */
const CONTROL_FLOW_VARS = new Set(['theme', 'compute-derived-theme-variables', 'root-entry-name', 'html-selector']);

function filterVarsForTokenBase(vars: Record<string, string | number>): Record<string, string | number> {
  const remapped = collectRemappedNames();
  const internal = collectGuardInternalNames();
  const referencesInternal = (value: string): boolean =>
    [...value.matchAll(/@([a-z0-9-]+)/g)].some(m => internal.has(m[1]) && !remapped.has(m[1]) && !(m[1] in vars));
  const result: Record<string, string | number> = {};
  for (const [key, value] of Object.entries(vars)) {
    if (
      CONTROL_FLOW_VARS.has(key) ||
      remapped.has(key) ||
      internal.has(key) ||
      hasMathOnRemapped(`${value}`, remapped) ||
      referencesInternal(`${value}`)
    ) {
      continue;
    }
    result[key] = value;
  }
  return result;
}

/**
 * Compiles the dark overlay stylesheet (`site/assets/dark.css`) over the
 * token base. The filtered `modifyVars` darken only the not-yet-tokenized
 * neutrals; sizes and primary/status colors keep their `var()` references, so
 * the compact algorithm and runtime primary-color changes compose with dark.
 * The light/compact/aliyun looks need no stylesheet — they are pure
 * `NzThemeService` configs (see the site header's theme switcher).
 */
export default async function generateTheme(): Promise<void> {
  const themeContent = readFileSync(themePath, 'utf8');
  const data = await less.render(themeContent, {
    filename: themePath,
    plugins: [new LessPluginCleanCSS({ advanced: true })],
    modifyVars: {
      hack: `true;@import '${colorPalettePath}';`,
      ...filterVarsForTokenBase(darkPaletteLess),
      '@site-markdown-code-bg': '@input-bg',
      '@site-text-color': '@heading-color'
    }
  });

  return writeFile(path.join(__dirname, '../../site/assets/dark.css'), data.css);
}
