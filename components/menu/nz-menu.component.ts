/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  OnChanges,
  QueryList,
  SimpleChanges
} from '@angular/core';
import { EMPTY, merge, Observable, Subject } from 'rxjs';
import { mapTo, mergeAll, mergeMap, startWith, switchMap, takeUntil } from 'rxjs/operators';

import { NZ_MENU_ITEM, NzMenuItem } from './item';
import { NzMenu, NZ_MENU, NzMenuTrigger, NZ_MENU_TRIGGER, SubmenuType } from './menu';
import { NzMenuStack, NzMenuStackItem } from './menu-stack';

@Component({
  selector: 'nz-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <ng-content></ng-content> `,
  providers: [{ provide: NZ_MENU, useExisting: NzMenuComponent }],
  host: {
    class: 'ant-menu ant-menu-root',
    '[class.ant-menu-inline]': 'nzMode === "inline" && !nzInlineCollapsed',
    '[class.ant-menu-vertical]': 'nzMode === "vertical" || nzInlineCollapsed',
    '[class.ant-menu-inline-collapsed]': 'nzMode === "inline" && nzInlineCollapsed',
    '[class.ant-menu-light]': `theme === 'light'`,
    '[class.ant-menu-dark]': `theme === 'dark'`
  }
})
export class NzMenuComponent implements AfterContentInit, NzMenu, OnChanges {
  private destroy$ = new Subject<void>();
  private submenuType$ = new Subject<SubmenuType>();
  private openedItem: NzMenuItem | null = null;
  private directDescendantSubmenuTriggers = new QueryList<NzMenuTrigger>();
  private directDescendantItems = new QueryList<NzMenuItem>();
  submenuType: SubmenuType = 'inline';
  orientation: 'horizontal' | 'vertical' = 'vertical';
  menuStack = new NzMenuStack();
  selection = new SelectionModel<NzMenuItem>();

  @Input('nzTheme') theme: 'dark' | 'light' = 'light';
  @Input() nzMode: 'vertical' | 'inline' = 'vertical';
  @Input() nzInlineCollapsed = false;
  @ContentChildren(NZ_MENU_TRIGGER, { descendants: true }) allSubmenuTriggers!: QueryList<NzMenuTrigger>;
  @ContentChildren(NZ_MENU_ITEM) allItems!: QueryList<NzMenuItem>;

  constructor() {}

  getSubmenuTriggers(): NzMenuTrigger[] {
    return this.directDescendantSubmenuTriggers.toArray();
  }

  submenuTypeChanged(): Observable<SubmenuType> {
    return this.submenuType$.asObservable();
  }

  itemSelected(): Observable<NzMenuItem> {
    return EMPTY;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzMode, nzInlineCollapsed } = changes;
    if (nzMode || nzInlineCollapsed) {
      if (this.nzMode === 'inline') {
        if (this.nzInlineCollapsed) {
          this.submenuType = 'popup';
        } else {
          this.submenuType = 'inline';
        }
      } else {
        this.submenuType = 'popup';
      }
      this.submenuType$.next(this.submenuType);
    }
  }

  ngAfterContentInit(): void {
    this.allSubmenuTriggers.changes
      .pipe(startWith(this.allSubmenuTriggers))
      .subscribe((items: QueryList<NzMenuTrigger>) => {
        this.directDescendantSubmenuTriggers.reset(items.filter(item => item.parentMenu === this));
        this.directDescendantSubmenuTriggers.notifyOnChanges();
      });

    this.allItems.changes
      .pipe(startWith(this.allItems), takeUntil(this.destroy$))
      .subscribe((items: QueryList<NzMenuItem>) => {
        this.directDescendantItems.reset(items.filter(item => item.parentMenu === this));
        this.directDescendantItems.notifyOnChanges();
      });

    this.subscribeToMenuOpen();
    this.subscribeToMenuStack();
  }

  setLevel(_: number): void {
    // noop
  }

  private subscribeToMenuOpen(): void {
    const exitCondition = merge(this.directDescendantItems.changes, this.destroy$);
    this.directDescendantItems.changes
      .pipe(
        startWith(this.directDescendantItems),
        mergeMap((items: QueryList<NzMenuItem>) => {
          return items
            .filter(item => item.hasSubmenu)
            .map(item => item.menuTrigger!.opened.pipe(mapTo(item), takeUntil(exitCondition)));
        }),
        mergeAll(),
        switchMap((item: NzMenuItem) => {
          this.openedItem = item;
          return item.menuTrigger!.closed;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => (this.openedItem = null));
  }

  private subscribeToMenuStack(): void {
    this.menuStack
      .closed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(item => this.closeOpenMenu(item));
  }

  private closeOpenMenu(menu: NzMenuStackItem): void {
    const trigger = this.openedItem;
    if (menu === trigger?.menuTrigger?.getMenu()) {
      trigger.menuTrigger.close();
    }
  }
}
