/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: '[nz-submenu-inline-child]',
  exportAs: 'nzSubmenuInlineChild',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template [ngTemplateOutlet]="templateOutlet"></ng-template>
  `,
  host: {
    '[class.ant-menu]': 'true',
    '[class.ant-menu-inline]': 'true',
    '[class.ant-menu-sub]': 'true',
    '[class]': 'menuClass'
  }
})
export class NzSubmenuInlineChildComponent {
  @Input() templateOutlet: TemplateRef<NzSafeAny> | null = null;
  @Input() menuClass: string | null = null;
}
