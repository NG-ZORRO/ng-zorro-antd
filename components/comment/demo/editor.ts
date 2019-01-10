import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-comment-editor',
  template: `
    <nz-list *ngIf="data.length" [nzDataSource]="data" [nzRenderItem]="item" [nzItemLayout]="'horizontal'">
      <ng-template #item let-item>
        <nz-comment [nzAuthor]="item.author" [nzDatetime]="item.datetime">
          <nz-avatar nz-comment-avatar nzIcon="user" [nzSrc]="item.avatar"></nz-avatar>
          <nz-comment-content>
            <p>{{item.content}}</p>
          </nz-comment-content>
        </nz-comment>
      </ng-template>
    </nz-list>
    <nz-comment>
      <nz-avatar nz-comment-avatar nzIcon="user" [nzSrc]="user.avatar"></nz-avatar>
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
  `,
  styles  : []
})
export class NzDemoCommentEditorComponent {
  data = [];
  submitting = false;
  user = {
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
      this.data = this.data.concat({
        ...this.user,
        content,
        datetime: new Date().toLocaleString()
      });
    }, 800);
  }

}
