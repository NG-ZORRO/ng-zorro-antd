/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, Host, Optional, TemplateRef } from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NZ_MENU_LAZY_ITEM, NzMenuLazyItem } from './item';
import { NzMenuPanel } from './menu';
import { NzMenuTriggerForDirective } from './nz-menu-trigger-for.directive';

@Directive({
  selector: '[nzMenuItem]',
  providers: [
    {
      provide: NZ_MENU_LAZY_ITEM,
      useExisting: NzMenuLazyItemDirective
    }
  ]
})
export class NzMenuLazyItemDirective implements NzMenuLazyItem {
  get triggerFor(): NzMenuPanel | null {
    return this.triggerForDir?.getMenu() || null;
  }

  constructor(
    public templateRef: TemplateRef<NzSafeAny>,
    @Host() @Optional() private triggerForDir: NzMenuTriggerForDirective
  ) {}
}
