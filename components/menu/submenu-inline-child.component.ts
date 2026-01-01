/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';

import { NzAnimationCollapseDirective } from 'ng-zorro-antd/core/animation';
import { generateClassName, getClassListFromValue } from 'ng-zorro-antd/core/util';

const MENU_PREFIX = 'ant-menu';

@Component({
  selector: '[nz-submenu-inline-child]',
  exportAs: 'nzSubmenuInlineChild',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
  hostDirectives: [
    {
      directive: NzAnimationCollapseDirective,
      inputs: ['open', 'leavedClassName']
    }
  ],
  host: {
    '[class]': 'mergedClass()'
  }
})
export class NzSubmenuInlineChildComponent {
  protected readonly dir = inject(Directionality).valueSignal;

  readonly menuClass = input<string>('');
  readonly open = input(false);
  readonly leavedClassName = input(generateClassName(MENU_PREFIX, 'submenu-hidden'));

  protected readonly mergedClass = computed(() => {
    const customCls = getClassListFromValue(this.menuClass()) || [];
    const cls = [
      MENU_PREFIX,
      generateClassName(MENU_PREFIX, 'inline'),
      generateClassName(MENU_PREFIX, 'sub'),
      ...customCls
    ];
    if (this.dir() === 'rtl') {
      cls.push(generateClassName(MENU_PREFIX, 'rtl'));
    }
    return cls;
  });
}
