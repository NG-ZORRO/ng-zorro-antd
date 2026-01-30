import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCommentModule } from 'ng-zorro-antd/comment';

@Component({
  selector: 'nz-demo-comment-nested',
  imports: [NgTemplateOutlet, NzAvatarModule, NzCommentModule],
  template: `
    <ng-template #commentTemplateRef let-comment="comment">
      <nz-comment [nzAuthor]="comment.author">
        <nz-avatar nz-comment-avatar nzIcon="user" [nzSrc]="comment.avatar" />
        <nz-comment-content>
          <p>{{ comment.content }}</p>
        </nz-comment-content>
        <nz-comment-action>Reply to</nz-comment-action>
        @if (comment.children && comment.children.length) {
          @for (child of comment.children; track child) {
            <ng-template [ngTemplateOutlet]="commentTemplateRef" [ngTemplateOutletContext]="{ comment: child }" />
          }
        }
      </nz-comment>
    </ng-template>

    <ng-template [ngTemplateOutlet]="commentTemplateRef" [ngTemplateOutletContext]="{ comment: data }" />
  `
})
export class NzDemoCommentNestedComponent {
  data = {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources' +
      '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    children: [
      {
        author: 'Han Solo',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content:
          'We supply a series of design principles, practical patterns and high quality design resources' +
          '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        children: [
          {
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content:
              'We supply a series of design principles, practical patterns and high quality design resources' +
              '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
          },
          {
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content:
              'We supply a series of design principles, practical patterns and high quality design resources' +
              '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
          }
        ]
      }
    ]
  };
}
