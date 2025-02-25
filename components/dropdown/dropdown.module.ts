/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzMenuModule } from 'ng-zorro-antd/menu';

import { NzContextMenuServiceModule } from './context-menu.service.module';
import { NzDropDownADirective } from './dropdown-a.directive';
import { NzDropdownButtonDirective } from './dropdown-button.directive';
import { NzDropdownMenuComponent } from './dropdown-menu.component';
import { NzDropDownDirective } from './dropdown.directive';

@NgModule({
  imports: [
    NzDropDownDirective,
    NzDropDownADirective,
    NzDropdownMenuComponent,
    NzDropdownButtonDirective,
    NzContextMenuServiceModule
  ],
  exports: [NzMenuModule, NzDropDownDirective, NzDropDownADirective, NzDropdownMenuComponent, NzDropdownButtonDirective]
})
export class NzDropDownModule {}
