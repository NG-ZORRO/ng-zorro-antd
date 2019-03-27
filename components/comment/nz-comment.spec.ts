import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NzListModule } from '../list';
import { NzDemoCommentBasicComponent } from './demo/basic';
import { NzDemoCommentEditorComponent } from './demo/editor';
import { NzDemoCommentListComponent } from './demo/list';
import { NzDemoCommentNestedComponent } from './demo/nested';

import { NzCommentComponent } from './nz-comment.component';
import { NzCommentModule } from './nz-comment.module';

describe('NzCommentComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NzCommentModule, NzListModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        NzDemoCommentBasicComponent,
        NzDemoCommentEditorComponent,
        NzDemoCommentListComponent,
        NzDemoCommentNestedComponent
      ]
    }).compileComponents();
  }));

  it('should basic work', () => {
    const fixture = TestBed.createComponent(NzDemoCommentBasicComponent);
    const component = fixture.componentInstance;
    const comment = fixture.debugElement.query(By.directive(NzCommentComponent));
    fixture.detectChanges();

    expect(comment.nativeElement.classList).toContain('ant-comment');
    expect(comment.nativeElement.querySelector('nz-avatar[nz-comment-avatar]')).toBeTruthy();
    expect(comment.nativeElement.querySelector('nz-comment-content')).toBeTruthy();
    expect(comment.nativeElement.querySelector('.ant-comment-content-author-name')).toBeTruthy();
    expect(comment.nativeElement.querySelector('.ant-comment-content-author-time')).toBeTruthy();
    expect(comment.nativeElement.querySelector('.ant-comment-content-author-name').innerText).toBe('Han Solo');
    expect(comment.nativeElement.querySelector('.ant-comment-content-author-time').innerText).toBe(component.time);
  });

  it('should actions work', () => {
    const fixture = TestBed.createComponent(NzDemoCommentBasicComponent);
    const component = fixture.componentInstance;
    const comment = fixture.debugElement.query(By.directive(NzCommentComponent));
    fixture.detectChanges();

    expect(component.likes).toBe(0);
    expect(component.dislikes).toBe(0);
    expect(comment.nativeElement.classList).toContain('ant-comment');
    expect(comment.nativeElement.querySelectorAll('.ant-comment-actions li>span').length).toBe(3);
    expect(comment.nativeElement.querySelector('.ant-comment-actions li>span .like').innerText).toBe(
      component.likes.toString()
    );
    expect(comment.nativeElement.querySelector('.ant-comment-actions li>span .dislike').innerText).toBe(
      component.dislikes.toString()
    );

    component.like();
    fixture.detectChanges();

    expect(component.likes).toBe(1);
    expect(component.dislikes).toBe(0);
    expect(comment.nativeElement.querySelector('.ant-comment-actions li>span .like').innerText).toBe(
      component.likes.toString()
    );
    expect(comment.nativeElement.querySelector('.ant-comment-actions li>span .dislike').innerText).toBe(
      component.dislikes.toString()
    );

    component.dislike();
    fixture.detectChanges();

    expect(component.likes).toBe(0);
    expect(component.dislikes).toBe(1);
    expect(comment.nativeElement.querySelector('.ant-comment-actions li>span .like').innerText).toBe(
      component.likes.toString()
    );
    expect(comment.nativeElement.querySelector('.ant-comment-actions li>span .dislike').innerText).toBe(
      component.dislikes.toString()
    );
  });

  it('should list work', () => {
    const fixture = TestBed.createComponent(NzDemoCommentListComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    let comments = fixture.debugElement.queryAll(By.directive(NzCommentComponent));
    fixture.detectChanges();
    expect(component.data.length === comments.length).toBeTruthy();

    component.data.forEach((e, i) => {
      const comment = comments[i];
      expect(comment.nativeElement.querySelector('nz-avatar[nz-comment-avatar]')).toBeTruthy();
      expect(comment.nativeElement.querySelector('.ant-comment-content-author-name').innerText).toBe(e.author);
      expect(comment.nativeElement.querySelector('.ant-comment-content-detail p').innerText).toBe(e.content);
      expect(comment.nativeElement.querySelector('.ant-comment-content-author-time').innerText).toBe(e.datetime);
    });

    component.data = [{ ...component.data[0] }];
    fixture.detectChanges();
    comments = fixture.debugElement.queryAll(By.directive(NzCommentComponent));
    expect(component.data.length === comments.length).toBeTruthy();
  });

  it('should editor work', fakeAsync(() => {
    const fixture = TestBed.createComponent(NzDemoCommentEditorComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('nz-comment .ant-comment-content-detail textarea'))).toBeTruthy();
    let comments = fixture.debugElement.queryAll(By.css('nz-list nz-comment'));
    expect(component.data.length).toBe(0);
    expect(component.data.length === comments.length).toBeTruthy();

    component.inputValue = 'Test Comment 0';
    component.handleSubmit();
    tick(1000);
    fixture.detectChanges();

    component.inputValue = 'Test Comment 1';
    component.handleSubmit();
    tick(1000);
    fixture.detectChanges();

    comments = fixture.debugElement.queryAll(By.css('nz-list nz-comment'));

    component.data.forEach((e, i) => {
      const comment = comments[i];
      expect(comment.nativeElement.querySelector('nz-avatar[nz-comment-avatar]')).toBeTruthy();
      expect(comment.nativeElement.querySelector('.ant-comment-content-author-name').innerText).toBe(e.author);
      expect(comment.nativeElement.querySelector('.ant-comment-content-detail p').innerText).toBe(e.content);
      expect(comment.nativeElement.querySelector('.ant-comment-content-author-time').innerText).toBe(e.displayTime);
    });
  }));

  it('should nested work', () => {
    const fixture = TestBed.createComponent(NzDemoCommentNestedComponent);
    fixture.detectChanges();

    const rootComment = fixture.debugElement.query(By.directive(NzCommentComponent));
    expect(rootComment.nativeElement).toBeTruthy();

    const levelTwoComment = rootComment.query(By.directive(NzCommentComponent));
    expect(levelTwoComment.nativeElement).toBeTruthy();

    const levelThreeComments = levelTwoComment.queryAll(By.directive(NzCommentComponent));
    expect(levelThreeComments.length).toBe(2);
  });
});
