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

export type NzCascaderFilter = (searchValue: string, path: CascaderOption[]) => boolean;
export type NzCascaderSorter = (a: CascaderOption[], b: CascaderOption[], inputValue: string) => number;

export interface CascaderOption {
  value?: any; // tslint:disable-line:no-any
  label?: string;
  title?: string;
  disabled?: boolean;
  loading?: boolean;
  isLeaf?: boolean;
  parent?: CascaderOption;
  children?: CascaderOption[];

  [key: string]: any; // tslint:disable-line:no-any
}

export interface CascaderSearchOption extends CascaderOption {
  path: CascaderOption[];
}

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

  nzChangeOn?(option: CascaderOption, level: number): boolean;

  // tslint:disable-next-line:no-any
  nzLoadData?(node: CascaderOption, index?: number): PromiseLike<any>;
}
