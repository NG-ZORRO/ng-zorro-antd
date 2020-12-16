/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';

import {
  NzCommentActionComponent,
  NzCommentActionHostDirective,
  NzCommentAvatarDirective,
  NzCommentContentDirective
} from './comment-cells';
import { NzCommentComponent } from './comment.component';

const NZ_COMMENT_CELLS = [NzCommentAvatarDirective, NzCommentContentDirective, NzCommentActionComponent, NzCommentActionHostDirective];

@NgModule({
  imports: [BidiModule, CommonModule, NzOutletModule],
  exports: [NzCommentComponent, ...NZ_COMMENT_CELLS],
  declarations: [NzCommentComponent, ...NZ_COMMENT_CELLS]
})
export class NzCommentModule {}
