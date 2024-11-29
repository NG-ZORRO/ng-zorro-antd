/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzTreeNode } from 'ng-zorro-antd/core/tree';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzCascaderOption } from './typings';

export function isChildOption(o: NzCascaderOption): boolean {
  return o.isLeaf || !o.children || !o.children.length;
}

export function isChildNode(node: NzTreeNode): boolean {
  return node.isLeaf || !node.children || !node.children.length;
}

export function isParentNode(node: NzTreeNode): boolean {
  return !!node.children && !!node.children.length && !node.isLeaf;
}

export function isParentOption(o: NzCascaderOption): boolean {
  return !!o.children && !!o.children.length && !o.isLeaf;
}

/**
 * Whether an option is disabled in multiple mode.
 * @param o option
 * @param multiple whether multiple mode
 */
export function isDisabledOption(o: NzCascaderOption, multiple = true): boolean {
  return o.disabled || (multiple && !!o.disableCheckbox);
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
 * Will split key to array, and convert to number
 */
export function toPathArray(key: string): string[] {
  return key.split(VALUE_SPLIT);
}

export function getOptionKey(option: NzCascaderOption): string {
  return option[KEY_PROPERTY];
}

export function setOptionKey(option: NzCascaderOption, key: string): void {
  option[KEY_PROPERTY] = key;
}
