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

import { NzResultNotFoundComponent } from './partial/not-found';
import { NzResultServerErrorComponent } from './partial/server-error.component';
import { NzResultUnauthorizedComponent } from './partial/unauthorized';

import {
  NzResultContentDirective,
  NzResultExtraDirective,
  NzResultIconDirective,
  NzResultSubtitleDirective,
  NzResultTitleDirective
} from './nz-result-cells';
import { NzResultComponent } from './nz-result.component';

const partial = [NzResultNotFoundComponent, NzResultServerErrorComponent, NzResultUnauthorizedComponent];

const cellDirectives = [
  NzResultContentDirective,
  NzResultExtraDirective,
  NzResultIconDirective,
  NzResultSubtitleDirective,
  NzResultTitleDirective
];

@NgModule({
  imports: [CommonModule, NzAddOnModule, NzIconModule],
  declarations: [NzResultComponent, ...cellDirectives, ...partial],
  exports: [NzResultComponent, ...cellDirectives]
})
export class NzResultModule {}
