import { TemplateRef, Type } from '@angular/core';
import { NzDrawerRef } from './nz-drawer-ref';

export type NzDrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

// tslint:disable-next-line:no-any
export interface NzDrawerOptions<T = any, D = any> {
  nzClosable?: boolean;
  nzMaskClosable?: boolean;
  nzMask?: boolean;
  nzTitle?: string | TemplateRef<{}>;
  nzContent?: TemplateRef<{ $implicit: D, drawerRef: NzDrawerRef }> | Type<T>;
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
