/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzSafeAny } from 'ng-zorro-antd/core/types';

export type NzTableDataType =
  | NzSafeAny
  | {
      [key: string]: NzTableDataType;
    };

export type NzTableLayoutType = 'fixed' | 'auto';

export type NzTablePaginationPositionType = 'top' | 'bottom' | 'both';

export type NzTableSizeType = 'middle' | 'default' | 'small';

export type NzThFilterType = Array<{ text: string; value: NzSafeAny; byDefault?: boolean }>;

export interface NzThItemInterface {
  text: string;
  value: NzSafeAny;
  checked: boolean;
}

export type NzSortOrderType = string | 'ascend' | 'descend' | null;
export type NzSortCompareFn = (a: NzTableDataType, b: NzTableDataType, sortOrder?: NzSortOrderType) => number;
export type NzFilterValue = NzSafeAny[] | NzSafeAny;
export type NzFilterFn = (value: NzFilterValue, data: NzTableDataType) => boolean;
