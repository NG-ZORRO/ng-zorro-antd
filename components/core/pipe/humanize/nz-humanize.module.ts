/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzHumanizeBytesPipe } from './nz-humanize-bytes.pipe';
import { NzHumanizeCheckNullPipe } from './nz-humanize-check-null.pipe';
import { NzHumanizeDurationPipe } from './nz-humanize-duration.pipe';

const pipes = [NzHumanizeBytesPipe, NzHumanizeCheckNullPipe, NzHumanizeDurationPipe];

@NgModule({
  imports: [CommonModule],
  declarations: [...pipes],
  exports: [...pipes]
})
export class NzHumanizeModule {}
