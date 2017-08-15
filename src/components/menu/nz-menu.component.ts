import {
  Component, ViewEncapsulation, HostBinding, Input, OnChanges, SimpleChanges, AfterViewInit
} from '@angular/core';

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
  /** set when has submenu component */
  hasSubMenu = false;
  /** set when in dropdown component */
  isInDropDown = false;
  /** collection of menu item */
  menuItems = [];
  /** collection of sub menu */
  subMenus = [];
  /** view init flat */
  isInit = false;
  @Input() nzMode: NzMode = 'vertical';
  @Input() nzTheme: 'light' | 'dark' = 'light';
  @Input() nzClickActive = true;

  /** define host class */
  @HostBinding('class.ant-dropdown-menu')
  @HostBinding('class.ant-menu-dropdown-vertical')
  @HostBinding('class.ant-dropdown-menu-root')
  get _isInDropDownClass() {
    return this.isInDropDown;
  }

  @HostBinding('class.ant-menu')
  @HostBinding('class.ant-menu-root')
  get _isNotInDropDownClass() {
    return !this.isInDropDown;
  }

  @HostBinding('class.ant-dropdown-menu-light')
  get setDropDownThemeLightClass() {
    return this.isInDropDown && (this.nzTheme === 'light');
  }

  @HostBinding('class.ant-dropdown-menu-dark')
  get setDropDownThemeDarkClass() {
    return this.isInDropDown && (this.nzTheme === 'dark');
  }

  @HostBinding('class.ant-menu-light')
  get setMenuThemeLightClass() {
    return (!this.isInDropDown) && (this.nzTheme === 'light');
  }

  @HostBinding('class.ant-menu-dark')
  get setMenuThemeDarkClass() {
    return (!this.isInDropDown) && (this.nzTheme === 'dark');
  }

  @HostBinding('class.ant-menu-vertical')
  get setMenuVerticalClass() {
    return (!this.isInDropDown) && (this.nzMode === 'vertical');
  }

  @HostBinding('class.ant-menu-horizontal')
  get setMenuHorizontalClass() {
    return (!this.isInDropDown) && (this.nzMode === 'horizontal');
  }

  @HostBinding('class.ant-menu-inline')
  get setMenuInlineClass() {
    return (!this.isInDropDown) && (this.nzMode === 'inline');
  }

  ngOnChanges(changes: SimpleChanges) {
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

  ngAfterViewInit() {
    this.isInit = true;
  }

  /** trigger when menu item clicked */
  clearAllSelected() {
    this.menuItems.forEach(menu => menu.nzSelected = false);
  }

  /** api for dropdown or navigation to set isInDropDown status */
  setDropDown(value: boolean) {
    setTimeout(_ => {
      this.isInDropDown = value;
      this.menuItems.forEach(menu => menu.isInDropDown = value);
      this.subMenus.forEach(subMenu => subMenu.isInDropDown = value);
    });
  }
}
