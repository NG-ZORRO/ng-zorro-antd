/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ElementRef, EventEmitter, InjectionToken, TemplateRef } from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzMenu, NzMenuPanel, NzMenuTrigger } from './menu';

export const NZ_MENU_ITEM = new InjectionToken<NzMenuItem>('nz-menu-item');
export const NZ_MENU_LAZY_ITEM = new InjectionToken<NzMenuItem>('nz-menu-lazy-item');

export interface NzMenuItem {
  elementRef: ElementRef<HTMLElement>;
  hasSubmenu: boolean;
  menuTrigger?: NzMenuTrigger;
  parentMenu?: NzMenu;
  nzSelected: EventEmitter<NzMenuItem>;
  setLevel(level: number): void;
}

export interface NzMenuLazyItem {
  triggerFor: NzMenuPanel | null;
  templateRef: TemplateRef<NzSafeAny>;
}
