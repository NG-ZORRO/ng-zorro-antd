/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzRadioButtonComponent } from './nz-radio-button.component';
import { NzRadioGroupComponent } from './nz-radio-group.component';
import { NzRadioComponent } from './nz-radio.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [NzRadioComponent, NzRadioButtonComponent, NzRadioGroupComponent],
  declarations: [NzRadioComponent, NzRadioButtonComponent, NzRadioGroupComponent]
})
export class NzRadioModule {}
