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

import {
  NzCommentActionComponent,
  NzCommentActionHostDirective,
  NzCommentAvatarDirective,
  NzCommentContentDirective
} from './nz-comment-cells';
import { NzCommentComponent } from './nz-comment.component';

const NZ_COMMENT_CELLS = [
  NzCommentAvatarDirective,
  NzCommentContentDirective,
  NzCommentActionComponent,
  NzCommentActionHostDirective
];

@NgModule({
  imports: [CommonModule, NzAddOnModule],
  exports: [NzCommentComponent, ...NZ_COMMENT_CELLS],
  declarations: [NzCommentComponent, ...NZ_COMMENT_CELLS]
})
export class NzCommentModule {}
