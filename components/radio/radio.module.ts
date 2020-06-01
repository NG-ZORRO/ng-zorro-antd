/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzRadioButtonDirective } from './radio-button.directive';
import { NzRadioGroupComponent } from './radio-group.component';
import { NzRadioComponent } from './radio.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [NzRadioComponent, NzRadioButtonDirective, NzRadioGroupComponent],
  declarations: [NzRadioComponent, NzRadioButtonDirective, NzRadioGroupComponent]
})
export class NzRadioModule {}
