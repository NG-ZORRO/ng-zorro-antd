import {
  AfterViewInit, Component, HostBinding, Input, OnChanges, SimpleChanges, ViewEncapsulation
} from '@angular/core';
import { toBoolean } from '../util/convert';
import { NzMenuItemComponent } from './nz-menu-item.component';
import { NzSubMenuComponent } from './nz-submenu.component';

export type NzMode = 'vertical' | 'horizontal' | 'inline';

@Component({
  selector     : '[nz-menu]',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <ng-content></ng-content>`,
  styleUrls    : [
    './style/index.less'
  ]
})

export class NzMenuComponent implements OnChanges, AfterViewInit {
  private _clickActive = true;
  private _inlineCollapsed = false;

  /** set when has submenu component */
  hasSubMenu = false;
  /** set when in dropdown component */
  isInDropDown = false;
  /** collection of menu item */
  menuItems: NzMenuItemComponent[] = [];
  /** collection of sub menu */
  subMenus: NzSubMenuComponent[] = [];
  /** view init flat */
  isInit = false;
  /** temporary mode */
  _tempMode: NzMode;
  /** opened index of array */
  _subMenusOpenIndex = [];

  @Input() nzMode: NzMode = 'vertical';
  @Input() nzTheme: 'light' | 'dark' = 'light';

  @Input()
  set nzClickActive(value: boolean) {
    this._clickActive = toBoolean(value);
  }

  get nzClickActive(): boolean {
    return this._clickActive;
  }

  @Input()
  set nzInlineCollapsed(value: boolean) {
    const state = toBoolean(value);
    this._inlineCollapsed = state;
    if (!this.isInit) {
      return;
    }
    if (this._inlineCollapsed) {
      this.hideSubMenus();
      // after the animation is over
      setTimeout(() => this.nzMode = 'vertical', 150);
    } else {
      this.reductionSubMenus();
      this.nzMode = this._tempMode;
    }

  }

  get nzInlineCollapsed(): boolean {
    return this._inlineCollapsed;
  }

  /** define host class */
  @HostBinding('class.ant-dropdown-menu')
  @HostBinding('class.ant-menu-dropdown-vertical')
  @HostBinding('class.ant-dropdown-menu-root')
  get _isInDropDownClass(): boolean {
    return this.isInDropDown;
  }

  @HostBinding('class.ant-menu')
  @HostBinding('class.ant-menu-root')
  get _isNotInDropDownClass(): boolean {
    return !this.isInDropDown;
  }

  @HostBinding('class.ant-dropdown-menu-light')
  get setDropDownThemeLightClass(): boolean {
    return this.isInDropDown && (this.nzTheme === 'light');
  }

  @HostBinding('class.ant-dropdown-menu-dark')
  get setDropDownThemeDarkClass(): boolean {
    return this.isInDropDown && (this.nzTheme === 'dark');
  }

  @HostBinding('class.ant-menu-light')
  get setMenuThemeLightClass(): boolean {
    return (!this.isInDropDown) && (this.nzTheme === 'light');
  }

  @HostBinding('class.ant-menu-dark')
  get setMenuThemeDarkClass(): boolean {
    return (!this.isInDropDown) && (this.nzTheme === 'dark');
  }

  @HostBinding('class.ant-menu-vertical')
  get setMenuVerticalClass(): boolean {
    return (!this.isInDropDown) && (this.nzMode === 'vertical');
  }

  @HostBinding('class.ant-menu-horizontal')
  get setMenuHorizontalClass(): boolean {
    return (!this.isInDropDown) && (this.nzMode === 'horizontal');
  }

  @HostBinding('class.ant-menu-inline')
  get setMenuInlineClass(): boolean {
    return (!this.isInDropDown) && (this.nzMode === 'inline');
  }

  @HostBinding('class.ant-menu-inline-collapsed')
  get setMenuInlineCollapsedClass(): boolean {
    return (!this.isInDropDown) && (this.nzMode !== 'horizontal') && this.nzInlineCollapsed;
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName === 'nzMode') {
        if (this.isInit) {
          this.subMenus.forEach(submenu => {
            submenu.nzOpen = false;
            submenu.nzOpenChange.emit(false);
          });
        }
      }
    }
  }

  ngAfterViewInit(): void {
    this.isInit = true;
    this._tempMode = this.nzMode;
  }

  /** trigger when menu item clicked */
  clearAllSelected(): void {
    this.menuItems.forEach(menu => menu.nzSelected = false);
  }

  hideSubMenus(): void {
    this._subMenusOpenIndex = [];
    this.subMenus.forEach((submenu, index) => {
      if (submenu.nzOpen) {
        this._subMenusOpenIndex.push(index);
      }
      submenu.nzOpen = false;
    });
  }

  reductionSubMenus(): void {
    this._subMenusOpenIndex.forEach(i => this.subMenus[ i ].nzOpen = true);
    this._subMenusOpenIndex = [];
  }

  /** api for dropdown or navigation to set isInDropDown status */
  setDropDown(value: boolean): void {
    setTimeout(_ => {
      this.isInDropDown = value;
      this.menuItems.forEach(menu => menu.isInDropDown = value);
      this.subMenus.forEach(subMenu => subMenu.isInDropDown = value);
    });
  }

  setHasSubMenu(value: boolean): void {
    setTimeout(_ => {
      this.hasSubMenu = value;
    });
  }
}
