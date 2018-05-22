import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output
} from '@angular/core';

import { toBoolean } from '../core/util/convert';

import { NzMenuItemDirective } from './nz-menu-item.directive';
import { NzSubMenuComponent } from './nz-submenu.component';

export type NzMode = 'vertical' | 'horizontal' | 'inline';

@Directive({
  selector: '[nz-menu]'
})

export class NzMenuDirective implements AfterViewInit {
  private _selectable = true;
  private _inlineCollapsed = false;
  private _inDropDown = false;
  /** view init flat */
  private isInit = false;
  /** cache mode */
  private cacheMode: NzMode;
  /** opened index of array */
  private subMenusOpenIndex = [];

  /** collection of menu item */
  menuItems: NzMenuItemDirective[] = [];
  /** collection of sub menu */
  subMenus: NzSubMenuComponent[] = [];
  @Input() nzTheme: 'light' | 'dark' = 'light';
  @Input() nzInlineIndent = 24;
  @Input() nzMode: NzMode = 'vertical';
  @Output() nzClick = new EventEmitter<NzMenuItemDirective>();

  @Input()
  set nzInDropDown(value: boolean) {
    this._inDropDown = toBoolean(value);
    this.nzSelectable = !this._inDropDown;
    this.menuItems.forEach(menu => menu.isInDropDown = this._inDropDown);
    this.subMenus.forEach(subMenu => subMenu.isInDropDown = this._inDropDown);
  }

  get nzInDropDown(): boolean {
    return this._inDropDown;
  }

  @Input()
  set nzSelectable(value: boolean) {
    this._selectable = toBoolean(value);
  }

  get nzSelectable(): boolean {
    return this._selectable;
  }

  @Input()
  set nzInlineCollapsed(value: boolean) {
    this._inlineCollapsed = toBoolean(value);
    if (this.isInit) {
      this.updateInlineCollapse();
    }
  }

  get nzInlineCollapsed(): boolean {
    return this._inlineCollapsed;
  }

  updateInlineCollapse(): void {
    if (this._inlineCollapsed) {
      this.hideSubMenus();
      this.nzMode = 'vertical';
    } else {
      this.reductionSubMenus();
      this.nzMode = this.cacheMode;
    }
  }

  /** define host class */
  @HostBinding('class.ant-dropdown-menu')
  @HostBinding('class.ant-menu-dropdown-vertical')
  @HostBinding('class.ant-dropdown-menu-root')
  get isInDropDownClass(): boolean {
    return this.nzInDropDown;
  }

  @HostBinding('class.ant-menu')
  @HostBinding('class.ant-menu-root')
  get isNotInDropDownClass(): boolean {
    return !this.nzInDropDown;
  }

  @HostBinding('class.ant-dropdown-menu-light')
  get setDropDownThemeLightClass(): boolean {
    return this.nzInDropDown && (this.nzTheme === 'light');
  }

  @HostBinding('class.ant-dropdown-menu-dark')
  get setDropDownThemeDarkClass(): boolean {
    return this.nzInDropDown && (this.nzTheme === 'dark');
  }

  @HostBinding('class.ant-menu-light')
  get setMenuThemeLightClass(): boolean {
    return (!this.nzInDropDown) && (this.nzTheme === 'light');
  }

  @HostBinding('class.ant-menu-dark')
  get setMenuThemeDarkClass(): boolean {
    return (!this.nzInDropDown) && (this.nzTheme === 'dark');
  }

  @HostBinding('class.ant-menu-vertical')
  get setMenuVerticalClass(): boolean {
    return (!this.nzInDropDown) && (this.nzMode === 'vertical');
  }

  @HostBinding('class.ant-menu-horizontal')
  get setMenuHorizontalClass(): boolean {
    return (!this.nzInDropDown) && (this.nzMode === 'horizontal');
  }

  @HostBinding('class.ant-menu-inline')
  get setMenuInlineClass(): boolean {
    return (!this.nzInDropDown) && (this.nzMode === 'inline');
  }

  @HostBinding('class.ant-menu-inline-collapsed')
  get setMenuInlineCollapsedClass(): boolean {
    return (!this.nzInDropDown) && (this.nzMode !== 'horizontal') && this.nzInlineCollapsed;
  }

  constructor(public el: ElementRef) {

  }

  ngAfterViewInit(): void {
    this.isInit = true;
    this.cacheMode = this.nzMode;
    this.updateInlineCollapse();
  }

  /** trigger when menu item clicked */
  clearAllSelected(): void {
    this.menuItems.forEach(menu => menu.nzSelected = false);
  }

  hideSubMenus(): void {
    this.subMenusOpenIndex = [];
    this.subMenus.forEach((submenu, index) => {
      if (submenu.nzOpen) {
        this.subMenusOpenIndex.push(index);
      }
      submenu.nzOpen = false;
    });
  }

  reductionSubMenus(): void {
    this.subMenusOpenIndex.forEach(i => this.subMenus[ i ].nzOpen = true);
    this.subMenusOpenIndex = [];
  }

  clickItem(value: NzMenuItemDirective): void {
    this.nzClick.emit(value);
  }
}
