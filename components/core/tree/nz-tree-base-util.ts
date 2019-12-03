/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzHighlightPipe } from '../highlight';
import { NzTreeNode } from './nz-tree-base-node';

export type NzHighlightFunc = (inputValue: string, option: NzTreeNode) => string | null;

export function nzTreeDefaultHighlightFunc(inputValue: string, option: NzTreeNode): string | null {
  const nzHighlightPipe = new NzHighlightPipe();
  if (inputValue && option.title) {
    return nzHighlightPipe.transform(option.title, inputValue, '', 'font-highlight');
  } else {
    return option.title;
  }
}

export type NzTreeFilterOption = (inputValue: string, option: NzTreeNode) => boolean;

export function nzTreeDefaultFilterOption(inputValue: string, option: NzTreeNode): boolean {
  if (inputValue && option.title) {
    return option.title.indexOf(inputValue) > -1;
  } else {
    return false;
  }
}

export function isCheckDisabled(node: NzTreeNode): boolean {
  const { isDisabled, isDisableCheckbox } = node;
  return !!(isDisabled || isDisableCheckbox);
}

// tslint:disable-next-line:no-any
export function isInArray(needle: any, haystack: any[]): boolean {
  return haystack.length > 0 && haystack.indexOf(needle) > -1;
}
