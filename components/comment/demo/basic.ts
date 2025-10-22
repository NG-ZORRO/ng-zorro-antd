import { Component } from '@angular/core';

import { formatDistance } from 'date-fns';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'nz-demo-comment-basic',
  imports: [NzAvatarModule, NzCommentModule, NzIconModule, NzTooltipModule],
  template: `
    <nz-comment nzAuthor="Han Solo" [nzDatetime]="time">
      <nz-avatar
        nz-comment-avatar
        nzIcon="user"
        nzSrc="//zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      ></nz-avatar>
      <nz-comment-content>
        <p>
          We supply a series of design principles, practical patterns and high quality design resources(Sketch and
          Axure), to help people create their product prototypes beautifully and efficiently.
        </p>
      </nz-comment-content>
      <nz-comment-action>
        <nz-icon
          nz-tooltip
          nzTooltipTitle="Like"
          nzType="like"
          [nzTheme]="likes > 0 ? 'twotone' : 'outline'"
          (click)="like()"
        />
        <span class="count like">{{ likes }}</span>
      </nz-comment-action>
      <nz-comment-action>
        <nz-icon
          nz-tooltip
          nzTooltipTitle="Dislike"
          nzType="dislike"
          [nzTheme]="dislikes > 0 ? 'twotone' : 'outline'"
          (click)="dislike()"
        />
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
      .ant-comment-rtl .count {
        padding-right: 8px;
        padding-left: 0;
      }
    `
  ]
})
export class NzDemoCommentBasicComponent {
  likes = 0;
  dislikes = 0;
  time = formatDistance(new Date(), new Date());

  like(): void {
    this.likes = 1;
    this.dislikes = 0;
  }

  dislike(): void {
    this.likes = 0;
    this.dislikes = 1;
  }
}
