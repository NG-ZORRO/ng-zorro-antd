/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SCROLL_SERVICE_PROVIDER } from 'ng-zorro-antd/core';

import { NzBackTopComponent } from './nz-back-top.component';

@NgModule({
  declarations: [NzBackTopComponent],
  exports: [NzBackTopComponent],
  imports: [CommonModule],
  providers: [SCROLL_SERVICE_PROVIDER]
})
export class NzBackTopModule {}
