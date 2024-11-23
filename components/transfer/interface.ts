/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzSafeAny } from 'ng-zorro-antd/core/types';

export type TransferDirection = 'left' | 'right';

export interface TransferItem {
  title: string;
  direction?: TransferDirection;
  disabled?: boolean;
  checked?: boolean;
  hide?: boolean;
  [key: string]: NzSafeAny;
}

export interface TransferCanMove {
  direction: TransferDirection;
  list: TransferItem[];
}

export interface TransferChange {
  from: TransferDirection;
  to: TransferDirection;
  list: TransferItem[];
}

export interface TransferSearchChange {
  direction: TransferDirection;
  value: string;
}

export interface TransferSelectChange {
  direction: TransferDirection;
  checked: boolean;
  list: TransferItem[];
  item?: TransferItem;
}

export interface TransferStat {
  checkAll: boolean;
  checkHalf: boolean;
  checkCount: number;
  shownCount: number;
  availableCount: number;
}

export interface RenderListContext {
  $implicit: TransferItem[];
  direction: TransferDirection;
  disabled: boolean;
  onItemSelectAll: (x: boolean) => void;
  onItemSelect: (x: TransferItem) => void;
  stat: TransferStat;
}
