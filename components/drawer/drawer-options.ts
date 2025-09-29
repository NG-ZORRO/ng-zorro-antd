/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction } from '@angular/cdk/bidi';
import { InjectionToken, TemplateRef, Type } from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzDrawerRef } from './drawer-ref';

export const DRAWER_DEFAULT_SIZE = 378;
export const DRAWER_LARGE_SIZE = 736;
export type NzDrawerPlacement = 'left' | 'right' | 'top' | 'bottom';
export type NzDrawerSize = 'default' | 'large';

export interface NzDrawerOptionsOfComponent<T = NzSafeAny, D = NzSafeAny> {
  nzClosable?: boolean;
  nzMaskClosable?: boolean;
  nzCloseOnNavigation?: boolean;
  nzDirection?: Direction;
  nzMask?: boolean;
  nzKeyboard?: boolean;
  nzNoAnimation?: boolean;
  nzTitle?: string | TemplateRef<{}>;
  nzExtra?: string | TemplateRef<{}>;
  nzFooter?: string | TemplateRef<{}>;
  nzContent?: TemplateRef<{ $implicit: D; drawerRef: NzDrawerRef }> | Type<T>;
  /**@Deprecated**/
  nzContentParams?: Partial<T & D>;
  nzData?: D;
  nzMaskStyle?: object;
  nzBodyStyle?: object;
  nzWrapClassName?: string;
  nzSize?: NzDrawerSize;
  nzWidth?: number | string;
  nzHeight?: number | string;
  nzPlacement?: NzDrawerPlacement;
  nzZIndex?: number;
  nzOffsetX?: number;
  nzOffsetY?: number;
}

export interface NzDrawerOptions<T = NzSafeAny, D = NzSafeAny> extends NzDrawerOptionsOfComponent<T, D> {
  nzOnCancel?(): Promise<NzSafeAny>;
}

export const NZ_DRAWER_DATA = new InjectionToken<NzSafeAny>(
  typeof ngDevMode !== 'undefined' && ngDevMode ? 'nz-drawer-data' : ''
);
