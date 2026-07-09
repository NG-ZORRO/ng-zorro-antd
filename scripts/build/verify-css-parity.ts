/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Verifies that the design-token stylesheet is pixel-identical to the
 * CSS-variable theme (and therefore to the default theme) when no runtime
 * theme is provided: it compiles both bundles from source, resolves every
 * `var(--ant-*)` reference against the custom-property defaults compiled into
 * the bundle, strips the custom-property declarations, and diffs the results.
 *
 * Run with: npx ts-node --project scripts/gulp/tsconfig.json scripts/build/verify-css-parity.ts
 *
 * (Byte-parity of the pre-existing bundles across refs is a separate check:
 * compile the bundles from a clean worktree of the base ref and `cmp` them
 * against the same compilation from the working tree.)
 */

import less from 'less';

import path from 'path';

import { buildConfig } from '../build-config';

async function compileBundle(entryFile: string): Promise<string> {
  const content = `@import "${path.posix.join(buildConfig.componentsDir.replace(/\\/g, '/'), entryFile)}";`;
  const { css } = await less.render(content, { plugins: [] });
  return css;
}

function collectCustomPropertyDefaults(css: string): Record<string, string> {
  const defaults: Record<string, string> = {};
  for (const match of css.matchAll(/(--[a-z0-9-]+):\s*([^;}]+)[;}]/g)) {
    defaults[match[1]] = match[2].trim();
  }
  return defaults;
}

function resolveVarReferences(css: string, defaults: Record<string, string>): string {
  let output = css;
  for (let i = 0; i < 10; i++) {
    const next = output.replace(/var\((--[a-z0-9-]+)\)/g, (full, name: string) =>
      defaults[name] !== undefined ? defaults[name] : full
    );
    if (next === output) {
      break;
    }
    output = next;
  }
  return output;
}

/**
 * Within each rule block, keeps only the last declaration per property (CSS
 * cascade semantics): Less collapses exact-duplicate declarations, so a rule
 * with `color: <static>` and `color: var(--x)` in the token build matches a
 * single deduplicated `color: <static>` in the reference build.
 */
function dedupeDeclarations(css: string): string {
  const out: string[] = [];
  let block: Array<[string, string]> | null = null;
  for (const line of css.split('\n')) {
    if (block === null) {
      if (line.endsWith('{')) {
        block = [];
      }
      out.push(line);
      continue;
    }
    if (line.trim() === '}') {
      const lastIndexPerProp = new Map<string, number>();
      block.forEach(([prop], i) => lastIndexPerProp.set(prop, i));
      block.forEach(([prop, text], i) => {
        if (lastIndexPerProp.get(prop) === i) {
          out.push(text);
        }
      });
      out.push(line);
      block = null;
      continue;
    }
    const match = /^\s*([a-z-]+)\s*:/.exec(line);
    block.push(match ? [match[1], line] : [`__raw_${block.length}`, line]);
  }
  return out.join('\n');
}

function normalize(css: string): string {
  return dedupeDeclarations(
    css
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/^\s*--[a-z0-9-]+:[^;]*;\s*$/gm, '')
      .replace(/^(html|:root)\s*\{\s*\}\s*$/gm, '')
      .split('\n')
      .map(line => line.trimEnd())
      .filter(line => line.length > 0)
      .join('\n')
  );
}

export async function verifyCssParity(): Promise<void> {
  const [tokenCss, variableCss] = await Promise.all([
    compileBundle('ng-zorro-antd.token.less'),
    compileBundle('ng-zorro-antd.variable.less')
  ]);

  const token = normalize(resolveVarReferences(tokenCss, collectCustomPropertyDefaults(tokenCss)));
  const variable = normalize(resolveVarReferences(variableCss, collectCustomPropertyDefaults(variableCss)));

  if (token === variable) {
    console.log('CSS parity OK: the token bundle resolves to the css-variable bundle exactly.');
    return;
  }

  const tokenLines = token.split('\n');
  const variableLines = variable.split('\n');
  console.error(`CSS parity FAILED: token ${tokenLines.length} lines vs variable ${variableLines.length} lines.`);
  for (let i = 0; i < Math.max(tokenLines.length, variableLines.length); i++) {
    if (tokenLines[i] !== variableLines[i]) {
      console.error(`First difference at line ${i + 1}:`);
      console.error(`  token:    ${tokenLines[i]}`);
      console.error(`  variable: ${variableLines[i]}`);
      break;
    }
  }
  throw new Error('The design-token stylesheet is not pixel-identical to the css-variable theme.');
}

if (require.main === module) {
  verifyCssParity().catch(error => {
    console.error(error);
    process.exit(1);
  });
}
