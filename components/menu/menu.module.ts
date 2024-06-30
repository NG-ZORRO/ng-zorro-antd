/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzMenuDividerDirective } from './menu-divider.directive';
import { NzMenuGroupComponent } from './menu-group.component';
import { NzMenuItemComponent } from './menu-item.component';
import { NzMenuDirective } from './menu.directive';
import { NzSubmenuInlineChildComponent } from './submenu-inline-child.component';
import { NzSubmenuNoneInlineChildComponent } from './submenu-non-inline-child.component';
import { NzSubMenuTitleComponent } from './submenu-title.component';
import { NzSubMenuComponent } from './submenu.component';

@NgModule({
  imports: [
    NzMenuDirective,
    NzMenuItemComponent,
    NzSubMenuComponent,
    NzMenuDividerDirective,
    NzMenuGroupComponent,
    NzSubMenuTitleComponent,
    NzSubmenuInlineChildComponent,
    NzSubmenuNoneInlineChildComponent
  ],
  exports: [NzMenuDirective, NzMenuItemComponent, NzSubMenuComponent, NzMenuDividerDirective, NzMenuGroupComponent]
})
export class NzMenuModule {}
