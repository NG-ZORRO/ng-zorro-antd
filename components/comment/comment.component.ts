/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { nzInjectDirectionality } from 'ng-zorro-antd/cdk/bidi';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';

import { NzCommentActionComponent as CommentAction, NzCommentActionHostDirective } from './comment-cells';

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
          @if (nzAuthor) {
            <span class="ant-comment-content-author-name">
              <ng-container *nzStringTemplateOutlet="nzAuthor">{{ nzAuthor }}</ng-container>
            </span>
          }
          @if (nzDatetime) {
            <span class="ant-comment-content-author-time">
              <ng-container *nzStringTemplateOutlet="nzDatetime">{{ nzDatetime }}</ng-container>
            </span>
          }
        </div>
        <ng-content select="nz-comment-content" />
        @if (actions?.length) {
          <ul class="ant-comment-actions">
            @for (action of actions; track action) {
              <li>
                <span><ng-template [nzCommentActionHost]="action.content" /></span>
              </li>
            }
          </ul>
        }
      </div>
    </div>
    <div class="ant-comment-nested">
      <ng-content />
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ant-comment]': `true`,
    '[class.ant-comment-rtl]': `dir.isRtl()`
  },
  imports: [NzOutletModule, NzCommentActionHostDirective]
})
export class NzCommentComponent {
  @Input() nzAuthor?: string | TemplateRef<void>;
  @Input() nzDatetime?: string | TemplateRef<void>;

  readonly dir = nzInjectDirectionality();

  @ContentChildren(CommentAction) actions!: QueryList<CommentAction>;
}
