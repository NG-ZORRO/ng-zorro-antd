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
import { NzIconModule } from 'ng-zorro-antd/icon';

import {
  NzResultContentDirective,
  NzResultExtraDirective,
  NzResultIconDirective,
  NzResultSubtitleDirective,
  NzResultTitleDirective
} from './nz-result-cells';
import { NzResultComponent } from './nz-result.component';

const cellDirectives = [
  NzResultContentDirective,
  NzResultExtraDirective,
  NzResultIconDirective,
  NzResultSubtitleDirective,
  NzResultTitleDirective
];

@NgModule({
  imports: [CommonModule, NzAddOnModule, NzIconModule],
  declarations: [NzResultComponent, ...cellDirectives],
  exports: [NzResultComponent, ...cellDirectives]
})
export class NzResultModule {}
