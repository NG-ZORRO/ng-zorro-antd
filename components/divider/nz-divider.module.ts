/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAddOnModule } from 'ng-zorro-antd/core';
import { NzDividerComponent } from './nz-divider.component';

@NgModule({
  imports: [CommonModule, NzAddOnModule],
  declarations: [NzDividerComponent],
  exports: [NzDividerComponent]
})
export class NzDividerModule {}
