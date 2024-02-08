/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzRadioGroupComponent } from './radio-group.component';
import { NzRadioComponent } from './radio.component';

@NgModule({
  imports: [NzRadioComponent, NzRadioGroupComponent],
  exports: [NzRadioComponent, NzRadioGroupComponent]
})
export class NzRadioModule {}
