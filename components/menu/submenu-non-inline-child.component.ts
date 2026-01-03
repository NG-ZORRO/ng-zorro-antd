/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import { ChangeDetectionStrategy, Component, computed, inject, input, output, ViewEncapsulation } from '@angular/core';

import { SLIDE_ANIMATION_CLASS, withAnimationCheck } from 'ng-zorro-antd/core/animation';
import { generateClassName, getClassListFromValue } from 'ng-zorro-antd/core/util';

import { NzIsMenuInsideDropdownToken } from './menu.token';
import { NzMenuThemeType, NzSubmenuTrigger } from './menu.types';

const ANT_PREFIX = 'ant';
const MENU_PREFIX = `${ANT_PREFIX}-menu`;
const SUBMENU_PREFIX = `${MENU_PREFIX}-submenu`;
const DROPDOWN_PREFIX = `${ANT_PREFIX}-dropdown`;
const ANIMATION_PREFIX = `${ANT_PREFIX}-zoom-big`;

const ANIMATION_CLASS = {
  vertical: {
    enter: `${ANIMATION_PREFIX}-enter ${ANIMATION_PREFIX}-enter-active`,
    leave: `${ANIMATION_PREFIX}-leave ${ANIMATION_PREFIX}-leave-active`
  },
  horizontal: SLIDE_ANIMATION_CLASS
};

@Component({
  selector: '[nz-submenu-none-inline-child]',
  exportAs: 'nzSubmenuNoneInlineChild',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="mergedMenuClass()">
      <ng-content />
    </div>
  `,
  host: {
    '[class]': 'submenuClass()',
    '(mouseenter)': 'setMouseState(true)',
    '(mouseleave)': 'setMouseState(false)',
    '[animate.enter]': `animationEnter()`,
    '[animate.leave]': `animationLeave()`
  }
})
export class NzSubmenuNoneInlineChildComponent {
  protected readonly isMenuInsideDropdown = inject(NzIsMenuInsideDropdownToken);
  protected readonly dir = inject(Directionality).valueSignal;

  readonly menuClass = input<string>('');
  readonly theme = input<NzMenuThemeType>('light');
  readonly mode = input<'vertical' | 'horizontal'>('vertical');
  readonly position = input<'right' | 'left'>('right');
  readonly open = input<boolean>(false);
  readonly nzDisabled = input<boolean>(false);
  readonly nzTriggerSubMenuAction = input<NzSubmenuTrigger>('hover');
  readonly subMenuMouseState = output<boolean>();

  protected readonly animationEnter = withAnimationCheck(() => ANIMATION_CLASS[this.mode()].enter);
  protected readonly animationLeave = withAnimationCheck(() => ANIMATION_CLASS[this.mode()].leave);

  protected readonly submenuClass = computed(() => {
    const cls = [
      SUBMENU_PREFIX,
      generateClassName(SUBMENU_PREFIX, 'popup'),
      generateClassName(MENU_PREFIX, this.theme() === 'dark' ? 'dark' : 'light')
    ];

    const mode = this.mode();
    const position = this.position() === 'left' ? 'left' : 'right';
    if (mode === 'horizontal') {
      cls.push(generateClassName(SUBMENU_PREFIX, 'placement-bottom'));
    } else if (mode === 'vertical') {
      cls.push(generateClassName(SUBMENU_PREFIX, `placement-${position}`));
    }

    if (this.dir() === 'rtl') {
      cls.push(generateClassName(SUBMENU_PREFIX, 'rtl'));
    }
    return cls;
  });

  protected readonly mergedMenuClass = computed(() => {
    const cls = getClassListFromValue(this.menuClass()) || [];
    if (this.isMenuInsideDropdown) {
      cls.push(
        generateClassName(DROPDOWN_PREFIX, 'menu'),
        generateClassName(DROPDOWN_PREFIX, 'menu-sub'),
        generateClassName(DROPDOWN_PREFIX, 'menu-vertical')
      );
    } else {
      cls.push(MENU_PREFIX, generateClassName(MENU_PREFIX, 'sub'), generateClassName(MENU_PREFIX, 'vertical'));
    }

    if (this.dir() === 'rtl') {
      cls.push(generateClassName(MENU_PREFIX, 'rtl'));
    }
    return cls;
  });

  protected setMouseState(state: boolean): void {
    if (!this.nzDisabled() && this.nzTriggerSubMenuAction() === 'hover') {
      this.subMenuMouseState.emit(state);
    }
  }
}
