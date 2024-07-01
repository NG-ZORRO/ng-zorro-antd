/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export function ensureInBounds(value: number, boundValue: number): number {
  return value ? (value < boundValue ? value : boundValue) : boundValue;
}
