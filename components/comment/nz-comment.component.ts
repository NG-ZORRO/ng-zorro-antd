import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { NzCommentActionComponent as CommentAction } from './nz-comment-cells';

@Component({
  selector       : 'nz-comment',
  templateUrl    : './nz-comment.component.html',
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host           : {
    'class': 'ant-comment'
  },
  styles         : [
      `
      nz-comment {
        display: block;
      }

      nz-comment-content {
        display: block;
      }
    `
  ]
})
export class NzCommentComponent {

  @Input() nzAuthor: string | TemplateRef<void>;
  @Input() nzDatetime: string | TemplateRef<void>;

  @ContentChildren(CommentAction) actions: QueryList<CommentAction>;
  constructor() {
  }

}
