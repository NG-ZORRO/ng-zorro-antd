/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { NzSafeAny } from 'ng-zorro-antd/core/types';

export type NzCascaderExpandTrigger = 'click' | 'hover';
export type NzCascaderTriggerType = 'click' | 'hover';
export type NzCascaderSize = 'small' | 'large' | 'default';

export type NzCascaderFilter = (searchValue: string, path: NzCascaderOption[]) => boolean;
export type NzCascaderSorter = (a: NzCascaderOption[], b: NzCascaderOption[], inputValue: string) => number;

export interface NzCascaderOption {
  value?: NzSafeAny;
  label?: string;
  title?: string;
  disabled?: boolean;
  loading?: boolean;
  isLeaf?: boolean;
  parent?: NzCascaderOption;
  children?: NzCascaderOption[];

  [key: string]: NzSafeAny;
}

export interface NzCascaderSearchOption extends NzCascaderOption {
  path: NzCascaderOption[];
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

  nzChangeOn?(option: NzCascaderOption, level: number): boolean;

  nzLoadData?(node: NzCascaderOption, index: number): PromiseLike<NzSafeAny>;
}
