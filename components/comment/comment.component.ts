/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnDestroy,
  Optional,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { Direction, Directionality } from '@angular/cdk/bidi';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzCommentActionComponent as CommentAction } from './comment-cells';

@Component({
  selector: 'nz-comment',
  exportAs: 'nzComment',
  template: `
    <div class="ant-comment-inner">
      <div class="ant-comment-avatar">
        <ng-content select="nz-avatar[nz-comment-avatar]"></ng-content>
      </div>
      <div class="ant-comment-content">
        <div class="ant-comment-content-author">
          <span *ngIf="nzAuthor" class="ant-comment-content-author-name">
            <ng-container *nzStringTemplateOutlet="nzAuthor">{{ nzAuthor }}</ng-container>
          </span>
          <span *ngIf="nzDatetime" class="ant-comment-content-author-time">
            <ng-container *nzStringTemplateOutlet="nzDatetime">{{ nzDatetime }}</ng-container>
          </span>
        </div>
        <ng-content select="nz-comment-content"></ng-content>
        <ul class="ant-comment-actions" *ngIf="actions?.length">
          <li *ngFor="let action of actions">
            <span><ng-template [nzCommentActionHost]="action.content"></ng-template></span>
          </li>
        </ul>
      </div>
    </div>
    <div class="ant-comment-nested">
      <ng-content></ng-content>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ant-comment]': `true`,
    '[class.ant-comment-rtl]': `dir === "rtl"`
  }
})
export class NzCommentComponent implements OnDestroy {
  @Input() nzAuthor?: string | TemplateRef<void>;
  @Input() nzDatetime?: string | TemplateRef<void>;
  dir: Direction;

  private destroy$ = new Subject<void>();

  @ContentChildren(CommentAction) actions!: QueryList<CommentAction>;
  constructor(
    cdr: ChangeDetectorRef,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Optional() directionality: Directionality
  ) {
    directionality.change?.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.dir = directionality.value;
      this.prepareComponentForRtl();
      cdr.detectChanges();
    });

    renderer.addClass(elementRef.nativeElement, 'ant-comment');

    this.dir = directionality.value;
    this.prepareComponentForRtl();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private prepareComponentForRtl(): void {
    if (this.dir === 'rtl') {
      this.renderer.addClass(this.elementRef.nativeElement, 'ant-comment-rtl');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'ant-comment-rtl');
    }
  }
}
