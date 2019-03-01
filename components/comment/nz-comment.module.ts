import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAddOnModule } from '../core/addon/addon.module';
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
  imports     : [
    CommonModule,
    NzAddOnModule
  ],
  exports     : [ NzCommentComponent, ...NZ_COMMENT_CELLS ],
  declarations: [ NzCommentComponent, ...NZ_COMMENT_CELLS ]
})
export class NzCommentModule {
}
