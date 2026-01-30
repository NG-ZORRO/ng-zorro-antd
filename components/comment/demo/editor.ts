import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { formatDistance } from 'date-fns';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';

interface User {
  author: string;
  avatar: string;
}

interface Data extends User {
  content: string;
  datetime: Date;
  displayTime: string;
}

@Component({
  selector: 'nz-demo-comment-editor',
  imports: [FormsModule, NzAvatarModule, NzButtonModule, NzCommentModule, NzFormModule, NzInputModule, NzListModule],
  template: `
    @if (data.length) {
      <nz-list [nzDataSource]="data" [nzRenderItem]="item" nzItemLayout="horizontal">
        <ng-template #item let-item>
          <nz-comment [nzAuthor]="item.author" [nzDatetime]="item.displayTime">
            <nz-avatar nz-comment-avatar nzIcon="user" [nzSrc]="item.avatar" />
            <nz-comment-content>
              <p>{{ item.content }}</p>
            </nz-comment-content>
          </nz-comment>
        </ng-template>
      </nz-list>
    }

    <nz-comment>
      <nz-avatar nz-comment-avatar nzIcon="user" [nzSrc]="user.avatar" />
      <nz-comment-content>
        <nz-form-item>
          <textarea [(ngModel)]="inputValue" nz-input rows="4"></textarea>
        </nz-form-item>
        <nz-form-item>
          <button nz-button nzType="primary" [nzLoading]="submitting" [disabled]="!inputValue" (click)="handleSubmit()">
            Add Comment
          </button>
        </nz-form-item>
      </nz-comment-content>
    </nz-comment>
  `
})
export class NzDemoCommentEditorComponent {
  data: Data[] = [];
  submitting = false;
  user: User = {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  };
  inputValue = '';

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';
    setTimeout(() => {
      this.submitting = false;
      this.data = [
        ...this.data,
        {
          ...this.user,
          content,
          datetime: new Date(),
          displayTime: formatDistance(new Date(), new Date())
        }
      ].map(e => ({
        ...e,
        displayTime: formatDistance(new Date(), e.datetime)
      }));
    }, 800);
  }
}
