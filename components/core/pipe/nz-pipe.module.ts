/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzBytesPipe } from './nz-bytes.pipe';
import { NzToCssUnitPipe } from './nz-css-unit.pipe';
import { NzEllipsisPipe } from './nz-ellipsis.pipe';
import { NzMathPipe } from './nz-math.pipe';
import { NzSafeNullPipe } from './nz-safe-null.pipe';
import { NzSanitizerPipe } from './nz-sanitizer.pipe';
import { NzSomePipe } from './nz-some.pipe';
import { NzTrimPipe } from './nz-trim.pipe';
import { NzTimeRangePipe } from './time-range.pipe';

@NgModule({
  imports: [CommonModule],
  exports: [NzTimeRangePipe, NzToCssUnitPipe],
  declarations: [
    NzTimeRangePipe,
    NzToCssUnitPipe,
    NzSafeNullPipe,
    NzSanitizerPipe,
    NzTrimPipe,
    NzBytesPipe,
    NzSomePipe,
    NzMathPipe,
    NzEllipsisPipe
  ]
})
export class NzPipesModule {}
