/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { LayoutModule } from '@angular/cdk/layout';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';

@NgModule({
  imports: [BidiModule, CommonModule, LayoutModule, PlatformModule, NzSegmentedModule]
})
export class NzFlexModule {}
