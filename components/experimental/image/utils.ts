/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export function isFixedSize(size: number | string): boolean {
  return typeof size === 'number' || /^(\d)+(px)?$/.test(size);
}

export function normalizeSrc(src: string): string {
  return src[0] === '/' ? src.slice(1) : src;
}
