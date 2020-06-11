/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterContentInit,
  ChangeDetectorRef,
  ContentChildren,
  Directive,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  QueryList,
  SimpleChanges
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkWithHref } from '@angular/router';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { combineLatest, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { MenuService } from './menu.service';
import { NzIsMenuInsideDropDownToken } from './menu.token';
import { NzSubmenuService } from './submenu.service';

@Directive({
  selector: '[nz-menu-item]',
  exportAs: 'nzMenuItem',
  host: {
    '[class.ant-dropdown-menu-item]': `isMenuInsideDropDown`,
    '[class.ant-dropdown-menu-item-selected]': `isMenuInsideDropDown && nzSelected`,
    '[class.ant-dropdown-menu-item-disabled]': `isMenuInsideDropDown && nzDisabled`,
    '[class.ant-menu-item]': `!isMenuInsideDropDown`,
    '[class.ant-menu-item-selected]': `!isMenuInsideDropDown && nzSelected`,
    '[class.ant-menu-item-disabled]': `!isMenuInsideDropDown && nzDisabled`,
    '[style.paddingLeft.px]': 'nzPaddingLeft || inlinePaddingLeft',
    '(click)': 'clickMenuItem($event)'
  }
})
export class NzMenuItemDirective implements OnInit, OnChanges, OnDestroy, AfterContentInit {
  static ngAcceptInputType_nzDisabled: BooleanInput;
  static ngAcceptInputType_nzSelected: BooleanInput;
  static ngAcceptInputType_nzMatchRouterExact: BooleanInput;
  static ngAcceptInputType_nzMatchRouter: BooleanInput;

  private destroy$ = new Subject();
  level = this.nzSubmenuService ? this.nzSubmenuService.level + 1 : 1;
  selected$ = new Subject<boolean>();
  inlinePaddingLeft: number | null = null;
  @Input() nzPaddingLeft?: number;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzSelected = false;
  @Input() @InputBoolean() nzMatchRouterExact = false;
  @Input() @InputBoolean() nzMatchRouter = false;
  @ContentChildren(RouterLink, { descendants: true }) listOfRouterLink!: QueryList<RouterLink>;
  @ContentChildren(RouterLinkWithHref, { descendants: true }) listOfRouterLinkWithHref!: QueryList<RouterLinkWithHref>;

  /** clear all item selected status except this */
  clickMenuItem(e: MouseEvent): void {
    if (this.nzDisabled) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      this.nzMenuService.onDescendantMenuItemClick(this);
      if (this.nzSubmenuService) {
        /** menu item inside the submenu **/
        this.nzSubmenuService.onChildMenuItemClick(this);
      } else {
        /** menu item inside the root menu **/
        this.nzMenuService.onChildMenuItemClick(this);
      }
    }
  }

  setSelectedState(value: boolean): void {
    this.nzSelected = value;
    this.selected$.next(value);
  }

  private updateRouterActive(): void {
    if (!this.listOfRouterLink || !this.listOfRouterLinkWithHref || !this.router || !this.router.navigated || !this.nzMatchRouter) {
      return;
    }
    Promise.resolve().then(() => {
      const hasActiveLinks = this.hasActiveLinks();
      if (this.nzSelected !== hasActiveLinks) {
        this.nzSelected = hasActiveLinks;
        this.setSelectedState(this.nzSelected);
        this.cdr.markForCheck();
      }
    });
  }

  private hasActiveLinks(): boolean {
    const isActiveCheckFn = this.isLinkActive(this.router!);
    return (
      (this.routerLink && isActiveCheckFn(this.routerLink)) ||
      (this.routerLinkWithHref && isActiveCheckFn(this.routerLinkWithHref)) ||
      this.listOfRouterLink.some(isActiveCheckFn) ||
      this.listOfRouterLinkWithHref.some(isActiveCheckFn)
    );
  }

  private isLinkActive(router: Router): (link: RouterLink | RouterLinkWithHref) => boolean {
    return (link: RouterLink | RouterLinkWithHref) => router.isActive(link.urlTree, this.nzMatchRouterExact);
  }

  constructor(
    private nzMenuService: MenuService,
    private cdr: ChangeDetectorRef,
    @Optional() private nzSubmenuService: NzSubmenuService,
    @Inject(NzIsMenuInsideDropDownToken) public isMenuInsideDropDown: boolean,
    @Optional() private routerLink?: RouterLink,
    @Optional() private routerLinkWithHref?: RouterLinkWithHref,
    @Optional() private router?: Router
  ) {
    if (router) {
      this.router!.events.pipe(
        takeUntil(this.destroy$),
        filter(e => e instanceof NavigationEnd)
      ).subscribe(() => {
        this.updateRouterActive();
      });
    }
  }

  ngOnInit(): void {
    /** store origin padding in padding */
    combineLatest([this.nzMenuService.mode$, this.nzMenuService.inlineIndent$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([mode, inlineIndent]) => {
        this.inlinePaddingLeft = mode === 'inline' ? this.level * inlineIndent : null;
      });
  }

  ngAfterContentInit(): void {
    this.listOfRouterLink.changes.pipe(takeUntil(this.destroy$)).subscribe(() => this.updateRouterActive());
    this.listOfRouterLinkWithHref.changes.pipe(takeUntil(this.destroy$)).subscribe(() => this.updateRouterActive());
    this.updateRouterActive();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzSelected) {
      this.setSelectedState(this.nzSelected);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
