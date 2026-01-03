/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzIsMenuInsideDropdownToken } from './menu.token';
import { NzMenuModeType, NzSubmenuTrigger } from './menu.types';

@Component({
  selector: '[nz-submenu-title]',
  exportAs: 'nzSubmenuTitle',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (nzIcon) {
      <nz-icon [nzType]="nzIcon" />
    }
    <ng-container *nzStringTemplateOutlet="nzTitle">
      <span class="ant-menu-title-content">{{ nzTitle }}</span>
    </ng-container>
    <ng-content />
    @if (isMenuInsideDropdown) {
      <span class="ant-dropdown-menu-submenu-expand-icon">
        <nz-icon [nzType]="dir() === 'rtl' ? 'left' : 'right'" class="ant-dropdown-menu-submenu-arrow-icon" />
      </span>
    } @else {
      <span class="ant-menu-submenu-arrow"></span>
    }
  `,
  host: {
    '[class.ant-dropdown-menu-submenu-title]': 'isMenuInsideDropdown',
    '[class.ant-menu-submenu-title]': '!isMenuInsideDropdown',
    '[style.padding-inline-start.px]': 'paddingLeft',
    '(click)': 'clickTitle()',
    '(mouseenter)': 'setMouseState(true)',
    '(mouseleave)': 'setMouseState(false)'
  },
  imports: [NzIconModule, NzOutletModule]
})
export class NzSubMenuTitleComponent {
  protected readonly isMenuInsideDropdown = inject(NzIsMenuInsideDropdownToken);
  protected readonly dir = inject(Directionality).valueSignal;

  @Input() nzIcon: string | null = null;
  @Input() nzTitle: string | TemplateRef<void> | null = null;
  @Input() nzDisabled = false;
  @Input() paddingLeft: number | null = null;
  @Input() mode: NzMenuModeType = 'vertical';
  @Input() nzTriggerSubMenuAction: NzSubmenuTrigger = 'hover';
  @Output() readonly toggleSubMenu = new EventEmitter();
  @Output() readonly subMenuMouseState = new EventEmitter<boolean>();

  protected setMouseState(state: boolean): void {
    if (!this.nzDisabled && this.nzTriggerSubMenuAction === 'hover') {
      this.subMenuMouseState.next(state);
    }
  }

  protected clickTitle(): void {
    if ((this.mode === 'inline' || this.nzTriggerSubMenuAction === 'click') && !this.nzDisabled) {
      this.subMenuMouseState.next(true);
      this.toggleSubMenu.emit();
    }
  }
}
