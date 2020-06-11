/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export function getRegExp(prefix: string | string[]): RegExp {
  const prefixArray = Array.isArray(prefix) ? prefix : [prefix];
  let prefixToken = prefixArray.join('').replace(/(\$|\^)/g, '\\$1');

  if (prefixArray.length > 1) {
    prefixToken = `[${prefixToken}]`;
  }

  return new RegExp(`(\\s|^)(${prefixToken})[^\\s]*`, 'g');
}

export function getMentions(value: string, prefix: string | string[] = '@'): string[] {
  if (typeof value !== 'string') {
    return [];
  }
  const regex = getRegExp(prefix);
  const mentions = value.match(regex);
  return mentions !== null ? mentions.map(e => e.trim()) : [];
}
