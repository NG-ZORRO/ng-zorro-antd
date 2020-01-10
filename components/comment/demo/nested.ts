import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-comment-nested',
  template: `
    <ng-template #commentTemplateRef let-comment="comment">
      <nz-comment [nzAuthor]="comment.author">
        <nz-avatar nz-comment-avatar nzIcon="user" [nzSrc]="comment.avatar"></nz-avatar>
        <nz-comment-content>
          <p>{{ comment.content }}</p>
        </nz-comment-content>
        <nz-comment-action>Reply to</nz-comment-action>
        <ng-container *ngIf="comment.children && comment.children.length">
          <ng-template ngFor let-child [ngForOf]="comment.children">
            <ng-template [ngTemplateOutlet]="commentTemplateRef" [ngTemplateOutletContext]="{ comment: child }"> </ng-template>
          </ng-template>
        </ng-container>
      </nz-comment>
    </ng-template>

    <ng-template [ngTemplateOutlet]="commentTemplateRef" [ngTemplateOutletContext]="{ comment: data }"> </ng-template>
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
