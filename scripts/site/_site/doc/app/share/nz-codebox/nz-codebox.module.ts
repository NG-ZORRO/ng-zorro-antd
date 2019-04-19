/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';
import { NzCodeBoxComponent } from './nz-codebox.component';
import { CommonModule } from '@angular/common';
import { NzHighlightModule } from '../nz-highlight/nz-highlight.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [CommonModule, NzHighlightModule, NgZorroAntdModule],
  declarations: [NzCodeBoxComponent],
  exports: [NzCodeBoxComponent]
})
export class NzCodeBoxModule {}
