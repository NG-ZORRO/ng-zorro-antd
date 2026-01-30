/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewEncapsulation,
  booleanAttribute,
  inject,
  DestroyRef,
  ChangeDetectorRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subject, combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';

import { numberAttributeWithZeroFallback } from 'ng-zorro-antd/core/util';

import { MenuService } from './menu.service';
import { NzIsMenuInsideDropdownToken } from './menu.token';
import { NzSubmenuService } from './submenu.service';

@Component({
  selector: '[nz-menu-item]',
  exportAs: 'nzMenuItem',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <span class="ant-menu-title-content">
      <ng-content />
    </span>
  `,
  host: {
    '[class.ant-dropdown-menu-item]': `isMenuInsideDropdown`,
    '[class.ant-dropdown-menu-item-selected]': `isMenuInsideDropdown && nzSelected`,
    '[class.ant-dropdown-menu-item-danger]': `isMenuInsideDropdown && nzDanger`,
    '[class.ant-dropdown-menu-item-disabled]': `isMenuInsideDropdown && nzDisabled`,
    '[class.ant-menu-item]': `!isMenuInsideDropdown`,
    '[class.ant-menu-item-selected]': `!isMenuInsideDropdown && nzSelected`,
    '[class.ant-menu-item-danger]': `!isMenuInsideDropdown && nzDanger`,
    '[class.ant-menu-item-disabled]': `!isMenuInsideDropdown && nzDisabled`,
    '[style.padding-inline-start.px]': 'nzPaddingLeft || inlinePaddingLeft',
    '(click)': 'clickMenuItem($event)'
  }
})
export class NzMenuItemComponent implements OnInit, OnChanges, AfterContentInit {
  private readonly nzMenuService = inject(MenuService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly nzSubmenuService = inject(NzSubmenuService, { optional: true });
  private readonly routerLink = inject(RouterLink, { optional: true });
  private readonly router = inject(Router, { optional: true });
  protected readonly isMenuInsideDropdown = inject(NzIsMenuInsideDropdownToken);

  level = this.nzSubmenuService ? this.nzSubmenuService.level + 1 : 1;
  selected$ = new Subject<boolean>();
  inlinePaddingLeft: number | null = null;
  @Input({ transform: numberAttributeWithZeroFallback }) nzPaddingLeft?: number;
  @Input({ transform: booleanAttribute }) nzDisabled = false;
  @Input({ transform: booleanAttribute }) nzSelected = false;
  @Input({ transform: booleanAttribute }) nzDanger = false;
  @Input({ transform: booleanAttribute }) nzMatchRouterExact = false;
  @Input({ transform: booleanAttribute }) nzMatchRouter = false;
  @ContentChildren(RouterLink, { descendants: true }) listOfRouterLink!: QueryList<RouterLink>;

  /** clear all item selected status except this */
  clickMenuItem(e: MouseEvent): void {
    if (this.nzDisabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.nzMenuService.onDescendantMenuItemClick(this);
    if (this.nzSubmenuService) {
      /** menu item inside the submenu **/
      this.nzSubmenuService.onChildMenuItemClick(this);
    } else {
      /** menu item inside the root menu **/
      this.nzMenuService.onChildMenuItemClick(this);
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

  constructor() {
    this.router?.events
      .pipe(
        takeUntilDestroyed(),
        filter(e => e instanceof NavigationEnd)
      )
      .subscribe(() => this.updateRouterActive());
  }

  ngOnInit(): void {
    /** store origin padding in padding */
    combineLatest([this.nzMenuService.mode$, this.nzMenuService.inlineIndent$])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([mode, inlineIndent]) => {
        this.inlinePaddingLeft = mode === 'inline' ? this.level * inlineIndent : null;
      });
  }

  ngAfterContentInit(): void {
    this.listOfRouterLink.changes.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.updateRouterActive());
    this.updateRouterActive();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzSelected } = changes;
    if (nzSelected) {
      this.setSelectedState(this.nzSelected);
    }
  }
}
