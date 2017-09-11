import {
  Component,
  HostBinding,
  Input,
  AfterViewInit,
  HostListener,
  ChangeDetectorRef,
  Renderer2,
  Optional,
  ElementRef
} from '@angular/core';
import { NzMenuComponent } from './nz-menu.component';
import { NzSubMenuComponent } from './nz-submenu.component';

export const PADDING_BASE = 24;

@Component({
  selector: '[nz-menu-item]',
  template: `
    <ng-content></ng-content>`,
})

export class NzMenuItemComponent implements AfterViewInit {
  level = 0;
  padding = null;
  isInDropDown = false;
  selected = false;
  @Input() nzDisable = false;

  @Input()
  set nzSelected(value: boolean) {
    this.selected = value;
    if (value) {
      this._renderer.addClass(this.hostElement.nativeElement, this.isInDropDown ? 'ant-dropdown-menu-item-selected' : 'ant-menu-item-selected')
    } else {
      this._renderer.removeClass(this.hostElement.nativeElement, this.isInDropDown ? 'ant-dropdown-menu-item-selected' : 'ant-menu-item-selected')
    }
  }

  get nzSelected() {
    return this.selected;
  }

  /** clear all item selected status except this */
  @HostListener('click', [ '$event' ])
  _onClickItem() {
    if (this.nzMenuComponent.nzClickActive && (!this.nzDisable)) {
      this.nzMenuComponent.clearAllSelected();
      this.nzSelected = true;
    }
  }

  /** define host class */
  @HostBinding('class.ant-dropdown-menu-item')
  get _isInDropDownClass() {
    return this.isInDropDown;
  }

  @HostBinding('class.ant-menu-item')
  get _isNotInDropDownClass() {
    return !this.isInDropDown;
  }

  @HostBinding('class.ant-dropdown-menu-item-disabled')
  get setDropDownDisableClass() {
    return this.isInDropDown && this.nzDisable;
  }

  @HostBinding('class.ant-menu-item-disabled')
  get setMenuDisableClass() {
    return (!this.isInDropDown) && this.nzDisable;
  }

  @HostBinding('style.padding-left.px')
  get setPaddingLeft() {
    if (this.nzSubMenuComponent) {
      /** if in sub menu component */
      if (this.nzSubMenuComponent.nzMenuComponent.nzMode === 'inline') {
        /** if host menu's mode is inline add PADDING_BASE * level padding */
        return (this.nzSubMenuComponent.level + 1) * PADDING_BASE;
      } else {
        /** return origin padding */
        return this.padding;
      }
    } else if (this.nzMenuComponent.hasSubMenu && (this.nzMenuComponent.nzMode === 'inline')) {
      /** not in sub menu component but root menu's mode is inline and contains submenu return default padding*/
      return PADDING_BASE;
    } else {
      return this.padding;
    }
  }

  constructor(private _renderer: Renderer2, public cd: ChangeDetectorRef, private nzMenuComponent: NzMenuComponent, @Optional() public nzSubMenuComponent: NzSubMenuComponent, private hostElement: ElementRef) {
    this.nzMenuComponent.menuItems.push(this);
    /** store origin padding in padding */
    if (this.hostElement.nativeElement.style[ 'padding-left' ]) {
      this.padding = parseInt(this.hostElement.nativeElement.style[ 'padding-left' ], 10);
    }
  }

  ngAfterViewInit() {
    setTimeout(_ => {
      this.isInDropDown = this.nzMenuComponent.isInDropDown;
    });
  }
}
