/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { AnimationEvent } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { EventEmitter, InjectionToken, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzMenuItem } from './item';
import { NzMenuStack, NzMenuStackItem } from './menu-stack';

export const NZ_MENU = new InjectionToken<NzMenu>('nz-menu');
export const NZ_MENU_PANEL = new InjectionToken<NzMenuPanel>('nz-menu-panel');
export const NZ_MENU_TRIGGER = new InjectionToken<NzMenuTrigger>('nz-menu-tirgger');
export type SubmenuType = 'popup' | 'inline';

export interface NzMenu extends NzMenuStackItem {
  orientation: 'horizontal' | 'vertical';
  theme: 'dark' | 'light';
  submenuType: SubmenuType;
  submenuTypeChanged(): Observable<SubmenuType>;
  getSubmenuTriggers(): NzMenuTrigger[];
  selection: SelectionModel<NzMenuItem>;
  itemSelected(): Observable<NzMenuItem>;
  setLevel(level: number): void;
  parentMenu?: NzMenu;
}

export interface NzMenuTrigger extends NzMenuStackItem {
  open(): void;
  opened: EventEmitter<void>;
  closed: EventEmitter<void>;
  close(): void;
  isOpened(): boolean;
  parentMenu?: NzMenu;
  inlineOutlet?: CdkPortalOutlet;
  getMenu(): NzMenuPanel | null;
}

export interface NzMenuPanel extends NzMenu {
  templateRef: TemplateRef<NzSafeAny>;
  isAnimating: boolean;
  getActiveItem(): NzMenuItem | null;
  startAnimation(): void;
  resetAnimation(): void;
  animationDone(): Observable<AnimationEvent>;
  selectionModelChanged(): Observable<SelectionModel<NzMenuItem>>;
  mouseLeave(): Observable<void>;
  setSubmenuType(type: SubmenuType): void;
  mouseEntered(): Observable<void>;
  registerMenu(menuStack: NzMenuStack, selection: SelectionModel<NzMenuItem>, menuType: SubmenuType): void;
}
