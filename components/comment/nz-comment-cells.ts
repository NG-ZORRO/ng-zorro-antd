import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import {
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
  selector: 'nz-avatar[nz-comment-avatar]'
})
export class NzCommentAvatarDirective {}

@Directive({
  selector: 'nz-comment-content, [nz-comment-content]',
  host: { class: 'ant-comment-content-detail' }
})
export class NzCommentContentDirective {}

@Directive({
  selector: '[nzCommentActionHost]'
})
export class NzCommentActionHostDirective extends CdkPortalOutlet implements OnInit, OnDestroy {
  @Input() nzCommentActionHost: TemplatePortal | null;

  constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
    super(componentFactoryResolver, viewContainerRef);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.attach(this.nzCommentActionHost);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}

@Component({
  selector: 'nz-comment-action',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-template><ng-content></ng-content></ng-template>'
})
export class NzCommentActionComponent implements OnInit {
  @ViewChild(TemplateRef) implicitContent: TemplateRef<void>;
  private contentPortal: TemplatePortal | null = null;

  get content(): TemplatePortal | null {
    return this.contentPortal;
  }

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    this.contentPortal = new TemplatePortal(this.implicitContent, this.viewContainerRef);
  }
}
