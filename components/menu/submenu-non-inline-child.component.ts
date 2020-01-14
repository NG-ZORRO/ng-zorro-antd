/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMenuModeType, NzMenuThemeType } from './menu.types';

@Component({
  selector: '[nz-submenu-none-inline-child]',
  exportAs: 'nzSubmenuNoneInlineChild',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul
      [class.ant-dropdown-menu]="isMenuInsideDropDown"
      [class.ant-menu]="!isMenuInsideDropDown"
      [class.ant-dropdown-menu-vertical]="isMenuInsideDropDown"
      [class.ant-menu-vertical]="!isMenuInsideDropDown"
      [class.ant-dropdown-menu-sub]="isMenuInsideDropDown"
      [class.ant-menu-sub]="!isMenuInsideDropDown"
      [class]="menuClass"
    >
      <ng-template [ngTemplateOutlet]="templateOutlet"></ng-template>
    </ul>
  `,
  host: {
    '[class.ant-menu-submenu]': 'true',
    '[class.ant-menu-submenu-popup]': 'true',
    '[class.ant-menu-light]': "theme === 'light'",
    '[class.ant-menu-dark]': "theme === 'dark'",
    '[class.ant-menu-submenu-placement-bottomLeft]': "mode === 'horizontal'",
    '[class.ant-menu-submenu-placement-rightTop]': "mode === 'vertical' && placement === 'rightTop'",
    '[class.ant-menu-submenu-placement-leftTop]': "mode === 'vertical' && placement === 'leftTop'",
    '(mouseenter)': 'setMouseState(true)',
    '(mouseleave)': 'setMouseState(false)'
  }
})
export class NzSubmenuNoneInlineChildComponent {
  @Input() menuClass: string | null = null;
  @Input() theme: NzMenuThemeType = 'light';
  @Input() templateOutlet: TemplateRef<NzSafeAny> | null = null;
  @Input() isMenuInsideDropDown = false;
  @Input() mode: NzMenuModeType = 'vertical';
  @Input() placement = 'rightTop';
  @Input() nzDisabled = false;
  @Output() readonly subMenuMouseState = new EventEmitter<boolean>();
  setMouseState(state: boolean): void {
    if (!this.nzDisabled) {
      this.subMenuMouseState.next(state);
    }
  }
}
