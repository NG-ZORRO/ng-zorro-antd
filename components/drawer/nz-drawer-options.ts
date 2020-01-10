/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TemplateRef, Type } from '@angular/core';
import { NzDrawerRef } from './nz-drawer-ref';

export type NzDrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

// tslint:disable-next-line:no-any
export interface NzDrawerOptionsOfComponent<T = any, D = any> {
  nzClosable?: boolean;
  nzMaskClosable?: boolean;
  nzMask?: boolean;
  nzKeyboard?: boolean;
  nzNoAnimation?: boolean;
  nzTitle?: string | TemplateRef<{}>;
  nzContent?: TemplateRef<{ $implicit: D; drawerRef: NzDrawerRef }> | Type<T>;
  nzContentParams?: D;
  nzMaskStyle?: object;
  nzBodyStyle?: object;
  nzWrapClassName?: string;
  nzWidth?: number | string;
  nzHeight?: number | string;
  nzPlacement?: NzDrawerPlacement;
  nzZIndex?: number;
  nzOffsetX?: number;
  nzOffsetY?: number;
}

// tslint:disable-next-line:no-any
export interface NzDrawerOptions<T = any, D = any> extends NzDrawerOptionsOfComponent<T, D> {
  // tslint:disable-next-line:no-any
  nzOnCancel?(): Promise<any>;
}
