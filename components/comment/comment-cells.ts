/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Directive,
  inject,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';

@Directive({
  selector: 'nz-avatar[nz-comment-avatar]',
  exportAs: 'nzCommentAvatar'
})
export class NzCommentAvatarDirective {}

@Directive({
  selector: 'nz-comment-content, [nz-comment-content]',
  exportAs: 'nzCommentContent',
  host: { class: 'ant-comment-content-detail' }
})
export class NzCommentContentDirective {}

@Directive({
  selector: '[nzCommentActionHost]',
  exportAs: 'nzCommentActionHost'
})
export class NzCommentActionHostDirective extends CdkPortalOutlet implements OnInit, OnDestroy, AfterViewInit {
  @Input() nzCommentActionHost?: TemplatePortal | null;

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngAfterViewInit(): void {
    this.attach(this.nzCommentActionHost);
  }
}

@Component({
  selector: 'nz-comment-action',
  exportAs: 'nzCommentAction',
  template: '<ng-template><ng-content /></ng-template>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzCommentActionComponent implements OnInit {
  @ViewChild(TemplateRef, { static: true }) implicitContent!: TemplateRef<void>;
  private viewContainerRef = inject(ViewContainerRef);
  private contentPortal: TemplatePortal | null = null;

  get content(): TemplatePortal | null {
    return this.contentPortal;
  }

  ngOnInit(): void {
    this.contentPortal = new TemplatePortal(this.implicitContent, this.viewContainerRef);
  }
}
