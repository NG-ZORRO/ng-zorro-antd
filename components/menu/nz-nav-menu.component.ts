/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { EMPTY, merge, Observable, Subject } from 'rxjs';
import { delay, mapTo, mergeAll, mergeMap, startWith, switchMap, takeUntil } from 'rxjs/operators';

import { NzOverflowContainerDirective } from 'ng-zorro-antd/cdk/overflow';

import { NZ_MENU_ITEM, NZ_MENU_LAZY_ITEM, NzMenuItem, NzMenuLazyItem } from './item';
import { NZ_MENU, NzMenu, NzMenuTrigger, SubmenuType } from './menu';
import { NzMenuStack, NzMenuStackItem } from './menu-stack';
import { NzMenuPanelComponent } from './nz-menu-panel.component';
import { NzMenuTriggerForDirective } from './nz-menu-trigger-for.directive';

@Component({
  selector: 'nz-nav-menu',
  template: `
    <ul nzOverflowContainer class="ant-menu-overflow ant-menu ant-menu-root ant-menu-horizontal">
      <nz-menu-item
        #trigger="nzMenuTriggerFor"
        class="ant-menu-overflow-item"
        nzOverflowItem
        [nzMenuTriggerFor]="item.triggerFor"
        (overflowItemHidden)="trigger.close()"
        *ngFor="let item of lazyItems"
      >
        <ng-container [ngTemplateOutlet]="item.templateRef"></ng-container>
      </nz-menu-item>
      <nz-menu-item
        nzOverflowRest
        #omittedMenuTrigger="nzMenuTriggerFor"
        [nzMenuTriggerFor]="menuPanel"
        class="ant-menu-overflow-item ant-menu-overflow-item-rest ant-menu-submenu-horizontal"
      >
        ...
      </nz-menu-item>
      <nz-menu-panel #menuPanel="nzMenuPanel">
        <nz-menu-item [nzMenuTriggerFor]="item.triggerFor" *ngFor="let item of omittedItems">
          <ng-container [ngTemplateOutlet]="item.templateRef"></ng-container>
        </nz-menu-item>
      </nz-menu-panel>
    </ul>
  `,
  providers: [{ provide: NZ_MENU, useExisting: NzNavMenuComponent }]
})
export class NzNavMenuComponent implements AfterViewInit, OnDestroy, NzMenu {
  theme: 'dark' | 'light' = 'light';
  submenuType: SubmenuType = 'popup';
  orientation: 'horizontal' | 'vertical' = 'horizontal';
  omittedItems: NzMenuLazyItem[] = [];
  omittedItems$: Subject<NzMenuLazyItem[]> = new Subject<NzMenuLazyItem[]>();
  menuStack = new NzMenuStack();
  selection = new SelectionModel<NzMenuItem>();
  private destroy$ = new Subject<void>();
  private openedItem: NzMenuItem | null = null;
  private directDescendantItems = new QueryList<NzMenuItem>();

  @ViewChild(NzOverflowContainerDirective) overflowContainer!: NzOverflowContainerDirective;
  @ViewChild('omittedMenuTrigger') omittedMenuTrigger!: NzMenuTriggerForDirective;
  @ViewChild('menuPanel') omittedMenuPanel!: NzMenuPanelComponent;
  @ViewChildren(NzMenuTriggerForDirective) triggers!: QueryList<NzMenuTriggerForDirective>;
  @ContentChildren(NZ_MENU_LAZY_ITEM) lazyItems!: QueryList<NzMenuLazyItem>;
  @ViewChildren(NZ_MENU_ITEM) allItems!: QueryList<NzMenuItem>;

  constructor(private cdr: ChangeDetectorRef) {
    this.omittedItems$.subscribe(items => {
      this.omittedItems = [...items];
      this.cdr.markForCheck();
    });
  }

  submenuTypeChanged(): Observable<SubmenuType> {
    return EMPTY;
  }

  itemSelected(): Observable<NzMenuItem> {
    return EMPTY;
  }

  getSubmenuTriggers(): NzMenuTrigger[] {
    return this.triggers.toArray();
  }

  ngAfterViewInit(): void {
    this.overflowContainer.displayCount$.pipe(delay(16)).subscribe(count => {
      this.omittedItems$.next(this.lazyItems.filter((_, index) => index > count));
      this.menuStack.closeAll();
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

  private closeOpenMenu(menu: NzMenuStackItem): void {
    const trigger = this.openedItem;
    if (menu === trigger?.menuTrigger?.getMenu()) {
      trigger.menuTrigger.close();
    }
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

  setLevel(_: number) {
    // noop
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
