/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzSafeAny } from 'ng-zorro-antd/core/types';

export type NzTableData =
  | NzSafeAny
  | {
      [key: string]: NzTableData;
    };
export type NzTableLayout = 'fixed' | 'auto';
export type NzTablePaginationPosition = 'top' | 'bottom' | 'both';
export type NzTableSize = 'middle' | 'default' | 'small';
export type NzTableFilterList = Array<{ text: string; value: NzSafeAny; byDefault?: boolean }>;
export type NzTableSortOrder = string | 'ascend' | 'descend' | null;
export type NzTableSortFn = (a: NzTableData, b: NzTableData, sortOrder?: NzTableSortOrder) => number;
export type NzTableFilterValue = NzSafeAny[] | NzSafeAny;
export type NzTableFilterFn = (value: NzTableFilterValue, data: NzTableData) => boolean;

export interface NzTableQueryParams {
  pageIndex: number;
  pageSize: number;
  sort: Array<{ key: string; value: NzTableSortOrder }>;
  filter: Array<{ key: string; value: NzTableFilterValue }>;
}
