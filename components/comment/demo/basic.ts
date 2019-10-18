import { Component } from '@angular/core';
import { distanceInWords } from 'date-fns';

@Component({
  selector: 'nz-demo-comment-basic',
  template: `
    <nz-comment nzAuthor="Han Solo" [nzDatetime]="time">
      <nz-avatar
        nz-comment-avatar
        nzIcon="user"
        nzSrc="//zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      ></nz-avatar>
      <nz-comment-content>
        <p>
          We supply a series of design principles, practical patterns and high quality design resources (Sketch and
          Axure), to help people create their product prototypes beautifully and efficiently.
        </p>
      </nz-comment-content>
      <nz-comment-action>
        <i
          nz-tooltip
          nzTitle="Like"
          nz-icon
          nzType="like"
          [theme]="likes > 0 ? 'twotone' : 'outline'"
          (click)="like()"
        ></i>
        <span class="count like">{{ likes }}</span>
      </nz-comment-action>
      <nz-comment-action>
        <i
          nz-tooltip
          nzTitle="Dislike"
          nz-icon
          nzType="dislike"
          [theme]="dislikes > 0 ? 'twotone' : 'outline'"
          (click)="dislike()"
        ></i>
        <span class="count dislike">{{ dislikes }}</span>
      </nz-comment-action>
      <nz-comment-action>Reply to</nz-comment-action>
    </nz-comment>
  `,
  styles: [
    `
      .count {
        padding-left: 8px;
        cursor: auto;
      }
    `
  ]
})
export class NzDemoCommentBasicComponent {
  likes = 0;
  dislikes = 0;
  time = distanceInWords(new Date(), new Date());

  like(): void {
    this.likes = 1;
    this.dislikes = 0;
  }

  dislike(): void {
    this.likes = 0;
    this.dislikes = 1;
  }
}
