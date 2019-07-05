/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export type TransferDirection = 'left' | 'right';

export interface TransferItem {
  title: string;
  direction?: TransferDirection;
  disabled?: boolean;
  checked?: boolean;
  hide?: boolean;
  // tslint:disable-next-line:no-any
  [key: string]: any;
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
