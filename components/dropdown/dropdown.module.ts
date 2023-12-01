/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzDropDownADirective } from './dropdown-a.directive';
import { NzDropdownButtonDirective } from './dropdown-button.directive';
import { NzDropdownMenuComponent } from './dropdown-menu.component';
import { NzDropDownDirective } from './dropdown.directive';

@NgModule({
  imports: [NzDropDownDirective, NzDropDownADirective, NzDropdownMenuComponent, NzDropdownButtonDirective],
  exports: [NzDropDownDirective, NzDropDownADirective, NzDropdownMenuComponent, NzDropdownButtonDirective]
})
export class NzDropDownModule {}
