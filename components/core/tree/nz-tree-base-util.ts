/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzTreeNode } from './nz-tree-base-node';

export function isCheckDisabled(node: NzTreeNode): boolean {
  const { isDisabled, isDisableCheckbox } = node;
  return !!(isDisabled || isDisableCheckbox);
}

// tslint:disable-next-line:no-any
export function isInArray(needle: any, haystack: any[]): boolean {
  return haystack.length > 0 && haystack.indexOf(needle) > -1;
}
