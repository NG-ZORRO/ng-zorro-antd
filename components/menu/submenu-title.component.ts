/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { nzInjectDirectionality } from 'ng-zorro-antd/cdk/bidi';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';

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
    @if (isMenuInsideDropDown) {
      <span class="ant-dropdown-menu-submenu-expand-icon">
        @switch (dir) {
          @case ('rtl') {
            <nz-icon nzType="left" class="ant-dropdown-menu-submenu-arrow-icon" />
          }
          @default {
            <nz-icon nzType="right" class="ant-dropdown-menu-submenu-arrow-icon" />
          }
        }
      </span>
    } @else {
      <span class="ant-menu-submenu-arrow"></span>
    }
  `,
  host: {
    '[class.ant-dropdown-menu-submenu-title]': 'isMenuInsideDropDown',
    '[class.ant-menu-submenu-title]': '!isMenuInsideDropDown',
    '[style.paddingLeft.px]': `dir.isRtl() ? null : paddingLeft `,
    '[style.paddingRight.px]': `dir.isRtl() ? paddingLeft : null`,
    '(click)': 'clickTitle()',
    '(mouseenter)': 'setMouseState(true)',
    '(mouseleave)': 'setMouseState(false)'
  },
  imports: [NzIconModule, NzOutletModule]
})
export class NzSubMenuTitleComponent {
  @Input() nzIcon: string | null = null;
  @Input() nzTitle: string | TemplateRef<void> | null = null;
  @Input() isMenuInsideDropDown = false;
  @Input() nzDisabled = false;
  @Input() paddingLeft: number | null = null;
  @Input() mode: NzMenuModeType = 'vertical';
  @Input() nzTriggerSubMenuAction: NzSubmenuTrigger = 'hover';
  @Output() readonly toggleSubMenu = new EventEmitter();
  @Output() readonly subMenuMouseState = new EventEmitter<boolean>();

  readonly dir = nzInjectDirectionality();

  setMouseState(state: boolean): void {
    if (!this.nzDisabled && this.nzTriggerSubMenuAction === 'hover') {
      this.subMenuMouseState.next(state);
    }
  }

  clickTitle(): void {
    if ((this.mode === 'inline' || this.nzTriggerSubMenuAction === 'click') && !this.nzDisabled) {
      this.subMenuMouseState.next(true);
      this.toggleSubMenu.emit();
    }
  }
}
