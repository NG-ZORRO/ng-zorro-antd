/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { AnimationEvent } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  OnDestroy,
  OnInit,
  Optional,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { merge, Observable, ReplaySubject, Subject } from 'rxjs';
import { mapTo, mergeAll, mergeMap, startWith, switchMap, takeUntil } from 'rxjs/operators';

import { slideMotion } from 'ng-zorro-antd/core/animation';

import { NZ_MENU_ITEM, NzMenuItem } from './item';
import { NZ_MENU, NZ_MENU_PANEL, NZ_MENU_TRIGGER, NzMenuPanel, NzMenuTrigger, SubmenuType } from './menu';
import { NzMenuStack, NzMenuStackItem } from './menu-stack';
import { NzMenuNextPanelDirective } from './nz-menu-next-panel.directive';

@Component({
  selector: 'nz-menu-panel',
  exportAs: 'nzMenuPanel',
  animations: [slideMotion],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template #submenu>
      <ul
        [attr.data-level]="level"
        [class.ant-menu-vertical]="submenuType === 'popup'"
        [class.ant-menu-inline]="submenuType === 'inline'"
        class="ant-menu ant-menu-sub"
      >
        <ng-content></ng-content>
      </ul>
    </ng-template>
    <ng-template #submenuWithPopup>
      <div
        (mouseenter)="setupMouseEnter()"
        (mouseleave)="onMouseLeave()"
        (@slideMotion.start)="onAnimationStart()"
        (@slideMotion.done)="onAnimationDone($event)"
        [@slideMotion]="animationState"
        [class.ant-menu-light]="theme === 'light'"
        [class.ant-menu-dark]="theme === 'dark'"
        class="ant-menu-submenu ant-menu ant-menu-submenu-popup"
      >
        <ng-container [ngTemplateOutlet]="submenu"></ng-container>
      </div>
    </ng-template>
  `,
  providers: [
    { provide: NZ_MENU_PANEL, useExisting: NzMenuPanelComponent },
    { provide: NZ_MENU, useExisting: NzMenuPanelComponent }
  ]
})
export class NzMenuPanelComponent implements OnInit, OnDestroy, NzMenuPanel, AfterContentInit {
  orientation: 'horizontal' | 'vertical' = 'vertical';
  submenuType: SubmenuType = 'popup';
  submenuType$ = new Subject<SubmenuType>();
  animationState = 'void';
  expandState = 'void';
  menuStack: NzMenuStack = new NzMenuStack();
  selection = new SelectionModel<NzMenuItem>();
  triggerOn: 'hover' | 'click' | null = null;
  keepOpen = false;
  isAnimating = false;
  level: number = 0;
  theme: 'dark' | 'light' = 'light';

  private activeItem: NzMenuItem | null = null;
  private openedItem: NzMenuItem | null = null;
  private mouseLeave$ = new Subject<void>();
  private mouseEnter$ = new Subject<void>();
  private destroy$ = new Subject<void>();
  private selectionModel$ = new ReplaySubject<SelectionModel<NzMenuItem>>(1);
  private animationDone$ = new Subject<AnimationEvent>();
  private itemSelected$ = new Subject<NzMenuItem>();
  private directDescendantSubmenuTriggers = new QueryList<NzMenuTrigger>();
  @ViewChild('submenuWithPopup') submenuWithPopupTemplateRef!: TemplateRef<unknown>;
  @ViewChild('submenu') submenuTemplateRef!: TemplateRef<unknown>;
  @ContentChildren(NZ_MENU_TRIGGER, { descendants: true }) allSubmenuTriggers!: QueryList<NzMenuTrigger>;
  @ContentChildren(NZ_MENU_ITEM, { descendants: true }) items!: QueryList<NzMenuItem>;

  get templateRef(): TemplateRef<unknown> {
    return this.submenuType === 'popup' ? this.submenuWithPopupTemplateRef : this.submenuTemplateRef;
  }

  constructor(@Optional() private nzMenuNextPanelDirective: NzMenuNextPanelDirective, private cdr: ChangeDetectorRef) {}

  submenuTypeChanged(): Observable<SubmenuType> {
    return this.submenuType$.asObservable();
  }

  setSubmenuType(type: SubmenuType) {
    this.submenuType = type;
    this.cdr.markForCheck();
    this.submenuType$.next(type);
  }

  mouseEntered(): Observable<void> {
    return this.mouseEnter$.asObservable();
  }

  mouseLeave(): Observable<void> {
    return this.mouseLeave$.asObservable();
  }

  itemSelected(): Observable<NzMenuItem> {
    return this.itemSelected$.asObservable();
  }

  onAnimationDone(event: AnimationEvent): void {
    this.isAnimating = false;
    this.animationDone$.next(event);
  }

  onAnimationStart(): void {
    this.isAnimating = true;
  }

  startAnimation(): void {
    if (this.submenuType === 'popup') {
      this.animationState = 'enter';
    } else {
      this.expandState = 'expanded';
    }
    this.cdr.markForCheck();
  }

  resetAnimation(): void {
    if (this.submenuType === 'popup') {
      this.animationState = 'void';
    } else {
      this.expandState = 'void';
    }
    this.cdr.markForCheck();
  }

  animationDone(): Observable<AnimationEvent> {
    return this.animationDone$.asObservable();
  }

  getSubmenuTriggers(): NzMenuTrigger[] {
    return this.directDescendantSubmenuTriggers.toArray();
  }

  onMouseLeave(): void {
    this.mouseLeave$.next();
    this.keepOpen = false;
    if (this.triggerOn === 'hover') {
      setTimeout(() => {
        if (this.menuStack.peek() === this) {
          let latestTriggerOnHoverMenu: NzMenuStackItem | undefined;
          do {
            latestTriggerOnHoverMenu = this.menuStack.peek();
            if (latestTriggerOnHoverMenu) {
              this.menuStack.close(latestTriggerOnHoverMenu);
            }
          } while (this.menuStack.peek()?.triggerOn === 'hover' && !this.menuStack.peek()?.keepOpen);
        }
      }, 200);
    }
  }

  getActiveItem(): NzMenuItem | null {
    return this.activeItem;
  }

  ngOnInit(): void {
    this.nzMenuNextPanelDirective?.registerMenu(this);
  }

  registerMenu(menuStack: NzMenuStack, selection: SelectionModel<NzMenuItem>, submenuType: SubmenuType): void {
    this.submenuType = submenuType;
    this.menuStack = menuStack;
    this.selection = selection;
    this.selectionModel$.next(selection);
    this.subscribeToMenuStack();
  }

  selectionModelChanged(): Observable<SelectionModel<NzMenuItem>> {
    return this.selectionModel$.asObservable();
  }

  ngAfterContentInit(): void {
    this.allSubmenuTriggers.changes
      .pipe(startWith(this.allSubmenuTriggers), takeUntil(this.destroy$))
      .subscribe((items: QueryList<NzMenuTrigger>) => {
        this.directDescendantSubmenuTriggers.reset(items.filter(item => item.parentMenu === this));
        this.directDescendantSubmenuTriggers.notifyOnChanges();
      });
    this.subscribeToMenuOpen();
    this.subscribeToItemSelected();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setupMouseEnter(): void {
    this.keepOpen = true;
    this.mouseEnter$.next();
  }

  setLevel(level: number): void {
    this.level = level;
    this.items.forEach(item => item.setLevel(level));
  }

  private closeOpenMenu(menu: NzMenuStackItem): void {
    const trigger = this.openedItem;
    if (menu === trigger?.menuTrigger?.getMenu()) {
      trigger.menuTrigger.close();
    }
  }

  private subscribeToItemSelected(): void {
    const exitCondition = merge(this.items.changes, this.destroy$);
    this.items.changes
      .pipe(
        startWith(this.items),
        mergeMap((items: QueryList<NzMenuItem>) => {
          return items.map(item => item.nzSelected.pipe(takeUntil(exitCondition)));
        }),
        mergeAll(),
        takeUntil(this.destroy$)
      )
      .subscribe(item => {
        this.itemSelected$.next(item);
      });
  }

  private subscribeToMenuOpen(): void {
    const exitCondition = merge(this.items.changes, this.destroy$);
    this.items.changes
      .pipe(
        startWith(this.items),
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
}
