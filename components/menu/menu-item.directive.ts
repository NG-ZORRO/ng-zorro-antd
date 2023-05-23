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
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Optional,
  QueryList,
  SimpleChanges
} from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { combineLatest, from, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';

import { MenuService } from './menu.service';
import { NzIsMenuInsideDropDownToken } from './menu.token';
import { NzSubmenuService } from './submenu.service';

@Directive({
  selector: '[nz-menu-item]',
  exportAs: 'nzMenuItem',
  host: {
    '[class.ant-dropdown-menu-item]': `isMenuInsideDropDown`,
    '[class.ant-dropdown-menu-item-selected]': `isMenuInsideDropDown && nzSelected`,
    '[class.ant-dropdown-menu-item-danger]': `isMenuInsideDropDown && nzDanger`,
    '[class.ant-dropdown-menu-item-disabled]': `isMenuInsideDropDown && nzDisabled`,
    '[class.ant-menu-item]': `!isMenuInsideDropDown`,
    '[class.ant-menu-item-selected]': `!isMenuInsideDropDown && nzSelected`,
    '[class.ant-menu-item-danger]': `!isMenuInsideDropDown && nzDanger`,
    '[class.ant-menu-item-disabled]': `!isMenuInsideDropDown && nzDisabled`,
    '[style.paddingLeft.px]': `dir === 'rtl' ? null : nzPaddingLeft || inlinePaddingLeft`,
    '[style.paddingRight.px]': `dir === 'rtl' ? nzPaddingLeft || inlinePaddingLeft : null`,
    '(click)': 'clickMenuItem($event)'
  },
  providers: [NzDestroyService]
})
export class NzMenuItemDirective implements OnInit, OnChanges, AfterContentInit {
  static ngAcceptInputType_nzDisabled: BooleanInput;
  static ngAcceptInputType_nzSelected: BooleanInput;
  static ngAcceptInputType_nzDanger: BooleanInput;
  static ngAcceptInputType_nzMatchRouterExact: BooleanInput;
  static ngAcceptInputType_nzMatchRouter: BooleanInput;

  level = this.nzSubmenuService ? this.nzSubmenuService.level + 1 : 1;
  selected$ = new Subject<boolean>();
  inlinePaddingLeft: number | null = null;
  dir: Direction = 'ltr';
  @Input() nzPaddingLeft?: number;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzSelected = false;
  @Input() @InputBoolean() nzDanger = false;
  @Input() @InputBoolean() nzMatchRouterExact = false;
  @Input() @InputBoolean() nzMatchRouter = false;
  @ContentChildren(RouterLink, { descendants: true }) listOfRouterLink!: QueryList<RouterLink>;

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
    if (!this.listOfRouterLink || !this.router || !this.router.navigated || !this.nzMatchRouter) {
      return;
    }
    this.ngZone.runOutsideAngular(() => {
      from(Promise.resolve())
        // Use `takeUntil` on the microtask so we don't run change detection
        // unexpectedly when the view is destroyed before the microtask is resolved.
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          const hasActiveLinks = this.hasActiveLinks();
          if (this.nzSelected === hasActiveLinks) {
            return;
          }
          this.ngZone.run(() => {
            this.nzSelected = hasActiveLinks;
            this.setSelectedState(this.nzSelected);
            this.cdr.markForCheck();
          });
        });
    });
  }

  private hasActiveLinks(): boolean {
    const isActiveCheckFn = this.isLinkActive(this.router!);
    return (this.routerLink && isActiveCheckFn(this.routerLink)) || this.listOfRouterLink.some(isActiveCheckFn);
  }

  private isLinkActive(router: Router): (link: RouterLink) => boolean {
    return (link: RouterLink) =>
      router.isActive(link.urlTree || '', {
        paths: this.nzMatchRouterExact ? 'exact' : 'subset',
        queryParams: this.nzMatchRouterExact ? 'exact' : 'subset',
        fragment: 'ignored',
        matrixParams: 'ignored'
      });
  }

  constructor(
    private nzMenuService: MenuService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private destroy$: NzDestroyService,
    @Optional() private nzSubmenuService: NzSubmenuService,
    @Inject(NzIsMenuInsideDropDownToken) public isMenuInsideDropDown: boolean,
    @Optional() private directionality: Directionality,
    @Optional() private routerLink?: RouterLink,
    @Optional() private router?: Router
  ) {
    router?.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        takeUntil(destroy$)
      )
      .subscribe(() => {
        this.updateRouterActive();
      });
  }

  ngOnInit(): void {
    /** store origin padding in padding */
    combineLatest([this.nzMenuService.mode$, this.nzMenuService.inlineIndent$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([mode, inlineIndent]) => {
        this.inlinePaddingLeft = mode === 'inline' ? this.level * inlineIndent : null;
      });

    this.dir = this.directionality.value;
    this.directionality.change.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
    });
  }

  ngAfterContentInit(): void {
    // Note: doesn't need to unsubscribe, because `changes`
    // gets completed by Angular when the view is destroyed.
    this.listOfRouterLink.changes.subscribe(() => this.updateRouterActive());
    this.updateRouterActive();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzSelected) {
      this.setSelectedState(this.nzSelected);
    }
  }
}
