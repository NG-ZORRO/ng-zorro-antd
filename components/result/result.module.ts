/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzResultNotFoundComponent } from './partial/not-found';
import { NzResultServerErrorComponent } from './partial/server-error.component';
import { NzResultUnauthorizedComponent } from './partial/unauthorized';
import {
  NzResultContentDirective,
  NzResultExtraDirective,
  NzResultIconDirective,
  NzResultSubtitleDirective,
  NzResultTitleDirective
} from './result-cells';
import { NzResultComponent } from './result.component';

const partial = [NzResultNotFoundComponent, NzResultServerErrorComponent, NzResultUnauthorizedComponent];

const cellDirectives = [
  NzResultContentDirective,
  NzResultExtraDirective,
  NzResultIconDirective,
  NzResultSubtitleDirective,
  NzResultTitleDirective
];

@NgModule({
  imports: [NzResultComponent, ...cellDirectives, ...partial],
  exports: [NzResultComponent, ...cellDirectives]
})
export class NzResultModule {}
