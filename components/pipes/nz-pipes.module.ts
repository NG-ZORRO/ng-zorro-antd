/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzAggregatePipe } from './nz-aggregate.pipe';
import { NzBytesPipe } from './nz-bytes.pipe';
import { NzToCssUnitPipe } from './nz-css-unit.pipe';
import { NzEllipsisPipe } from './nz-ellipsis.pipe';
import { NzSanitizerPipe } from './nz-sanitizer.pipe';
import { NzTrimPipe } from './nz-trim.pipe';

const pipes = [NzToCssUnitPipe, NzSanitizerPipe, NzTrimPipe, NzBytesPipe, NzAggregatePipe, NzEllipsisPipe];

@NgModule({
  imports: [pipes],
  exports: [pipes]
})
export class NzPipesModule {}
