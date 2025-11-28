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
import { NzIsMenuInsideDropdownToken, NzMenuServiceLocalToken } from './menu.token';
import { NzMenuModeType, NzMenuThemeType } from './menu.types';
import { NzSubMenuComponent } from './submenu.component';

function MenuServiceFactory(): MenuService {
  const serviceInsideDropdown = inject(MenuService, { skipSelf: true, optional: true });
  const serviceOutsideDropdown = inject(NzMenuServiceLocalToken);
  return serviceInsideDropdown ?? serviceOutsideDropdown;
}

function MenuDropdownTokenFactory(): boolean {
  const isMenuInsideDropdownToken = inject(NzIsMenuInsideDropdownToken, { skipSelf: true, optional: true });
  return isMenuInsideDropdownToken ?? false;
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
      provide: NzIsMenuInsideDropdownToken,
      useFactory: MenuDropdownTokenFactory
    }
  ],
  host: {
    '[class.ant-dropdown-menu]': `isMenuInsideDropdown`,
    '[class.ant-dropdown-menu-root]': `isMenuInsideDropdown`,
    '[class.ant-dropdown-menu-light]': `isMenuInsideDropdown && nzTheme === 'light'`,
    '[class.ant-dropdown-menu-dark]': `isMenuInsideDropdown && nzTheme === 'dark'`,
    '[class.ant-dropdown-menu-vertical]': `isMenuInsideDropdown && actualMode === 'vertical'`,
    '[class.ant-dropdown-menu-horizontal]': `isMenuInsideDropdown && actualMode === 'horizontal'`,
    '[class.ant-dropdown-menu-inline]': `isMenuInsideDropdown && actualMode === 'inline'`,
    '[class.ant-dropdown-menu-inline-collapsed]': `isMenuInsideDropdown && nzInlineCollapsed`,
    '[class.ant-menu]': `!isMenuInsideDropdown`,
    '[class.ant-menu-root]': `!isMenuInsideDropdown`,
    '[class.ant-menu-light]': `!isMenuInsideDropdown && nzTheme === 'light'`,
    '[class.ant-menu-dark]': `!isMenuInsideDropdown && nzTheme === 'dark'`,
    '[class.ant-menu-vertical]': `!isMenuInsideDropdown && actualMode === 'vertical'`,
    '[class.ant-menu-horizontal]': `!isMenuInsideDropdown && actualMode === 'horizontal'`,
    '[class.ant-menu-inline]': `!isMenuInsideDropdown && actualMode === 'inline'`,
    '[class.ant-menu-inline-collapsed]': `!isMenuInsideDropdown && nzInlineCollapsed`,
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
  isMenuInsideDropdown = inject(NzIsMenuInsideDropdownToken);
  @ContentChildren(NzSubMenuComponent, { descendants: true }) listOfNzSubMenuComponent!: QueryList<NzSubMenuComponent>;
  @Input() nzInlineIndent = 24;
  @Input() nzTheme: NzMenuThemeType = 'light';
  @Input() nzMode: NzMenuModeType = 'vertical';
  @Input({ transform: booleanAttribute }) nzInlineCollapsed = false;
  @Input({ transform: booleanAttribute }) nzSelectable = !this.isMenuInsideDropdown;
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
