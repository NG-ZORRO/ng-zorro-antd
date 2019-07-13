/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterContentInit,
  ContentChildren,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  QueryList,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkWithHref } from '@angular/router';
import { isNotNil, InputBoolean, NzMenuBaseService, NzUpdateHostClassService } from 'ng-zorro-antd/core';
import { merge, EMPTY, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { NzSubmenuService } from './nz-submenu.service';

@Directive({
  selector: '[nz-menu-item]',
  exportAs: 'nzMenuItem',
  providers: [NzUpdateHostClassService],
  host: {
    '(click)': 'clickMenuItem($event)'
  }
})
export class NzMenuItemDirective implements OnInit, OnChanges, OnDestroy, AfterContentInit {
  private el: HTMLElement = this.elementRef.nativeElement;
  private destroy$ = new Subject();
  private originalPadding: number | null = null;
  selected$ = new Subject<boolean>();
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzSelected = false;
  @Input() nzPaddingLeft: number;
  @Input() @InputBoolean() nzMatchRouterExact = false;
  @Input() @InputBoolean() nzMatchRouter = false;
  @ContentChildren(RouterLink, { descendants: true }) listOfRouterLink: QueryList<RouterLink>;
  @ContentChildren(RouterLinkWithHref, { descendants: true }) listOfRouterLinkWithHref: QueryList<RouterLinkWithHref>;

  /** clear all item selected status except this */
  clickMenuItem(e: MouseEvent): void {
    if (this.nzDisabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.nzMenuService.onMenuItemClick(this);
    if (this.nzSubmenuService) {
      this.nzSubmenuService.onMenuItemClick();
    }
  }

  setClassMap(): void {
    const prefixName = this.nzMenuService.isInDropDown ? 'ant-dropdown-menu-item' : 'ant-menu-item';
    this.nzUpdateHostClassService.updateHostClass(this.el, {
      [`${prefixName}`]: true,
      [`${prefixName}-selected`]: this.nzSelected,
      [`${prefixName}-disabled`]: this.nzDisabled
    });
  }

  setSelectedState(value: boolean): void {
    this.nzSelected = value;
    this.selected$.next(value);
    this.setClassMap();
  }

  private updateRouterActive(): void {
    if (
      !this.listOfRouterLink ||
      !this.listOfRouterLinkWithHref ||
      !this.router ||
      !this.router.navigated ||
      !this.nzMatchRouter
    ) {
      return;
    }
    Promise.resolve().then(() => {
      const hasActiveLinks = this.hasActiveLinks();
      if (this.nzSelected !== hasActiveLinks) {
        this.nzSelected = hasActiveLinks;
        this.setSelectedState(this.nzSelected);
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
    private nzUpdateHostClassService: NzUpdateHostClassService,
    private nzMenuService: NzMenuBaseService,
    @Optional() private nzSubmenuService: NzSubmenuService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
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
    const paddingLeft = this.el.style.paddingLeft;
    if (paddingLeft) {
      this.originalPadding = parseInt(paddingLeft, 10);
    }
    merge(
      this.nzMenuService.mode$,
      this.nzMenuService.inlineIndent$,
      this.nzSubmenuService ? this.nzSubmenuService.level$ : EMPTY
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        let padding: number | null = null;
        if (this.nzMenuService.mode === 'inline') {
          if (isNotNil(this.nzPaddingLeft)) {
            padding = this.nzPaddingLeft;
          } else {
            const level = this.nzSubmenuService ? this.nzSubmenuService.level + 1 : 1;
            padding = level * this.nzMenuService.inlineIndent;
          }
        } else {
          padding = this.originalPadding;
        }
        if (padding) {
          this.renderer.setStyle(this.el, 'padding-left', `${padding}px`);
        } else {
          this.renderer.removeStyle(this.el, 'padding-left');
        }
      });
    this.setClassMap();
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
    if (changes.nzDisabled) {
      this.setClassMap();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
