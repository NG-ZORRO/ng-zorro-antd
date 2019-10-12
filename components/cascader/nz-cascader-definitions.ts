/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export type NzCascaderExpandTrigger = 'click' | 'hover';
export type NzCascaderTriggerType = 'click' | 'hover';
export type NzCascaderSize = 'small' | 'large' | 'default';

export type NzCascaderFilter = (searchValue: string, path: NzCascaderOption[]) => boolean;
export type NzCascaderSorter = (a: NzCascaderOption[], b: NzCascaderOption[], inputValue: string) => number;

/**
 * @deprecated Use the prefixed version.
 */
export interface CascaderOption {
  value?: any; // tslint:disable-line:no-any
  label?: string;
  title?: string;
  disabled?: boolean;
  loading?: boolean;
  isLeaf?: boolean;
  parent?: NzCascaderOption;
  children?: NzCascaderOption[];

  [key: string]: any; // tslint:disable-line:no-any
}

export type NzCascaderOption = CascaderOption;

/**
 * @deprecated Use the prefixed version.
 */
export interface CascaderSearchOption extends NzCascaderOption {
  path: NzCascaderOption[];
}

export type NzCascaderSearchOption = CascaderSearchOption;

export interface NzShowSearchOptions {
  filter?: NzCascaderFilter;
  sorter?: NzCascaderSorter;
}

export function isShowSearchObject(options: NzShowSearchOptions | boolean): options is NzShowSearchOptions {
  return typeof options !== 'boolean';
}

/**
 * To avoid circular dependency, provide an interface of `NzCascaderComponent`
 * for `NzCascaderService`.
 */
export interface NzCascaderComponentAsSource {
  inputValue: string;
  nzShowSearch: NzShowSearchOptions | boolean;
  nzLabelProperty: string;
  nzValueProperty: string;
  nzChangeOnSelect: boolean;

  nzChangeOn?(option: NzCascaderOption, level: number): boolean;

  // tslint:disable-next-line:no-any
  nzLoadData?(node: NzCascaderOption, index?: number): PromiseLike<any>;
}
