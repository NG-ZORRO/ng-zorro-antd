/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  AfterContentInit,
  ChangeDetectorRef,
  ContentChildren,
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  booleanAttribute,
  inject,
  DestroyRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, combineLatest } from 'rxjs';

import { NzMenuItemComponent } from './menu-item.component';
import { MenuService } from './menu.service';
import { NzIsMenuInsideDropDownToken, NzMenuServiceLocalToken } from './menu.token';
import { NzMenuModeType, NzMenuThemeType } from './menu.types';
import { NzSubMenuComponent } from './submenu.component';

export function MenuServiceFactory(): MenuService {
  const serviceInsideDropDown = inject(MenuService, { skipSelf: true, optional: true });
  const serviceOutsideDropDown = inject(NzMenuServiceLocalToken);
  return serviceInsideDropDown ?? serviceOutsideDropDown;
}

export function MenuDropDownTokenFactory(): boolean {
  const isMenuInsideDropDownToken = inject(NzIsMenuInsideDropDownToken, { skipSelf: true, optional: true });
  return isMenuInsideDropDownToken ?? false;
}

@Directive({
  selector: '[nz-menu]',
  exportAs: 'nzMenu',
  providers: [
    {
      provide: NzMenuServiceLocalToken,
      useClass: MenuService
    },
    /** use the top level service **/
    {
      provide: MenuService,
      useFactory: MenuServiceFactory
    },
    /** check if menu inside dropdown-menu component **/
    {
      provide: NzIsMenuInsideDropDownToken,
      useFactory: MenuDropDownTokenFactory
    }
  ],
  host: {
    '[class.ant-dropdown-menu]': `isMenuInsideDropDown`,
    '[class.ant-dropdown-menu-root]': `isMenuInsideDropDown`,
    '[class.ant-dropdown-menu-light]': `isMenuInsideDropDown && nzTheme === 'light'`,
    '[class.ant-dropdown-menu-dark]': `isMenuInsideDropDown && nzTheme === 'dark'`,
    '[class.ant-dropdown-menu-vertical]': `isMenuInsideDropDown && actualMode === 'vertical'`,
    '[class.ant-dropdown-menu-horizontal]': `isMenuInsideDropDown && actualMode === 'horizontal'`,
    '[class.ant-dropdown-menu-inline]': `isMenuInsideDropDown && actualMode === 'inline'`,
    '[class.ant-dropdown-menu-inline-collapsed]': `isMenuInsideDropDown && nzInlineCollapsed`,
    '[class.ant-menu]': `!isMenuInsideDropDown`,
    '[class.ant-menu-root]': `!isMenuInsideDropDown`,
    '[class.ant-menu-light]': `!isMenuInsideDropDown && nzTheme === 'light'`,
    '[class.ant-menu-dark]': `!isMenuInsideDropDown && nzTheme === 'dark'`,
    '[class.ant-menu-vertical]': `!isMenuInsideDropDown && actualMode === 'vertical'`,
    '[class.ant-menu-horizontal]': `!isMenuInsideDropDown && actualMode === 'horizontal'`,
    '[class.ant-menu-inline]': `!isMenuInsideDropDown && actualMode === 'inline'`,
    '[class.ant-menu-inline-collapsed]': `!isMenuInsideDropDown && nzInlineCollapsed`,
    '[class.ant-menu-rtl]': `dir === 'rtl'`
  }
})
export class NzMenuDirective implements AfterContentInit, OnInit, OnChanges {
  private readonly nzMenuService = inject(MenuService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly directionality = inject(Directionality);

  @ContentChildren(NzMenuItemComponent, { descendants: true })
  listOfNzMenuItemDirective!: QueryList<NzMenuItemComponent>;
  isMenuInsideDropDown = inject(NzIsMenuInsideDropDownToken);
  @ContentChildren(NzSubMenuComponent, { descendants: true }) listOfNzSubMenuComponent!: QueryList<NzSubMenuComponent>;
  @Input() nzInlineIndent = 24;
  @Input() nzTheme: NzMenuThemeType = 'light';
  @Input() nzMode: NzMenuModeType = 'vertical';
  @Input({ transform: booleanAttribute }) nzInlineCollapsed = false;
  @Input({ transform: booleanAttribute }) nzSelectable = !this.isMenuInsideDropDown;
  @Output() readonly nzClick = new EventEmitter<NzMenuItemComponent>();
  actualMode: NzMenuModeType = 'vertical';
  dir: Direction = 'ltr';
  private inlineCollapsed$ = new BehaviorSubject<boolean>(this.nzInlineCollapsed);
  private mode$ = new BehaviorSubject<NzMenuModeType>(this.nzMode);
  private listOfOpenedNzSubMenuComponent: NzSubMenuComponent[] = [];

  setInlineCollapsed(inlineCollapsed: boolean): void {
    this.nzInlineCollapsed = inlineCollapsed;
    this.inlineCollapsed$.next(inlineCollapsed);
  }

  updateInlineCollapse(): void {
    if (this.listOfNzMenuItemDirective) {
      if (this.nzInlineCollapsed) {
        this.listOfOpenedNzSubMenuComponent = this.listOfNzSubMenuComponent.filter(submenu => submenu.nzOpen);
        this.listOfNzSubMenuComponent.forEach(submenu => submenu.setOpenStateWithoutDebounce(false));
      } else {
        this.listOfOpenedNzSubMenuComponent.forEach(submenu => submenu.setOpenStateWithoutDebounce(true));
        this.listOfOpenedNzSubMenuComponent = [];
      }
    }
  }

  ngOnInit(): void {
    combineLatest([this.inlineCollapsed$, this.mode$])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([inlineCollapsed, mode]) => {
        this.actualMode = inlineCollapsed ? 'vertical' : mode;
        this.nzMenuService.setMode(this.actualMode);
        this.cdr.markForCheck();
      });
    this.nzMenuService.descendantMenuItemClick$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(menu => {
      this.nzClick.emit(menu);
      if (this.nzSelectable && !menu.nzMatchRouter) {
        this.listOfNzMenuItemDirective.forEach(item => item.setSelectedState(item === menu));
      }
    });

    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(direction => {
      this.dir = direction;
      this.nzMenuService.setMode(this.actualMode);
      this.cdr.markForCheck();
    });
  }

  ngAfterContentInit(): void {
    this.inlineCollapsed$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.updateInlineCollapse();
      this.cdr.markForCheck();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzInlineCollapsed, nzInlineIndent, nzTheme, nzMode } = changes;
    if (nzInlineCollapsed) {
      this.inlineCollapsed$.next(this.nzInlineCollapsed);
    }
    if (nzInlineIndent) {
      this.nzMenuService.setInlineIndent(this.nzInlineIndent);
    }
    if (nzTheme) {
      this.nzMenuService.setTheme(this.nzTheme);
    }
    if (nzMode) {
      this.mode$.next(this.nzMode);
      if (!nzMode.isFirstChange() && this.listOfNzSubMenuComponent) {
        this.listOfNzSubMenuComponent.forEach(submenu => submenu.setOpenStateWithoutDebounce(false));
      }
    }
  }
}
