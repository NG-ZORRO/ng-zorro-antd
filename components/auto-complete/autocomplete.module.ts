/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzAutocompleteOptgroupComponent } from './autocomplete-optgroup.component';
import { NzAutocompleteOptionComponent } from './autocomplete-option.component';
import { NzAutocompleteOriginDirective } from './autocomplete-origin.directive';
import { NzAutocompleteTriggerDirective } from './autocomplete-trigger.directive';
import { NzAutocompleteComponent } from './autocomplete.component';

@NgModule({
  exports: [
    NzAutocompleteComponent,
    NzAutocompleteOptionComponent,
    NzAutocompleteOriginDirective,
    NzAutocompleteTriggerDirective,
    NzAutocompleteOptgroupComponent
  ],
  imports: [
    NzAutocompleteComponent,
    NzAutocompleteOptionComponent,
    NzAutocompleteOriginDirective,
    NzAutocompleteTriggerDirective,
    NzAutocompleteOptgroupComponent
  ]
})
export class NzAutocompleteModule {}
