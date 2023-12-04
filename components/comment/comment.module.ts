/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import {
  NzCommentActionComponent,
  NzCommentActionHostDirective,
  NzCommentAvatarDirective,
  NzCommentContentDirective
} from './comment-cells';
import { NzCommentComponent } from './comment.component';

const NZ_COMMENT_CELLS = [
  NzCommentAvatarDirective,
  NzCommentContentDirective,
  NzCommentActionComponent,
  NzCommentActionHostDirective
];

@NgModule({
  imports: [NzCommentComponent, ...NZ_COMMENT_CELLS],
  exports: [NzCommentComponent, ...NZ_COMMENT_CELLS]
})
export class NzCommentModule {}
