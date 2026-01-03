/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export function generateClassName(prefix: string, suffix: string): string {
  return `${prefix}-${suffix}`;
}

export function getClassListFromValue(value: string | string[]): string[] | null {
  let classList: string[] | null = Array.isArray(value) ? value.filter(Boolean) : null;
  if (typeof value === 'string') {
    classList = value.trim().split(/\s+/).filter(Boolean);
  }
  return classList;
}
