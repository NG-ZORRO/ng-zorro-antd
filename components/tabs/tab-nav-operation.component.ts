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
  ViewEncapsulation,
  booleanAttribute,
  inject
} from '@angular/core';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzDropDownDirective, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { NzTabAddButtonComponent } from './tab-add-button.component';
import { NzTabNavItemDirective } from './tab-nav-item.directive';

@Component({
  selector: 'nz-tab-nav-operation',
  exportAs: 'nzTabNavOperation',
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
      <nz-icon nzType="ellipsis" />
    </button>
    <nz-dropdown-menu #menu="nzDropdownMenu">
      @if (menuOpened) {
        <ul nz-menu>
          @for (item of items; track item) {
            <li
              nz-menu-item
              class="ant-tabs-dropdown-menu-item"
              [class.ant-tabs-dropdown-menu-item-disabled]="item.disabled"
              [nzSelected]="item.active"
              [nzDisabled]="item.disabled"
              (click)="onSelect(item)"
              (contextmenu)="onContextmenu(item, $event)"
            >
              <ng-container *nzStringTemplateOutlet="item.tab.label; context: { visible: false }">
                {{ item.tab.label }}
              </ng-container>
            </li>
          }
        </ul>
      }
    </nz-dropdown-menu>
    @if (addable) {
      <button nz-tab-add-button [addIcon]="addIcon" (click)="addClicked.emit()"></button>
    }
  `,
  host: {
    class: 'ant-tabs-nav-operations',
    '[class.ant-tabs-nav-operations-hidden]': 'items.length === 0'
  },
  imports: [
    NzIconModule,
    NzOutletModule,
    NzTabAddButtonComponent,
    NzDropdownMenuComponent,
    NzMenuModule,
    NzDropDownDirective
  ]
})
export class NzTabNavOperationComponent implements OnDestroy {
  @Input() items: NzTabNavItemDirective[] = [];
  @Input({ transform: booleanAttribute }) addable: boolean = false;
  @Input() addIcon: string | TemplateRef<NzSafeAny> = 'plus';

  @Output() readonly addClicked = new EventEmitter<void>();
  @Output() readonly selected = new EventEmitter<NzTabNavItemDirective>();
  closeAnimationWaitTimeoutId?: ReturnType<typeof setTimeout>;
  menuOpened = false;

  private cdr = inject(ChangeDetectorRef);
  private readonly element: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

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
