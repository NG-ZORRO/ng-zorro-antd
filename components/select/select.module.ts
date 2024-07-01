/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzOptionContainerComponent } from './option-container.component';
import { NzOptionGroupComponent } from './option-group.component';
import { NzOptionItemGroupComponent } from './option-item-group.component';
import { NzOptionItemComponent } from './option-item.component';
import { NzOptionComponent } from './option.component';
import { NzSelectArrowComponent } from './select-arrow.component';
import { NzSelectClearComponent } from './select-clear.component';
import { NzSelectItemComponent } from './select-item.component';
import { NzSelectPlaceholderComponent } from './select-placeholder.component';
import { NzSelectSearchComponent } from './select-search.component';
import { NzSelectTopControlComponent } from './select-top-control.component';
import { NzSelectComponent } from './select.component';

@NgModule({
  imports: [
    NzOptionComponent,
    NzSelectComponent,
    NzOptionContainerComponent,
    NzOptionGroupComponent,
    NzOptionItemComponent,
    NzSelectTopControlComponent,
    NzSelectSearchComponent,
    NzSelectItemComponent,
    NzSelectClearComponent,
    NzSelectArrowComponent,
    NzSelectPlaceholderComponent,
    NzOptionItemGroupComponent
  ],
  exports: [
    NzOptionComponent,
    NzSelectComponent,
    NzOptionGroupComponent,
    NzSelectArrowComponent,
    NzSelectClearComponent,
    NzSelectItemComponent,
    NzSelectPlaceholderComponent,
    NzSelectSearchComponent
  ]
})
export class NzSelectModule {}
