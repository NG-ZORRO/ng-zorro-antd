/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzAddOnModule, NzNoAnimationModule } from 'ng-zorro-antd/core';

import { NzAutocompleteOptgroupComponent } from './nz-autocomplete-optgroup.component';
import { NzAutocompleteOptionComponent } from './nz-autocomplete-option.component';
import { NzAutocompleteTriggerDirective } from './nz-autocomplete-trigger.directive';
import { NzAutocompleteComponent } from './nz-autocomplete.component';

@NgModule({
  declarations: [
    NzAutocompleteComponent,
    NzAutocompleteOptionComponent,
    NzAutocompleteTriggerDirective,
    NzAutocompleteOptgroupComponent
  ],
  exports: [
    NzAutocompleteComponent,
    NzAutocompleteOptionComponent,
    NzAutocompleteTriggerDirective,
    NzAutocompleteOptgroupComponent
  ],
  imports: [CommonModule, OverlayModule, FormsModule, NzAddOnModule, NzNoAnimationModule]
})
export class NzAutocompleteModule {}
