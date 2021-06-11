/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  NzSkeletonElementAvatarComponent,
  NzSkeletonElementButtonComponent,
  NzSkeletonElementDirective,
  NzSkeletonElementImageComponent,
  NzSkeletonElementInputComponent
} from './skeleton-element.component';
import { NzSkeletonComponent } from './skeleton.component';

@NgModule({
  declarations: [
    NzSkeletonComponent,
    NzSkeletonElementDirective,
    NzSkeletonElementButtonComponent,
    NzSkeletonElementAvatarComponent,
    NzSkeletonElementImageComponent,
    NzSkeletonElementInputComponent
  ],
  imports: [BidiModule, CommonModule],
  exports: [
    NzSkeletonComponent,
    NzSkeletonElementDirective,
    NzSkeletonElementButtonComponent,
    NzSkeletonElementAvatarComponent,
    NzSkeletonElementImageComponent,
    NzSkeletonElementInputComponent
  ]
})
export class NzSkeletonModule {}
