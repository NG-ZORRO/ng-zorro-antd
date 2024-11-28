/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzCascaderOption } from './typings';

export function isChildOption(o: NzCascaderOption): boolean {
  return o.isLeaf || !o.children || !o.children.length;
}

export function isParentOption(o: NzCascaderOption): boolean {
  return !!o.children && !!o.children.length && !o.isLeaf;
}

const VALUE_SPLIT = '__CASCADER_SPLIT__';
const KEY_PROPERTY = '__cascader_key';

/**
 * Will convert value to string, and join with `VALUE_SPLIT`
 */
export function toPathKey(value: NzSafeAny[]): string {
  return value.join(VALUE_SPLIT);
}

/**
 * Convert string to value array, split by `VALUE_SPLIT`
 */
export function toKeyValues(value: string): string[] {
  return value.split(VALUE_SPLIT);
}

export function getOptionKey(option: NzCascaderOption): string {
  return option[KEY_PROPERTY];
}

export function setOptionKey(option: NzCascaderOption, key: string): void {
  option[KEY_PROPERTY] = key;
}
