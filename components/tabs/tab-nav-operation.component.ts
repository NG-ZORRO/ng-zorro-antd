/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzTabNavItemDirective } from './tab-nav-item.directive';

@Component({
  selector: 'nz-tab-nav-operation',
  exportAs: 'nzTabNavOperation',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <button
      nz-dropdown
      class="ant-tabs-nav-more"
      type="button"
      tabindex="-1"
      aria-hidden="true"
      nzOverlayClassName="nz-tabs-dropdown"
      #dropdownTrigger="nzDropdown"
      [nzDropdownMenu]="menu"
      [nzOverlayStyle]="{ minWidth: '46px' }"
      [nzMatchWidthElement]="null"
      (nzVisibleChange)="menuVisChange($event)"
      (mouseenter)="showItems()"
    >
      <i nz-icon nzType="ellipsis"></i>
    </button>
    <nz-dropdown-menu #menu="nzDropdownMenu">
      <ul nz-menu *ngIf="menuOpened">
        <li
          nz-menu-item
          *ngFor="let item of items"
          class="ant-tabs-dropdown-menu-item"
          [class.ant-tabs-dropdown-menu-item-disabled]="item.disabled"
          [nzSelected]="item.active"
          [nzDisabled]="item.disabled"
          (click)="onSelect(item)"
          (contextmenu)="onContextmenu(item, $event)"
        >
          <ng-container *nzStringTemplateOutlet="item.tab.label; context: { visible: false }">{{ item.tab.label }}</ng-container>
        </li>
      </ul>
    </nz-dropdown-menu>
    <button *ngIf="addable" nz-tab-add-button [addIcon]="addIcon" (click)="addClicked.emit()"></button>
  `,
  host: {
    class: 'ant-tabs-nav-operations',
    '[class.ant-tabs-nav-operations-hidden]': 'items.length === 0'
  }
})
export class NzTabNavOperationComponent implements OnDestroy {
  @Input() items: NzTabNavItemDirective[] = [];
  @Input() addable: boolean = false;
  @Input() addIcon: string | TemplateRef<NzSafeAny> = 'plus';

  @Output() readonly addClicked = new EventEmitter<void>();
  @Output() readonly selected = new EventEmitter<NzTabNavItemDirective>();
  closeAnimationWaitTimeoutId = -1;
  menuOpened = false;

  private readonly element: HTMLElement;
  constructor(public cdr: ChangeDetectorRef, private elementRef: ElementRef<HTMLElement>) {
    this.element = this.elementRef.nativeElement;
  }

  onSelect(item: NzTabNavItemDirective): void {
    if (!item.disabled) {
      // ignore nzCanDeactivate
      item.tab.nzClick.emit();
      this.selected.emit(item);
    }
  }

  onContextmenu(item: NzTabNavItemDirective, e: MouseEvent): void {
    if (!item.disabled) {
      item.tab.nzContextmenu.emit(e);
    }
  }
  showItems(): void {
    clearTimeout(this.closeAnimationWaitTimeoutId);
    this.menuOpened = true;
    this.cdr.markForCheck();
  }

  menuVisChange(visible: boolean): void {
    if (!visible) {
      this.closeAnimationWaitTimeoutId = setTimeout(() => {
        this.menuOpened = false;
        this.cdr.markForCheck();
      }, 150);
    }
  }

  getElementWidth(): number {
    return this.element?.offsetWidth || 0;
  }

  getElementHeight(): number {
    return this.element?.offsetHeight || 0;
  }

  ngOnDestroy(): void {
    clearTimeout(this.closeAnimationWaitTimeoutId);
  }
}
