/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzSkeletonElementComponent } from './skeleton-element.component';
import { NzSkeletonComponent } from './skeleton.component';

@NgModule({
  declarations: [NzSkeletonComponent, NzSkeletonElementComponent],
  imports: [CommonModule],
  exports: [NzSkeletonComponent, NzSkeletonElementComponent]
})
export class NzSkeletonModule {}
