/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzScrollingComponent } from './scrolling.component';

@NgModule({
  imports: [BidiModule, OverlayModule, ScrollingModule, CommonModule],
  declarations: [NzScrollingComponent],
  exports: [NzScrollingComponent]
})
export class NzScrollingModule {}
