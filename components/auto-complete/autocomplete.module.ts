/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzInputModule } from 'ng-zorro-antd/input';

import { NzAutocompleteOptgroupComponent } from './autocomplete-optgroup.component';
import { NzAutocompleteOptionComponent } from './autocomplete-option.component';
import { NzAutocompleteTriggerDirective } from './autocomplete-trigger.directive';
import { NzAutocompleteComponent } from './autocomplete.component';

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
  imports: [BidiModule, CommonModule, OverlayModule, NzOutletModule, NzNoAnimationModule, NzInputModule]
})
export class NzAutocompleteModule {}
