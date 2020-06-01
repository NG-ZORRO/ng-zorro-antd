/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterContentInit,
  ChangeDetectorRef,
  ContentChildren,
  Directive,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  SimpleChanges,
  SkipSelf
} from '@angular/core';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzMenuItemDirective } from './menu-item.directive';
import { MenuService } from './menu.service';
import { NzIsMenuInsideDropDownToken, NzMenuServiceLocalToken } from './menu.token';
import { NzMenuModeType, NzMenuThemeType } from './menu.types';
import { NzSubMenuComponent } from './submenu.component';

export function MenuServiceFactory(serviceInsideDropDown: MenuService, serviceOutsideDropDown: MenuService): MenuService {
  return serviceInsideDropDown ? serviceInsideDropDown : serviceOutsideDropDown;
}
export function MenuDropDownTokenFactory(isMenuInsideDropDownToken: boolean): boolean {
  return isMenuInsideDropDownToken ? isMenuInsideDropDownToken : false;
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
      useFactory: MenuServiceFactory,
      deps: [[new SkipSelf(), new Optional(), MenuService], NzMenuServiceLocalToken]
    },
    /** check if menu inside dropdown-menu component **/
    {
      provide: NzIsMenuInsideDropDownToken,
      useFactory: MenuDropDownTokenFactory,
      deps: [[new SkipSelf(), new Optional(), NzIsMenuInsideDropDownToken]]
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
    '[class.ant-menu-inline-collapsed]': `!isMenuInsideDropDown && nzInlineCollapsed`
  }
})
export class NzMenuDirective implements AfterContentInit, OnInit, OnChanges, OnDestroy {
  static ngAcceptInputType_nzInlineCollapsed: BooleanInput;
  static ngAcceptInputType_nzSelectable: BooleanInput;

  @ContentChildren(NzMenuItemDirective, { descendants: true }) listOfNzMenuItemDirective!: QueryList<NzMenuItemDirective>;
  @ContentChildren(NzSubMenuComponent, { descendants: true }) listOfNzSubMenuComponent!: QueryList<NzSubMenuComponent>;
  @Input() nzInlineIndent = 24;
  @Input() nzTheme: NzMenuThemeType = 'light';
  @Input() nzMode: NzMenuModeType = 'vertical';
  @Input() @InputBoolean() nzInlineCollapsed = false;
  @Input() @InputBoolean() nzSelectable = !this.isMenuInsideDropDown;
  @Output() readonly nzClick = new EventEmitter<NzMenuItemDirective>();
  actualMode: NzMenuModeType = 'vertical';
  private inlineCollapsed$ = new BehaviorSubject<boolean>(this.nzInlineCollapsed);
  private mode$ = new BehaviorSubject<NzMenuModeType>(this.nzMode);
  private destroy$ = new Subject();
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

  constructor(
    private nzMenuService: MenuService,
    @Inject(NzIsMenuInsideDropDownToken) public isMenuInsideDropDown: boolean,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    combineLatest([this.inlineCollapsed$, this.mode$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([inlineCollapsed, mode]) => {
        this.actualMode = inlineCollapsed ? 'vertical' : mode;
        this.nzMenuService.setMode(this.actualMode);
        this.cdr.markForCheck();
      });
    this.nzMenuService.descendantMenuItemClick$.pipe(takeUntil(this.destroy$)).subscribe(menu => {
      this.nzClick.emit(menu);
      if (this.nzSelectable && !menu.nzMatchRouter) {
        this.listOfNzMenuItemDirective.forEach(item => item.setSelectedState(item === menu));
      }
    });
  }

  ngAfterContentInit(): void {
    this.inlineCollapsed$.pipe(takeUntil(this.destroy$)).subscribe(() => {
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
      if (!changes.nzMode.isFirstChange() && this.listOfNzSubMenuComponent) {
        this.listOfNzSubMenuComponent.forEach(submenu => submenu.setOpenStateWithoutDebounce(false));
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
