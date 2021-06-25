/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, TemplateRef } from '@angular/core';

import { NzMenuPanel } from './menu';
import { NzMenuStack } from './menu-stack';

@Directive({
  selector: 'ng-template[nzMenuPanel]',
  exportAs: 'nzMenuPanel'
})
export class NzMenuNextPanelDirective {
  menu?: NzMenuPanel;
  menuStack: NzMenuStack | null = null;

  constructor(readonly templateRef: TemplateRef<unknown>) {}

  registerMenu(menu: NzMenuPanel): void {
    this.menu = menu;

    this.menu.menuStack = this.menuStack;
    this.menu.menuStack?.push(menu);
  }
}
