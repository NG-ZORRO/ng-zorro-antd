/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzClassListAddDirective } from './classlist_add';
import { NzStringTemplateOutletDirective } from './string_template_outlet';

@NgModule({
  imports: [CommonModule],
  exports: [NzStringTemplateOutletDirective, NzClassListAddDirective],
  declarations: [NzStringTemplateOutletDirective, NzClassListAddDirective]
})
export class NzAddOnModule {}
