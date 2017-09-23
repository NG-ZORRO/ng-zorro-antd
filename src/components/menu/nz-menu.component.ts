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
  /** temporary mode */
  _tempMode: NzMode;
  /** opened index of array */
  _subMenusOpenIndex = [];
  /** nzInlineCollapsed */
  _nzInlineCollapsed = false;

  @Input() nzMode: NzMode = 'vertical';
  @Input() nzTheme: 'light' | 'dark' = 'light';
  @Input() nzClickActive = true;

  @Input()
  get nzInlineCollapsed(): boolean {
    return this._nzInlineCollapsed;
  }

  set nzInlineCollapsed(state: boolean) {
    this._nzInlineCollapsed = state;
    if (!this.isInit) {
      return
    }
    if (this._nzInlineCollapsed) {
      this.hideSubMenus();
      // after the animation is over
      setTimeout(() => this.nzMode = 'vertical', 150)
    } else {
      this.reductionSubMenus();
      this.nzMode = this._tempMode;
    }

  }

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

  @HostBinding('class.ant-menu-inline-collapsed')
  get setMenuInlineCollapsedClass() {
    return (!this.isInDropDown) && (this.nzMode !== 'horizontal') && this.nzInlineCollapsed;
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
    this._tempMode = this.nzMode;
  }

  /** trigger when menu item clicked */
  clearAllSelected() {
    this.menuItems.forEach(menu => menu.nzSelected = false);
  }

  hideSubMenus() {
    this._subMenusOpenIndex = [];
    this.subMenus.forEach((submenu, index) => {
      if (submenu.nzOpen) {
        this._subMenusOpenIndex.push(index)
      }
      submenu.nzOpen = false;
    });
  }

  reductionSubMenus() {
    this._subMenusOpenIndex.forEach(i => this.subMenus[ i ].nzOpen = true);
    this._subMenusOpenIndex = [];
  }

  /** api for dropdown or navigation to set isInDropDown status */
  setDropDown(value: boolean) {
    setTimeout(_ => {
      this.isInDropDown = value;
      this.menuItems.forEach(menu => menu.isInDropDown = value);
      this.subMenus.forEach(subMenu => subMenu.isInDropDown = value);
    });
  }

  setHasSubMenu(value: boolean) {
    setTimeout(_ => {
      this.hasSubMenu = value;
    })
  }
}
