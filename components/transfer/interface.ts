/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export interface TransferItem {
  title: string;
  direction?: 'left' | 'right';
  disabled?: boolean;
  checked?: boolean;
  _hiden?: boolean;
  // tslint:disable-next-line:no-any
  [key: string]: any;
}

export interface TransferCanMove {
  direction: string;
  list: TransferItem[];
}

export interface TransferChange {
  from: string;
  to: string;
  list: TransferItem[];
}

export interface TransferSearchChange {
  direction: string;
  value: string;
}

export interface TransferSelectChange {
  direction: string;
  checked: boolean;
  list: TransferItem[];
  item?: TransferItem;
}
