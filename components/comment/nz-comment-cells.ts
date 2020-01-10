/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  Directive,
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
  @Input() nzCommentActionHost: TemplatePortal | null;

  constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
    super(componentFactoryResolver, viewContainerRef);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngAfterViewInit(): void {
    this.attach(this.nzCommentActionHost);
  }
}

@Component({
  selector: 'nz-comment-action',
  exportAs: 'nzCommentAction',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-template><ng-content></ng-content></ng-template>'
})
export class NzCommentActionComponent implements OnInit {
  @ViewChild(TemplateRef, { static: true }) implicitContent: TemplateRef<void>;
  private contentPortal: TemplatePortal | null = null;

  get content(): TemplatePortal | null {
    return this.contentPortal;
  }

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    this.contentPortal = new TemplatePortal(this.implicitContent, this.viewContainerRef);
  }
}
