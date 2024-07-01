/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzSafeAny } from 'ng-zorro-antd/core/types';

export function getPercent(min: number, max: number, value: number): number {
  return ((value - min) / (max - min)) * 100;
}

export function getPrecision(num: number): number {
  const numStr = num.toString();
  const dotIndex = numStr.indexOf('.');
  return dotIndex >= 0 ? numStr.length - dotIndex - 1 : 0;
}

export function ensureNumberInRange(num: number, min: number, max: number): number {
  if (isNaN(num) || num < min) {
    return min;
  } else if (num > max) {
    return max;
  } else {
    return num;
  }
}

export function isNumberFinite(value: NzSafeAny): boolean {
  return typeof value === 'number' && isFinite(value);
}

export function toDecimal(value: number, decimal: number): number {
  return Math.round(value * Math.pow(10, decimal)) / Math.pow(10, decimal);
}

export function sum(input: number[], initial: number = 0): number {
  return input.reduce((previous: number, current: number) => previous + current, initial);
}
