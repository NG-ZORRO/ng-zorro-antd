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
  EventEmitter,
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

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  InputBoolean,
  NzDirectionVHIType,
  NzDropdownHigherOrderServiceToken,
  NzMenuBaseService,
  NzUpdateHostClassService
} from 'ng-zorro-antd/core';

import { NzMenuItemDirective } from './nz-menu-item.directive';
import { NzMenuServiceFactory } from './nz-menu.resolver';
import { NzMenuService } from './nz-menu.service';
import { NzSubMenuComponent } from './nz-submenu.component';

@Directive({
  selector: '[nz-menu]',
  exportAs: 'nzMenu',
  providers: [
    NzUpdateHostClassService,
    NzMenuService,
    {
      provide: NzMenuBaseService,
      useFactory: NzMenuServiceFactory,
      deps: [[new SkipSelf(), new Optional(), NzDropdownHigherOrderServiceToken], NzMenuService]
    }
  ]
})
export class NzMenuDirective implements AfterContentInit, OnInit, OnChanges, OnDestroy {
  private destroy$ = new Subject();
  private cacheMode: NzDirectionVHIType;
  private listOfOpenedNzSubMenuComponent: NzSubMenuComponent[] = [];
  @ContentChildren(NzMenuItemDirective, { descendants: true }) listOfNzMenuItemDirective: QueryList<
    NzMenuItemDirective
  >;
  @ContentChildren(NzSubMenuComponent, { descendants: true }) listOfNzSubMenuComponent: QueryList<NzSubMenuComponent>;
  @Input() nzInlineIndent = 24;
  @Input() nzTheme: 'light' | 'dark' = 'light';
  @Input() nzMode: NzDirectionVHIType = 'vertical';
  @Input() @InputBoolean() nzInDropDown = false;
  @Input() @InputBoolean() nzInlineCollapsed = false;
  @Input() @InputBoolean() nzSelectable = !this.nzMenuService.isInDropDown;
  @Output() readonly nzClick = new EventEmitter<NzMenuItemDirective>();

  updateInlineCollapse(): void {
    if (this.listOfNzMenuItemDirective) {
      if (this.nzInlineCollapsed) {
        this.listOfOpenedNzSubMenuComponent = this.listOfNzSubMenuComponent.filter(submenu => submenu.nzOpen);
        this.listOfNzSubMenuComponent.forEach(submenu => submenu.setOpenState(false));
        this.nzMode = 'vertical';
      } else {
        this.listOfOpenedNzSubMenuComponent.forEach(submenu => submenu.setOpenState(true));
        this.listOfOpenedNzSubMenuComponent = [];
        this.nzMode = this.cacheMode;
      }
      this.nzMenuService.setMode(this.nzMode);
    }
  }

  setClassMap(): void {
    const prefixName = this.nzMenuService.isInDropDown ? 'ant-dropdown-menu' : 'ant-menu';
    this.nzUpdateHostClassService.updateHostClass(this.elementRef.nativeElement, {
      [`${prefixName}`]: true,
      [`${prefixName}-root`]: true,
      [`${prefixName}-${this.nzTheme}`]: true,
      [`${prefixName}-${this.nzMode}`]: true,
      [`${prefixName}-inline-collapsed`]: this.nzInlineCollapsed
    });
  }

  constructor(
    public elementRef: ElementRef,
    private nzMenuService: NzMenuBaseService,
    private nzUpdateHostClassService: NzUpdateHostClassService
  ) {}

  ngOnInit(): void {
    this.setClassMap();
    this.nzMenuService.menuItemClick$.pipe(takeUntil(this.destroy$)).subscribe(menu => {
      this.nzClick.emit(menu);
      if (this.nzSelectable) {
        this.listOfNzMenuItemDirective.forEach(item => item.setSelectedState(item === menu));
      }
    });
  }

  ngAfterContentInit(): void {
    this.cacheMode = this.nzMode;
    this.updateInlineCollapse();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzInlineCollapsed) {
      this.updateInlineCollapse();
    }
    if (changes.nzInlineIndent) {
      this.nzMenuService.setInlineIndent(this.nzInlineIndent);
    }
    if (changes.nzInDropDown) {
      this.nzMenuService.isInDropDown = this.nzInDropDown;
    }
    if (changes.nzTheme) {
      this.nzMenuService.setTheme(this.nzTheme);
    }
    if (changes.nzMode) {
      this.nzMenuService.setMode(this.nzMode);
      if (!changes.nzMode.isFirstChange() && this.listOfNzSubMenuComponent) {
        this.listOfNzSubMenuComponent.forEach(submenu => submenu.setOpenState(false));
      }
    }
    if (changes.nzTheme || changes.nzMode || changes.nzInlineCollapsed) {
      this.setClassMap();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
