import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Optional,
  Renderer2,
} from '@angular/core';
import { toBoolean } from '../util/convert';
import { NzMenuComponent } from './nz-menu.component';
import { NzSubMenuComponent } from './nz-submenu.component';

export const PADDING_BASE = 24;

@Component({
  selector: '[nz-menu-item]',
  template: `
    <ng-content></ng-content>`,
})
export class NzMenuItemComponent implements AfterViewInit {
  private _disabled = false;
  private _selected = false;

  level = 0;
  padding = null;
  isInDropDown = false;

  // TODO: should be nzDisabled for consistency
  @Input()
  set nzDisable(value: boolean) {
    this._disabled = toBoolean(value);
  }

  get nzDisable(): boolean {
    return this._disabled;
  }

  @Input()
  set nzSelected(value: boolean) {
    this._selected = toBoolean(value);
    if (this._selected) {
      this._renderer.addClass(this.hostElement.nativeElement, this.isInDropDown ? 'ant-dropdown-menu-item-selected' : 'ant-menu-item-selected');
    } else {
      this._renderer.removeClass(this.hostElement.nativeElement, this.isInDropDown ? 'ant-dropdown-menu-item-selected' : 'ant-menu-item-selected');
    }
  }

  get nzSelected(): boolean {
    return this._selected;
  }

  /** clear all item selected status except this */
  // TODO: the $event param should be removed if not require
  @HostListener('click', [ '$event' ])
  _onClickItem(): void {
    if (this.nzMenuComponent.nzClickActive && (!this.nzDisable)) {
      this.nzMenuComponent.clearAllSelected();
      this.nzSelected = true;
    }
  }

  /** define host class */
  @HostBinding('class.ant-dropdown-menu-item')
  get _isInDropDownClass(): boolean {
    return this.isInDropDown;
  }

  @HostBinding('class.ant-menu-item')
  get _isNotInDropDownClass(): boolean {
    return !this.isInDropDown;
  }

  @HostBinding('class.ant-dropdown-menu-item-disabled')
  get setDropDownDisableClass(): boolean {
    return this.isInDropDown && this.nzDisable;
  }

  @HostBinding('class.ant-menu-item-disabled')
  get setMenuDisableClass(): boolean {
    return (!this.isInDropDown) && this.nzDisable;
  }

  @HostBinding('style.padding-left.px')
  get setPaddingLeft(): number {
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

  ngAfterViewInit(): void {
    setTimeout(_ => {
      this.isInDropDown = this.nzMenuComponent.isInDropDown;
    });
  }
}
