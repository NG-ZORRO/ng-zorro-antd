import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Optional,
  Renderer2
} from '@angular/core';

import { toBoolean } from '../core/util/convert';

import { NzMenuDirective } from './nz-menu.directive';
import { NzSubMenuComponent } from './nz-submenu.component';

@Directive({
  selector: '[nz-menu-item]'
})
export class NzMenuItemDirective implements OnInit {
  private _disabled = false;
  private _selected = false;
  level = 0;
  padding = null;
  isInDropDown = false;

  @Input()
  set nzDisabled(value: boolean) {
    this._disabled = toBoolean(value);
  }

  get nzDisabled(): boolean {
    return this._disabled;
  }

  @Input()
  set nzSelected(value: boolean) {
    this._selected = toBoolean(value);
    if (this._selected) {
      this.renderer.addClass(this.hostElement.nativeElement, this.isInDropDown ? 'ant-dropdown-menu-item-selected' : 'ant-menu-item-selected');
    } else {
      this.renderer.removeClass(this.hostElement.nativeElement, this.isInDropDown ? 'ant-dropdown-menu-item-selected' : 'ant-menu-item-selected');
    }
  }

  get nzSelected(): boolean {
    return this._selected;
  }

  /** clear all item selected status except this */
  @HostListener('click', [ '$event' ])
  onClickItem(e: MouseEvent): void {
    if (this.nzDisabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.nzMenuDirective.clickItem(this);
    if (this.nzMenuDirective.nzSelectable) {
      this.nzMenuDirective.clearAllSelected();
      this.nzSelected = true;
    }
    if (this.nzSubMenuComponent) {
      this.nzSubMenuComponent.clickSubMenuDropDown();
    }
  }

  /** define host class */
  @HostBinding('class.ant-dropdown-menu-item')
  get isInDropDownClass(): boolean {
    return this.isInDropDown;
  }

  @HostBinding('class.ant-menu-item')
  get isNotInDropDownClass(): boolean {
    return !this.isInDropDown;
  }

  @HostBinding('class.ant-dropdown-menu-item-disabled')
  get setDropDownDisableClass(): boolean {
    return this.isInDropDown && this.nzDisabled;
  }

  @HostBinding('class.ant-menu-item-disabled')
  get setMenuDisableClass(): boolean {
    return (!this.isInDropDown) && this.nzDisabled;
  }

  @HostBinding('style.padding-left.px')
  get setPaddingLeft(): number {
    if (this.nzMenuDirective.nzMode === 'inline') {
      if (this.nzSubMenuComponent) {
        /** if in sub menu component and host menu's mode is inline add PADDING_BASE * level padding */
        return (this.nzSubMenuComponent.level + 1) * this.nzMenuDirective.nzInlineIndent;
      } else {
        /** not in sub menu component but root menu's mode is inline return default padding */
        return this.nzMenuDirective.nzInlineIndent;
      }
    } else {
      return this.padding;
    }
  }

  constructor(private renderer: Renderer2, public cd: ChangeDetectorRef, private nzMenuDirective: NzMenuDirective, @Optional() public nzSubMenuComponent: NzSubMenuComponent, private hostElement: ElementRef) {
  }

  ngOnInit(): void {
    this.nzMenuDirective.menuItems.push(this);
    /** store origin padding in padding */
    if (this.hostElement.nativeElement.style[ 'padding-left' ]) {
      this.padding = parseInt(this.hostElement.nativeElement.style[ 'padding-left' ], 10);
    }
    this.isInDropDown = this.nzMenuDirective.nzInDropDown;
  }
}
