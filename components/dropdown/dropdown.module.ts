/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzMenuModule } from 'ng-zorro-antd/menu';

import { NzContextMenuServiceModule } from './context-menu.service.module';
import { NzDropdownADirective } from './dropdown-a.directive';
import { NzDropdownMenuComponent } from './dropdown-menu.component';
import { NzDropdownDirective } from './dropdown.directive';

@NgModule({
  imports: [NzDropdownDirective, NzDropdownADirective, NzDropdownMenuComponent, NzContextMenuServiceModule],
  exports: [NzMenuModule, NzDropdownDirective, NzDropdownADirective, NzDropdownMenuComponent]
})
export class NzDropdownModule {}

/**
 * @deprecated Use {@link NzDropdownModule} instead.
 * This will be removed in v22.0.0.
 */
export const NzDropDownModule = NzDropdownModule;
